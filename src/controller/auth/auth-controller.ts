import { EOTPIdentifier, EOTPType } from "../../constants/enum/auth-enum";
import { CollectionCounter, ES3uploadType } from "../../constants/enum/common-enum";
import { error_message } from "../../constants/error-constant";
import { Ecordinates, IAuth, IOTP, IPassword, IResetPassword, IToken } from "../../interface/auth-interface";
import { IUpload, IUploadRequest } from "../../interface/common-interface";
import { ExpressRequest, ExpressResponse } from "../../interface/server-interface";
import { IUser } from "../../interface/user-interface";
import { AppContextService } from "../../service/app-context-service";
import { CreateService } from "../../service/create-service";
import { DeleteService } from "../../service/delete-service";
import { DetailService } from "../../service/detail-service";
import { GCPService } from "../../service/gcp-service";
import { ListService } from "../../service/list-service";
import { SendGridService } from "../../service/sendgrid-service";
// import { SendGridService } from "../../service/sendgrid-service";
import { UpdateService } from "../../service/update-service";
import { resetPasswordEmailTemplate } from "../../utilities/email-templates/reset-password";
import { BcryptHandler } from "../../utilities/handler/bycrpt-handler";
import { ControllerHandler, generateRandomOtp } from "../../utilities/handler/controller-handler";
import { getCurrentDateAndTime, getCurrentDateandTimeinUnix } from "../../utilities/handler/date-time-handler";
import { JwtHandler } from "../../utilities/handler/jwt-handler";
import { bodyRequiredValidator } from "../../utilities/handler/validation-handler";



export class AuthController extends ControllerHandler {;
    private jwt_handler = new JwtHandler();
    private detail_service = new DetailService();
    private create_service = new CreateService();
    private delete_service = new DeleteService();
    private update_service = new UpdateService();
    private list_service = new ListService();
    private bcrypt_handler = new BcryptHandler();
    private app_context = new AppContextService();
    private gcp_service = new GCPService();
    private mailer = new SendGridService()

