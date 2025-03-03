import { Moment } from "moment";
import { ERole, EAvailability, EUserStatus, EEventStatus } from "../constants/enum/auth-enum";
import { EContactedAt, ERegistartionType, EWorkType } from "../constants/enum/common-enum";
import { IAttachment, ICoordinates } from "./auth-interface";

export interface IContactTime {
  from_time: string; // Start time
  to_time: string;   // End time
}

export interface IAvailability {
  day: string | EAvailability[] // Enum for days
  start_at: Moment; // Start time
  end_at: Moment;   // End time
}
export interface IDonotDisturbMode {
  from_time: Moment; // Start time
  to_time: Moment;   // End time
}
// Main User Interface
export interface IUser {
  _id?:string
  first_name?: string;   // Required
  last_name?: string;   // Optional
  nick_name?: string;   // Optional
  email?: string;        // Required and unique
  image?:IAttachment | []
  phone?: string;       // Optional
  street?: string;      // Optional
  state?: string;       // Optional
  city?: string;        // Optional
  zip?: string;         // Optional
  location?:string;
  coordinates?: ICoordinates 
  latitude?: number,
  longitude?: number,
  role?:ERole | string // Enum for roles
  text_notification?: boolean; // Defaults to `true`
  app_notification?: boolean;  // Defaults to `true`
  email_notification?: boolean; // Defaults to `true`
  video_introduction?: IAttachment[] | []; // Optional
  personal_bio?: string;       // Optional
  work_experience?: string;    // Optional
  id_proof?: IAttachment[] | [];  // Optional
  event_status?: string | EEventStatus;       // Enum for user status
  invitation_status?: string;          // Defaults to "PENDING"
  invited_by?: string;               // Reference to another user
  disabled?: boolean;                  // Defaults to `false`
  created_at?: Moment; 
  updated_at?:Moment;
  is_registered?:boolean,
  is_disable?:boolean,
  profile_completed?:boolean,
  contact_time?:IContactTime[],
  registartion_type?:ERegistartionType,
  do_not_disturb_mode?:boolean,
  do_not_disturb_mode_time?:IDonotDisturbMode
}
