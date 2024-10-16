const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    center_id:{
        type: Schema.Types.ObjectId,
        ref: 'center',
        required: true,
    },
    court_id:{
        type: Schema.Types.ObjectId,
        ref: 'Court',
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    time_slot:{
        type: String,
        required: true,
    },  
    customer_name:{
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

bookingSchema.index({center_id: 1, court_id: 1, date: 1, time_slot: 1},{unique: true});

const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;