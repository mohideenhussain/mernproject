import mongoose from 'mongoose';

const signupSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    refreshToken: [String]
},{
    timestamps: true,
    collection: 'users'
})

const signUpVerify = mongoose.model('signup', signupSchema);
export default signUpVerify;