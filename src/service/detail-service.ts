import { IAuth, IOTP } from "../interface/auth-interface"
import { AuthModel } from "../models/auth/auth-model"
import { IUser } from "../interface/user-interface"
import { UserModel } from "../models/user/user-model"
import { objectSanitizer } from "../utilities/handler/validation-handler"
import { getCurrentDateAndTime } from "../utilities/handler/date-time-handler"
import { OTPModel } from "../models/general/otp-model"
import { IProject } from "../interface/common-interface"
import { projectsModel } from "../models/general/our-project-model"

export class DetailService {

    authProfile = async (filter: Partial<IAuth>): Promise<IAuth | null> => {
        let query_filter:any = objectSanitizer(filter)
        if (!Object.keys(query_filter)?.length) {
            return null
        }
        return await AuthModel.findOne(query_filter).populate('user')
    }

    userProfile = async(filter:Partial<IUser>):Promise<IUser>=>{
        let query_filter:any = objectSanitizer(filter)
        if (!Object.keys(query_filter)?.length) {
            return null
        }
        return await UserModel.findOne(query_filter)
    }
    userByIds = async (filter: { _id: string[] | { $in: string[] } }): Promise<IUser[]> => {
        const queryFilter: any = objectSanitizer(filter);
        if (!queryFilter || !queryFilter._id) {
            return [];
        }
        const ids = Array.isArray(queryFilter._id) ? queryFilter._id : queryFilter._id.$in;
        if (!ids?.length) {
            return [];
        }
        return await UserModel.find({ _id: { $in: ids } }).populate('job_categories');
    };
    validateOtp =  async(filter:Partial<IOTP>):Promise<IOTP>=>{
        let query_filter: any=objectSanitizer(filter)
        if (!Object.keys(query_filter)?.length) {
            return null
        }
        query_filter.expires_at={$gt:getCurrentDateAndTime()}
        return await OTPModel.findOne(query_filter)
    }

    Project =  async(filter:Partial<IProject>):Promise<IProject>=>{
        let query_filter: any=objectSanitizer(filter)
        if (!Object.keys(query_filter)?.length) {
            return null
        }
        query_filter.expires_at={$gt:getCurrentDateAndTime()}
        return await projectsModel.findOne(query_filter)
    }

}