import mongoose from "mongoose";

const busInfoSchedule = mongoose.Schema({
    name: String,
    plate: String,
})

const BusInfo = mongoose.model('busInfo', busInfoSchedule)
export default BusInfo