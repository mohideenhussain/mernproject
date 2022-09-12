import mongoose from "mongoose";

const customerSchedule = mongoose.Schema({
    name: String,
    mobile: Number,
    address: String
})

const Customer = mongoose.model('customer', customerSchedule)
export default Customer;