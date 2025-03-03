import { IAuth, IOTP } from "../interface/auth-interface"
import { IProject } from "../interface/common-interface"
import { IUser } from "../interface/user-interface"
import { AuthModel } from "../models/auth/auth-model"
import { OTPModel } from "../models/general/otp-model"
import { projectsModel } from "../models/general/our-project-model"
import { UserModel } from "../models/user/user-model"
import { getCurrentDateAndTime } from "../utilities/handler/date-time-handler"

export class CreateService {
    
    createUser =async(body:IUser):Promise<IUser>=>{
        return await UserModel.create(body)
    }

    createAuth = async(body:IAuth):Promise<IAuth>=>{
        return await AuthModel.create(body)
    }
    createOtp=async(body:IOTP,otp_expiry_minute:number):Promise<any>=>{
        body.expires_at=getCurrentDateAndTime().add(otp_expiry_minute,'minutes')
        body.created_at=getCurrentDateAndTime()
        return await OTPModel.create(body)
    }

    createProject = async(body:IProject):Promise<IProject>=>{
        return await projectsModel.create(body)
    }
}