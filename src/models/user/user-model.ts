import mongoose, { Schema } from "mongoose";
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler"
import { IUser } from "../../interface/user-interface";
import { ERole, EAvailability, EUserStatus, EEventStatus } from "../../constants/enum/auth-enum";
import { EContactedAt, ERegistartionType, EWorkType } from "../../constants/enum/common-enum";
import { Ecordinates } from "../../interface/auth-interface";
import { attachment_schema } from "../general/general-model";

const Availability_schema = new Schema({
  day: {type: String,enum:Object.keys(EAvailability),required: true },
  start_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
})

const Contact_time_schema = new Schema({
  from_time:{type:String,required:true},
  to_time:{type:String,required:true}
})

const Do_not_disturb_schema = new Schema({
  from_time:{type:Date,required:true},
  to_time:{type:Date,required:true}
})

const schema = new Schema({
  first_name: { type: String, index: true },
  last_name: { type: String },
  nick_name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  street: { type: String },
  state: { type: String },
  city: { type: String },
  zip: { type: String },
  location:{type:String},
  image: { type: [attachment_schema], default: [] },
  role: { type: String, required: true, enum: [ERole.ADMIN,ERole.USER]},
  text_notification: { type: Boolean, default: true },
  app_notification: { type: Boolean, default: true },
  email_notification: { type: Boolean, default: true },
  video_introduction: { type: [attachment_schema] },
  personal_bio: { type: String },
  work_experience: { type: String },
  id_proof: { type:[attachment_schema],default:[] },
  invited_by: { type: Schema.Types.ObjectId, ref: "user" },
  created_at:{type:Date,default:getCurrentDateAndTime() },
  updated_at:{type:Date,default:getCurrentDateAndTime() },
  is_registered:{type:Boolean,default:false},
  is_disable:{type:Boolean,default:false},
  profile_completed:{type:Boolean,default:false},
  do_not_disturb_mode:{type:Boolean,default:false},
  do_not_disturb_mode_time:{type:Do_not_disturb_schema},
  coordinates: {
    type: {
      type: String,
      enum: [Ecordinates.POINT],
    },
    coordinates: {
      type: [Number]
    }
  }
})
schema.index({ coordinates: '2dsphere' });
export const UserModel = mongoose.model<IUser & mongoose.Document>('user',schema)
