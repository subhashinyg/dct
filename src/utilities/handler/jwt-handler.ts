import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { IAuth, IToken, ITokenPayload } from '../../interface/auth-interface'
import { ERole } from '../../constants/enum/auth-enum'
import { status_code } from '../../constants/error-constant'
import { UserModel } from '../../models/user/user-model'
import { IUser } from '../../interface/user-interface'

dotenv.config()

export class JwtHandler {

    getSecertKey = (): string => {
        return process.env.JWT_SUPER_KEY+"_"+process.env.ENVIRONMENT
    }

    accessToken = async (user_id: string, auth_id: string, role: ERole): Promise<string> => {
        let payload: ITokenPayload = {
            user_id,
            role,
            auth_id
        }
        return jwt.sign(payload, this.getSecertKey())
    }

    createToken = async (auth: IAuth): Promise<IToken> => {
        const token: string = await this.accessToken((auth.user as IUser)?._id || auth?.user as string, auth?._id as string, auth.role)
        return { token }
    }

    createManagerToken = async (_id:string,email:string): Promise<string> => {
        return jwt.sign({_id,email},process.env.JWT_SUPER_KEY)
    }

    accessPermission = (access_for_disable?:boolean,roles?: string[]) => {
        return async (req: any, res: any, next: any) => {
            const token = req.headers['Authorization'] || req.headers['authorization'];
            if (!token) {
                return res.status(401).send(status_code[401])
            }
            else {
                jwt.verify(token, this.getSecertKey(), async(err: any, decoded: any) => {
                    if (err) {
                        return res.status(401).send(status_code[401])
                    }
                    else {
                        const payload: ITokenPayload = decoded
                        req.payload = payload
                        if (!roles || !roles.length || roles.includes(payload.role as string)) {
                            const user = await UserModel.findOne({_id:payload?.user_id})
                            if(!user){
                                return res.status(404).send(status_code[404])
                            }
                            if(!access_for_disable && user?.disabled){
                                return res.status(403).send(status_code[403])
                            }
                            req.user = user
                            next()
                        } else {
                            return res.status(401).send(status_code[401])
                        }
                    }
                })
            }

        }
    }

    chatVerifyToken = async (token:string):Promise<Partial<ITokenPayload>> => {
        const payload:any =  jwt.verify(token, process.env.JWT_SUPER_KEY)
        return payload && payload.token_id ? {auth_id:payload.token_id,user_id:payload.user} : undefined
    }
    verifySocketToken = async (token: string): Promise<any>=> {
        const payload: any = jwt.verify(token, this.getSecertKey())
        return payload
    }

    verifyToken = async (token: string): Promise<any>=> {
        const payload: any = jwt.verify(token,process.env.JWT_SUPER_KEY )
        return payload
    }

}