    Login = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const body: IAuth = request.body
            const required = ['email', 'password']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            body.email = body.email.toLowerCase().trim()
            let auth_profile = await this.detail_service.authProfile({ email: body?.email })
            if (!auth_profile) {
                return this.error(response, 404, error_message.user_not_found)
            }
            // if (auth_profile.disabled) {
            //     return this.error(response, 403, error_message.user_disabled)
            // }
            const verify_password = await this.bcrypt_handler.verifyPasswordHash(body.password as string, auth_profile?.password as string)
            if (!verify_password) {
                return this.error(response, 400, error_message.password_incorrect)
            }
            const token = await this.jwt_handler.createToken(auth_profile)
            this.jsonResponse<IToken>(response, token)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }
    
    GenerateOTP = async(request:ExpressRequest,response:ExpressResponse)=>{
        try {
            let body: IOTP = request.body;
            const required = ['email', 'otp_type']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            const otp_type = [EOTPType.FORGET_PASSWORD, EOTPType.EMAIL_CHANGE]
            if (!otp_type.includes(body?.otp_type)) {
                return this.error(response, 400, error_message.invalid_otp_type)
            }
            body.email = body?.email.toLowerCase().trim()
            let user = await this.detail_service.authProfile({email:body?.email})
            if(!user){
                return this.error(response,404,error_message.user_not_found)
            }
            let otp: IOTP = {
                otp: generateRandomOtp(4),
                email: user.email,
                otp_type: body?.otp_type,
                used: false
            }
            await this.update_service.invalidateOTP({email:user?.email,otp_type:body?.otp_type,used:false})
            const create_otp = await this.create_service.createOtp(otp, 5)
            if (body?.otp_type == EOTPType.FORGET_PASSWORD) {
                const email_body = resetPasswordEmailTemplate(create_otp.otp)
                await this.mailer.sendMail(user.email, "Reset Password", email_body)
            }
            this.jsonResponse(response,otp)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

    OtpVerification = async(request:ExpressRequest,response:ExpressResponse)=>{
        try {
            let body: IOTP = request.body;
            const required = ['identifier','otp', 'otp_type'];
            if(body?.identifier == EOTPIdentifier.EMAIL){
                required.push('email')
            }
            else(
                required.push('phone')
            )
            const otp_type = [EOTPType.FORGET_PASSWORD,EOTPType.COMPANY_INVITATION]
            if (!otp_type.includes(body?.otp_type)) {
                return this.error(response, 400, error_message.invalid_otp_type)
            }
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            const valid_otp = await this.detail_service.validateOtp({email:body?.email, otp:body?.otp,otp_type:body?.otp_type})
            if (!valid_otp) {
                return this.error(response, 400, error_message.invalid_otp)
            }
            if(body?.identifier == EOTPIdentifier.EMAIL){
                body.email = body?.email.toLowerCase().trim()
                let user = await this.detail_service.userProfile({email:body?.email})
                if(!user){
                    return this.error(response,404,error_message.user_not_found)
                }
            }
            this.jsonResponse(response)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

    ResetPassword = async(request:ExpressRequest,response:ExpressResponse)=>{
        try {
            const body: IResetPassword = request.body;
            const required = ['email', 'otp', 'password', 'confirm_password']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            if(body.password != body.confirm_password){
                return this.error(response,400,error_message.password_mismatch)
            }
            body.email = body?.email.toLowerCase().trim()
            let user = await this.detail_service.authProfile({email:body?.email})
            if(!user){
                return this.error(response,404,error_message.user_not_found)
            }
            let validated_otp = await this.detail_service.validateOtp({email:body?.email,otp:body?.otp,otp_type:EOTPType.FORGET_PASSWORD,used:false})
            if(!validated_otp){
                return this.error(response,404,error_message.invalid_otp)
            }
            const password = await this.bcrypt_handler.getPasswordHash (body?.password)
            const update_user: IAuth = {
                password: password
            }
            let update_user_password = await this.update_service.updateAuth(user?._id,update_user)
            let update_otp = await this.update_service.invalidateOTP({_id:validated_otp?._id})
            this.jsonResponse(response)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

    ChangePassword = async(request:ExpressRequest,response:ExpressResponse)=>{
        try {
            const user = request.user
            let body: IPassword = request.body
            const required = ['new_password', 'confirm_password','old_password']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            const auth_profile = await this.detail_service.authProfile({user:user?._id})
            if(!auth_profile){
                return this.error(response, 400,error_message.user_not_found)
            }
            if(body.new_password != body.confirm_password){
                return this.error(response,400,error_message.password_mismatch)
            }
            let validate_password = await this.bcrypt_handler.verifyPasswordHash(body?.old_password,auth_profile?.password)
            if(!validate_password){
                return this.error(response,400,error_message.incorrect_old_password)
            }
            let password = await this.bcrypt_handler.getPasswordHash(body?.new_password)
            await this.update_service.updateAuth(auth_profile?._id,{password:password})
            this.jsonResponse(response)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

    Profile = async (request:ExpressRequest,response:ExpressResponse)=>{
        try {
            const user = request?.user
            let user_profile = await this.detail_service.userProfile({_id:user?._id})
            this.jsonResponse(response,user_profile)
        } catch (error) {
            this.error(response,500,null,error)
        }
    }

    preUrlRequest = async(request:ExpressRequest,response:ExpressResponse)=>{
        try {
            console.log('/pre-url-request');
            let body:IUploadRequest = request.body
            const required = ['type','file_name']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }
            let available_type = [ES3uploadType.ICONS,ES3uploadType.IMAGES,ES3uploadType.PROFILEPIC]
            if(!available_type){
                return this.error(response,400,error_message.invalid_file_type)
            } 
            const key = await this.app_context.getNextSequence(CollectionCounter.FILEUPLOAD)
            const file_name = body?.file_name;
            const file_split = file_name.split(".")
            const type = body?.type
            const upload_detail: IUpload = await this.gcp_service.generateSignedUrl({
                bucket: process.env.GCP_BUCKET_ASSETS,
                file_name: `${getCurrentDateandTimeinUnix()}_${file_split[0]}_o.${file_split[1]}`,
                path: `${type}`,
                dynamic_key: key
            })
            console.log('upload_detail',upload_detail)
            this.jsonResponse<IUpload>(response, upload_detail)
        } catch (error) {
            console.log('err',error)
            this.error(response, 500, null, error)
        }
    }

    UpdateUser = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const user_id = request.params.id;
            const body: Partial<IUser & IAuth> = request.body;
    
            const [existing_auth_profile, existing_user] = await Promise.all([
                this.detail_service.authProfile({ user: user_id }),
                this.detail_service.userProfile({ _id: user_id })
            ]);
    
            if (!existing_auth_profile || !existing_user) {
                return this.error(response, 404, null, "User not found");
            }
    
            let phoneToUpdate;
            if (body?.phone && body.phone !== existing_user.phone) {
                const existing_phone_number = await this.detail_service.userProfile({
                    phone: body.phone,
                    _id:  user_id 
                });
    
                if (existing_phone_number) {
                    return this.error(response, 400, error_message.phone_number_already_exist);
                }
                phoneToUpdate = body.phone; 
            } else {
                phoneToUpdate = existing_user.phone; 
            }
    
            const updates: Partial<IUser> = {
                first_name: body?.first_name,
                last_name: body?.last_name,
                nick_name: body?.nick_name,
                location: body?.location,
                phone: phoneToUpdate, 
                street: body?.street,
                state: body?.state,
                city: body?.city,
                zip: body?.zip,
                personal_bio: body?.personal_bio,
                video_introduction: body?.video_introduction,
                coordinates: body?.longitude && body?.latitude
                    ? { type: Ecordinates.POINT, coordinates: [body.longitude, body.latitude] }
                    : undefined,
                updated_at: getCurrentDateAndTime(),
                image: body?.image,
                work_experience: body?.work_experience,
            };
    
            const cleanUpdates = Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined));
    
            const updatedUser = await this.update_service.updateUser(user_id, cleanUpdates);
    
            if (body.password) {
                const hashedPassword = await this.bcrypt_handler.getPasswordHash(body.password);
                await this.update_service.updateAuth(user_id, { password: hashedPassword });
            }
    
            return this.jsonResponse<IUser>(response, updatedUser);
        } catch (error) {
            console.error("Error in UpdateUser:", error);
            return this.error(response, 500, null, error);
        }
    };
    
    
    

}