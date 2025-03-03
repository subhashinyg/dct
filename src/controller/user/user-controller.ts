import moment from "moment";
import { EEventStatus, ERole, EUserStatus } from "../../constants/enum/auth-enum";
import { CollectionCounter, EChatRoomType, EContactedAt, EFeedback, ELogType, ERegistartionType, EventUserResponse, EWorkType } from "../../constants/enum/common-enum";
import { error_message } from "../../constants/error-constant";
import { Ecordinates, IAuth, IToken } from "../../interface/auth-interface";
import { IChatroomMember, ICompany, IPagination } from "../../interface/common-interface";
import { ExpressRequest, ExpressResponse } from "../../interface/server-interface";
import { IUser } from "../../interface/user-interface";
import { CreateService } from "../../service/create-service";
import { DeleteService } from "../../service/delete-service";
import { DetailService } from "../../service/detail-service";
import { ListService } from "../../service/list-service";
import { UpdateService } from "../../service/update-service";
import { BcryptHandler } from "../../utilities/handler/bycrpt-handler";
import { ControllerHandler } from "../../utilities/handler/controller-handler";
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler";
import { Document } from 'mongoose';

import { PageNumberSanitizer, bodyRequiredValidator } from "../../utilities/handler/validation-handler";
import { JwtHandler } from "../../utilities/handler/jwt-handler";
import { request } from "express";
export class UserController extends ControllerHandler {
    private detail_service = new DetailService();
    private create_service = new CreateService();
    private delete_service = new DeleteService();
    private update_service = new UpdateService();
    private list_service = new ListService();
    private bcrypt_handler = new BcryptHandler();
    private jwtHandler = new JwtHandler();
    Registration = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const body: IAuth = request.body
            const required = ['email', 'password', 'first_name', 'phone', 'longitude', 'latitude', 'job_categories']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            body.email = body.email.toLowerCase().trim()
            let existing_phone_number = await this.detail_service.userProfile({ phone: body?.phone })
            if (existing_phone_number) {
                return this.error(response, 404, error_message.phone_number_already_exist)
            }
            let auth = await this.detail_service.authProfile({ email: body?.email })
            if (auth) {
                return this.error(response, 404, error_message.user_already_exist)
            }
            const coordinates = { type: Ecordinates.POINT, coordinates: [body?.longitude, body?.latitude] }
            let user: IUser = {
                first_name: body?.first_name,
                last_name: body?.last_name,
                nick_name: body?.nick_name,
                location: body?.location,
                email: body?.email,
                phone: body?.phone,
                street: body?.street,
                state: body?.state,
                city: body?.city,
                zip: body?.zip,
                role: ERole.USER,
                personal_bio: body?.personal_bio,
                video_introduction: body?.video_introduction,
                coordinates,
                created_at: getCurrentDateAndTime(),
                image: body?.image
            }
            const new_user = await this.create_service.createUser(user)
            body.password = await this.bcrypt_handler.getPasswordHash(body?.password as string)
            let create_auth: IAuth = {
                user: new_user?._id,
                password: body?.password,
                email: body?.email,
                role: ERole.USER,
            }
            const new_auth = await this.create_service.createAuth(create_auth)

            const token: IToken = await this.jwtHandler.createToken(new_auth)
            this.jsonResponse<IToken>(response, token)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }



}