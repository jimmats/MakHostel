import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true},
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required:true },
    title: String,
    type: String,
    photos: [String],
    roomDescription: String,
    perks: [String],
    extraInfo: String,
    maxPeople: Number,
    roomPrice: { type: Number, required: true },
    roomNumber: { type: String, required: true },
    currentBookings: [],
}, { timestamps: true });

const RoomModel = mongoose.model('Room', roomSchema);

export default RoomModel;
