import mongoose from 'mongoose';

const seatSchema = mongoose.Schema({
    type: String,
    name: String,
    total: Number,
    seats: [
        {
            coloumn: Number,
            fare: Number,
            is_available: Boolean,
            ladies_seat: Boolean,
            row: Number,
            seat_id: Number,
            z_index: Number,
        }
    ],
    
    createdAt:{
        type: Date,
        default: new Date()
    }
},{
    timestamps: true,
    collection: 'seats'
})

const SeatsModel = mongoose.model('seatsSchema', seatSchema)
export default SeatsModel





