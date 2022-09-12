import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {

        console.log(req.headers.authorization)
        const token = req.headers.authorization.split('Bearer ')[1];

        //const token = req.cookies.token
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
            req.userId = decodedData?.id;
            next();
        }


    } catch (error) {
        res.status(403).json({ error })
    }
}

