
import { Response } from "express";
import { IErrorCode, IServerError } from "../../interface/server-interface";
import { status_code } from "../../constants/error-constant";
import { Environment } from "../../constants/enum/server-enum";

export class ControllerHandler {
    public jsonResponse<T>(response: Response, result?: T | null) {
        if (result) {
            response.type('application/json');
            return response.status(200).json(result);
        } else {
            return response.status(200).json({ "status": "success" });
        }
    }

    public error(response: Response, code: number, message_detail?: IErrorCode|null, error?: any) {
        const msg = message_detail?.message || status_code[code]
        let error_response:IServerError = {
            "status": code,
            "message": msg,
            "error_message_code":message_detail?.code || code?.toString(),
            "error": [error]
        }
        if(process.env.ENVIRONMENT == Environment.PRODUCTION){
            delete error_response['error']
        }
        response.status(code).json(error_response)
    }

}

export const generateRandomOtp=(length:number)=>{
    let code="";
    const characters="0123456789";
    for(var i=0;i<length;i++){
        code+=characters.charAt(Math.floor(Math.random()*characters.length))
    }
    return code
}