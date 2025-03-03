import { Moment } from "moment";
import { IUser } from "./user-interface";
import { IAttachment, IAuth, ICoordinates } from "./auth-interface";
import { ERole } from "../constants/enum/auth-enum";
import { NotificationType , ENotificationStatus, EPaymentType, ELogType, EExpense, EExpenseType, ES3uploadType, EChatRoomType, EInviteStaff, EFeedback } from "../constants/enum/common-enum";

export interface ICompany extends IUser{
    _id?:string
    company_name: string; // Name of the company
    website?: string;   // Website URL of the company (optional)
    business_type?: string; // Type of business (optional)
    location?:string,
    street?: string;    // Street address of the company (optional)
    state?: string;     // State of the company (optional)
    city?: string;      // City of the company (optional)
    zip?: string;       // Zip/postal code (optional)
    phone?:string,
    company_code?: string; // Unique code for the company
    approx_month_event: number; // Approximate number of monthly events
    staff_category: string[]; // Array of staff categories
    created_by?: string //| IUser; // Reference to the user who created the company
    created_at?: Moment;   // Moment when the company record was created
    updated_at?:Moment,
    managers?:string[],
    staff?:string[],
    is_disable?:boolean,
    deleted?:boolean
  }


  export interface IPagination{
    total_doc:number,
    total_page:number,
    current_page:number,
    doc_per_page:number,
    data:any[]
}

export interface IChatroomMember {
  user?: string | IUser
  role?:ERole,
  created_at?:Moment
}

export interface INotification{
  _id?: string,
  recipient?: string | IUser,
  type?: string,
  message?: string,
  title?: string,
  read?: boolean,
  created_at?: Moment,
  data?:Object,
}

export interface ILastMessage{
message?:string,
time?:Moment,
user?:string
}

export interface IDevice{
user_id:string,
device_token:string,
device_name:string,
fcm_token?:string,
created?:Moment
}

export interface IDevice{
  user_id:string,
  device_token:string,
  device_name:string,
  fcm_token?:string,
  created?:Moment
 }

 export interface IProject{
  _id?: string,
  image?:IAttachment | [],
  name?:string,
  description?:string,
  created_at?:Moment,
  created_by?:string | IUser
}

export interface IManagerInvitation{
  password?:string,
  name?:string,
  token?:string,//active or disabled user
  phone?:string

}

export interface ICompanyRegistration{
    _id:string
    first_name?: string;   
    last_name?: string;  
    email?: string;  
    image?:IAttachment | [],
    company_name: string; // Name of the company
    website?: string;   // Website URL of the company (optional)
    location?:string,
    business_type?: string; // Type of business (optional)
    state?: string;     // State of the company (optional)
    city?: string;      // City of the company (optional)
    zip?: string;       // Zip/postal code (optional)
    street?:string,
    phone?:string,
    coordinates?: ICoordinates 
    latitude?: number,
    longitude?: number,
    password:string;
    role:string | IUser
    company_code?: string; // Unique code for the company
    approx_month_event: number; // Approximate number of monthly events
    staff_category: string[]; // Array of staff categories
    created_by?: string //| IUser; // Reference to the user who created the company
    created_at?: Moment;   // Moment when the company record was created
    updated_at?:Moment;
}

export interface ILog{
  log:object,
  type?:ELogType,
  created_at?: Moment
}

export interface IUploadRequest{
    type: ES3uploadType, //type of file uploaded
    file_name: string, // name of the image
    key?: string,
    created_at: Moment,
}
export interface IUpload{
    upload_url?: string
    image_url?: string,
    key?: string,
    path?: string,
    file_name?: string,
    dynamic_key?: string
}

