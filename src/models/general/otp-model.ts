import mongoose from "mongoose";
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler";
import { IOTP } from "../../interface/auth-interface";

const otpSchema = new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    otp_type:{type:String,required:true},
    expires_at:{type:Date,required:true},
    used:{type:Boolean,default:false, required:true},
    created_at: { type: Date ,default: getCurrentDateAndTime()}
})

export const OTPModel=mongoose.model<IOTP & mongoose.Document>('otp',otpSchema)