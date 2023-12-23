import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema({
    name: {type:String, unique:true},
    email: {type:String, unique:true},
    password: {type: String, required:true},
    isAdmin: {type: Boolean, default:false},
},{timestamps: true});

const UserModel = mongoose.model('User',UserSchema);

export default UserModel;


