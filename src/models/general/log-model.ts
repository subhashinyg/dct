import mongoose from "mongoose";
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler";
import { ILog } from "../../interface/common-interface";
import { ELogType } from "../../constants/enum/common-enum";

const deletelogSchema = new mongoose.Schema({
    log:{type:Object,required:true},
    type:{type:String,required:true,enum:Object.values(ELogType)},
    created_at: { type: Date ,default: getCurrentDateAndTime()}
})

export const LogModel=mongoose.model<ILog & mongoose.Document>('delete-log',deletelogSchema)