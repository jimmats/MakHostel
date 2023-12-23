import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    room:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'Room'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    duration: {type:Number, required:true},
    name:{type:String, required:true},
    phone: {type:String, required:true},
    email: {type:String, required:true},
    price: Number,
});

const BookingModel = mongoose.model('Booking',bookingSchema);

export default BookingModel;