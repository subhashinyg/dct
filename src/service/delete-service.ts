import { projectsModel } from "../models/general/our-project-model"
import { UserModel } from "../models/user/user-model"

export class DeleteService {
    deleteUser = async(_id:string):Promise<any>=>{
        return await UserModel.deleteOne({_id},{new:true})
    }
    
    Project  = async(_id:string):Promise<any>=>{
        return await projectsModel.deleteOne({_id},{new:true})
    }
}