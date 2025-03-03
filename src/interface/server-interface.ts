
import { Request, Response } from "express";
import { ITokenPayload } from "./auth-interface";
import { IUser } from "./user-interface";
import { CollectionCounter } from "../constants/enum/common-enum";

export interface ExpressResponse extends Response {}

export interface ExpressRequest extends Request {
    payload?: ITokenPayload,
    user?:IUser,
    body:any,
    query:any,
    params:any,
    app:any
}

export interface IErrorCode {
    message:string,
    code:string
}

export interface IServerError{
    status: number,
    message: string,
    error_message_code:string,
    error?: any
}


export interface IDocumentCounter {
    reference: CollectionCounter,
    prefix: string,
    seq?: number
}