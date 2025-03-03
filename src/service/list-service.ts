import moment, { Moment } from "moment"
import { objectSanitizer, PageNumberSanitizer } from "../utilities/handler/validation-handler"
import { IUser } from "../interface/user-interface"
import { UserModel } from "../models/user/user-model"
import { request } from "express"
import { IProject } from "../interface/common-interface"
import { projectsModel } from "../models/general/our-project-model"

export class ListService {

    userList = async (query_filter: any, is_doc_count?: boolean): Promise<IUser[] | number> => {
        let filter = objectSanitizer({ role: query_filter.role,is_disable:false })
        if (query_filter?.search) {
            filter.first_name = { $regex: query_filter?.search, $options: 'i' }
        }
        if (query_filter?.is_registered !== undefined) {
            filter.is_registered = query_filter.is_registered
        }
        if (query_filter?.companyId) {
            filter.company = query_filter.companyId
        }
        if (query_filter?.company) {
            filter.company = query_filter.company
        }

        if (query_filter?.is_disable !== undefined) {
            filter.is_disable = query_filter.is_disable
        }
        if (query_filter?.role_in?.length) {
            filter.role = { $in: query_filter?.role_in }
        }
        if(query_filter.role){
            filter.role = query_filter?.role
        }
        if (is_doc_count) {
            return UserModel.countDocuments(filter)
        } else {
            return UserModel.find(filter).sort({ "created_at": "desc" })
                .skip((25 * PageNumberSanitizer(query_filter?.page)) - 25)
                .limit(25)
        }
    }

    Projects = async(filter:IProject,is_count?:number): Promise<IProject[] | number> => {
        return projectsModel.find(filter)
    }


}