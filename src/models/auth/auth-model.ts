import mongoose, { Schema } from "mongoose"
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler"
import { ERole } from "../../constants/enum/auth-enum"
import { IAuth } from "../../interface/auth-interface"

const schema = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,required:true,unique:true,ref:'user'},
    email:{type:String,required:true,unique:true,index:true},
    role:{type:String,required:true,enum:[ERole.ADMIN,ERole.USER]},
    password:{type:String,required:true},
    disabled:{type:Boolean,default:false},
    created_at:{type:Date,default:getCurrentDateAndTime()}
})

export const AuthModel = mongoose.model<IAuth & mongoose.Document>('auth',schema)