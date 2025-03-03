import { request } from "express";
import { ERole, IUserStatus } from "../../constants/enum/auth-enum";
import { error_message } from "../../constants/error-constant";
import { IAuth } from "../../interface/auth-interface";
import { IProject } from "../../interface/common-interface";
import { ExpressRequest, ExpressResponse } from "../../interface/server-interface";
import { IUser } from "../../interface/user-interface";
import { CreateService } from "../../service/create-service";
import { DeleteService } from "../../service/delete-service";
import { DetailService } from "../../service/detail-service";
import { DocumentCountService } from "../../service/doc-count-service";
import { ListService } from "../../service/list-service";
import { UpdateService } from "../../service/update-service";
import { BcryptHandler } from "../../utilities/handler/bycrpt-handler";
import { ControllerHandler } from "../../utilities/handler/controller-handler";
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler";
import { bodyRequiredValidator, PageNumberSanitizer } from "../../utilities/handler/validation-handler";


export class AdminController extends ControllerHandler {
    private detail_service = new DetailService();
    private create_service = new CreateService();
    private delete_service = new DeleteService();
    private update_service = new UpdateService();
    private list_service = new ListService();
    private document_count = new DocumentCountService();
    private bcrypt_handler = new BcryptHandler()


    adminRegistration = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const body: IAuth = request.body
            const required = ['email', 'password', 'first_name']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            body.email = body.email.toLowerCase().trim()
            let auth = await this.detail_service.authProfile({ email: body?.email })
            if (auth) {
                return this.error(response, 404, error_message.user_already_exist)
            }

            let user: IUser = {
                first_name: body?.first_name,
                last_name: body?.last_name,
                email: body?.email,
                role: ERole.ADMIN,
                created_at: getCurrentDateAndTime(),
                is_registered:true
            }
            const new_user = await this.create_service.createUser(user)
            body.password = await this.bcrypt_handler.getPasswordHash(body?.password as string)
            let create_auth: IAuth = {
                user: new_user?._id,
                password: body?.password,
                email: body?.email,
                role: ERole.ADMIN,
            }
            const new_auth = await this.create_service.createAuth(create_auth)
            this.jsonResponse<IUser>(response, new_user)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

    dashboard = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let year = 2024
            let users = await this.document_count.userCount()
            let user_graph = await this.document_count.getUserCountByMonth(year)
            let data = {
                users,
                user_graph
            }
            this.jsonResponse(response, data)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    }

    createProject = async (request:ExpressRequest,response:ExpressResponse) =>{
        try {
            let body:IProject = request.body
            let required = ['name','decription','image']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            let create_project:IProject = {
                name:body?.name,
                image:body?.image,
                description:body?.description,
                created_by:request?.user?._id,
                created_at:getCurrentDateAndTime()
            }
            let create = await this.create_service.createProject(create_project)
            this.jsonResponse(response, create)
        } catch (error) {
            this.error(response, 500, null, error);
        }
    }

    listProjects = async(request:ExpressRequest,response:ExpressResponse)=>{
        try {
            let list_project = await this.list_service.userList({})
            this.jsonResponse(response,list_project)
        } catch (error) {
            this.error(response, 500, null, error);
        }
    }

    deleteProject = async(request:ExpressRequest,response:ExpressResponse)=>{
        try {
            let id = request?.params.id
            let poject_detail = await this.detail_service.Project({_id:id})
            if(!poject_detail){
                return this.error(response, 400,error_message.project_not_found)
            }
            let delete_project = await this.delete_service.Project(poject_detail?._id)
            this.jsonResponse(response,delete_project)
        } catch (error) {
            this.error(response, 500, null, error);
        }
    }

    updateProject = async (request:ExpressRequest,response:ExpressResponse) =>{
        try {
            let id = request?.params.id
            let body:IProject = request.body
            let update_project:IProject = {
                name:body?.name,
                image:body?.image,
                description:body?.description,
                created_by:request?.user?._id,
                created_at:getCurrentDateAndTime()
            }
            let create = await this.update_service.updateProject(id,update_project)
            this.jsonResponse(response, create)
        } catch (error) {
            this.error(response, 500, null, error);
        }
    }

    

}
