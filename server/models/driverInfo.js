import mongoose from "mongoose";

const driverInfoSchedule = mongoose.Schema({
    name:String,
    address: String,
    employee_id: Number
})

const DriverInfo = mongoose.model('driverInfo', driverInfoSchedule)
export default DriverInfo;