import mongoose from "mongoose";
import { attachment_schema } from "./general-model";
import { IProject } from "../../interface/common-interface";
import {getCurrentDateAndTime} from "../../utilities/handler/date-time-handler"

const projects = new mongoose.Schema({
    name:{type:String},
    description:{type:String,required:true},
    image:{type:[attachment_schema],default:[]},
    date_of_creation:{type:Date},
    created_by:{type:String,ref:'user'},
    created_at: { type: Date ,default: getCurrentDateAndTime()}
})

export const projectsModel=mongoose.model<IProject & mongoose.Document>('our-projects',projects)