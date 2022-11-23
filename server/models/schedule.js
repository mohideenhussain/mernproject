import mongoose from 'mongoose';



const scheduleSchema = mongoose.Schema({
    starting_point: String,
    destination_point: String,
    departure_date: Date,
    arrival_date: Date,
    seats: [
        {
            coloumn: { type: Number, required: true},
            fare: { type: Number, required: true},
            is_available: { type: Boolean, required: true},
            ladies_seat: { type: Boolean, required: true},
            row: { type: Number, required: true},
            seat_id: { type: Number, required: true},
            z_index: { type: Number, required: true},
            booking_status: { type: String, required: true},
            bookedBy: {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'customer'
            }
        }
    ],
    boarding_point: [
        {
            cities: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cities'
            },
            arrival_time: Date

        }
    ],
    dropping_point: [
        {
            cities: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cities'
            },
            arrival_time: Date
        }
    ],
    bus_info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'busInfo'
    },
    driver_info:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driverInfo'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const createSchedule = mongoose.model('schedule', scheduleSchema);
export default createSchedule;