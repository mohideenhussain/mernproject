import signUpVerify from "../models/signup.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    let { name, password, mobile, email } = req.body;
    const cookies = res.cookies;
    try {
        const existingUser = await signUpVerify.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email or mobile number already exists' });
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await signUpVerify.create({ name, password: hashPassword, mobile, email });
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.TOKEN_SECRET, { expiresIn: '60s' })


        res.status(200).json({ data: result, token, expiresIn: 5000 })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }

}

export const signin = async (req, res) => {
    let { email, password } = req.body;
    const cookies = req.cookies;
    try {
        const isExisting = await signUpVerify.findOne({ email });
        if (!isExisting) return res.status(400).json({ message: "user doesn't exist" })
        const isPasswordMatch = await bcrypt.compare(password, isExisting.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid credentials' })
        const token = jwt.sign({ email: isExisting.email, id: isExisting._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })

        const newRefreshToken = jwt.sign({ email: isExisting.email, id: isExisting._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
        console.log(isExisting)
        let newRefreshTokenArray = (!cookies?.token) ? isExisting?.refreshToken : (isExisting.refreshToken.filter(rt => rt !== cookies.token))

        if (cookies?.token) {
            const refreshToken = cookies.token;
            const findUser = await signUpVerify.findOne({ refreshToken })
            if (!findUser) {
                newRefreshTokenArray = [];
            }
            res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true })
        }

        isExisting.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const saveExisting = await isExisting.save()
        res.cookie('token', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true })

        res.status(200).json({ token, expiresIn: 5000 })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const createRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //console.log(cookies)
    if (!cookies?.token) return res.status(401).json({ message: 'Invalid Credentials' })
    const refreshToken = cookies.token;
    console.log(refreshToken)
    res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true })

    const checkUser = await signUpVerify.findOne({ refreshToken })
    console.log(checkUser)

    if (!checkUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403)
                // Delete refresh tokens of hacked user
                const hackedUser = await signUpVerify.findOne({ email: decoded.email }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        res.sendStatus(403)
    }
    const newRefreshTokenArray = checkUser.refreshToken.filter(rt => rt !== refreshToken)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                // expired refresh token
                checkUser.refreshToken = [...newRefreshTokenArray];
                const result = await checkUser.save();
            }
            if (err || checkUser.email !== decoded.email) return res.sendStatus(403);

            //if refresh token still valid token

            const token = jwt.sign(
                { email: decoded.email, id: decoded._id },
                process.env.TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            const newrefreshToken = jwt.sign(
                { email: checkUser.email, id: checkUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            //save refresh token with current user

            checkUser.refreshToken =[...newRefreshTokenArray, newrefreshToken]
            const saveRefresh = await checkUser.save();

            res.cookie('token', newrefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
            .json({token})

        }
    )

}