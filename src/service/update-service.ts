import { IAuth, IOTP } from "../interface/auth-interface";
import { IProject } from "../interface/common-interface";
import { IUser } from "../interface/user-interface";
import { AuthModel } from "../models/auth/auth-model";
import { OTPModel } from "../models/general/otp-model";
import { projectsModel } from "../models/general/our-project-model";
import { UserModel } from "../models/user/user-model";
import { objectSanitizer } from "../utilities/handler/validation-handler";


export class UpdateService {
    updateUser = async (_id: string, body: Partial<IUser>): Promise<IUser | null> => {
        return await UserModel.findOneAndUpdate({ _id }, body, { new: true })
    };
    
    invalidateOTP=async(filter:IOTP):Promise<any>=>{
        let query_filter=objectSanitizer(filter)
        return await OTPModel.updateMany(query_filter,{used:true},{new:true})
    }

    updateAuth = async (user: string,update:IAuth): Promise<IAuth> => {
        return await AuthModel.findOneAndUpdate({_id:user},update,{new:true})
    }

    updateProject = async (_id: string, body: Partial<IProject>): Promise<IProject | null> => {
        return await projectsModel.findOneAndUpdate({ _id }, body, { new: true })
    };
 
}
