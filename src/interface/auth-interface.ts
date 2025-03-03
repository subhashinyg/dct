import { IUser } from "./user-interface"
import { EOTPIdentifier, EOTPType, ERole } from "../constants/enum/auth-enum"
import { Moment } from "moment"

export interface IAuth extends IUser{
    _id?:string,
    user?:string | IUser,
    password?:string, 
    email?:string,
    role?:ERole,
    disabled?:boolean,
    created_at?:Moment,
    token?:string
    
}

export interface IToken{
    token:string //token
}

export interface ITokenPayload {
    user_id: string, // user ID
    role?: string, // user role
    auth_id?: string // auth  ID
    
}

export interface ICreateDoc {
    updated_at?:Moment,
    created_at?:Moment,
    created_by?:string
}

export interface IAttachment {
    url:string,
    key:string,
    name:string
}

export interface IOTP{
    _id?:string
    email?:string,//user eamil
    otp?:string,
    otp_type?:EOTPType
    expires_at?:Moment,
    used?:boolean,
    identifier?:EOTPIdentifier,
    created_at?:Moment,
    role?:ERole | string
}

export interface IResetPassword extends IOTP{
    password:string,
    confirm_password:string
}

export interface IPassword{
    old_password:string,//old password
    new_password:string,//new password
    confirm_password:string//confirm password
}

export enum Ecordinates {
    POINT = "Point"
}

export interface ICoordinates {
    type: string,
    coordinates: number[]
}

export interface IOTP{
    _id?:string
    email?:string,//user eamil
    otp?:string,
    otp_type?:EOTPType
    expires_at?:Moment,
    used?:boolean,
    created_at?:Moment
}