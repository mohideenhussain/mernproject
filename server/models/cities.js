import mongoose from "mongoose";

const city = mongoose.Schema({
    name: String,
    address: String,
    district: String,
    pincode: Number,
    landmark: String,
})
const Cities = mongoose.model('cities', city)
export default Cities;