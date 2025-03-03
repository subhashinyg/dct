import { SocketIOEvent } from "../../../constants/enum/common-enum";
import { ITokenPayload } from "../../../interface/auth-interface";
import { IConnectedUser } from "../../../interface/common-interface";
import { JwtHandler } from "../jwt-handler";

const jwt_handler = new JwtHandler()
export let connectedUsersViaSocket={}

export const startSocketIO = (io)=>{
    io.use((socket,next)=>{
        let token = socket.handshake.query.token;
        if(token){
            jwt_handler.verifyToken(token).then((payload:ITokenPayload)=>{
                socket.handshake.query.client_id =payload.user_id;
                socket.handshake.query.client_auth_id = payload.auth_id;
                return next()
            }).catch((err)=>{
                socket.disconnect()
                return next(new Error("authentication error"))
            })
        }else{
            socket.disconnect()
            return next(new Error('authentication error'))
        }
    })

    io.on(SocketIOEvent.CONNECTION,socket =>{
        let client_id = socket?.handshake?.query?.client_id?.toString()
        let client_auth_id = socket?.handshake?.query?.client_auth_id?.toString()
        join(client_id,socket.id)
        socket.on(SocketIOEvent.DISCONNECT,()=>{
            leave(client_id,socket.id)
        })
    })

    return io
}

const join = (client:string , socket:string)=>{
    if(!(client in connectedUsersViaSocket)){
        const connection:IConnectedUser = {_id:client,sockets:[socket]}
        connectedUsersViaSocket[client] = connection
    } else if (!connectedUsersViaSocket[client].sockets.includes(socket)) {
        connectedUsersViaSocket[client].sockets.push(socket)
    }
}

const leave = (client:string, socket:string)=>{
    if((client in connectedUsersViaSocket)){
       if(connectedUsersViaSocket[client].sockets.includes(socket)){
        connectedUsersViaSocket[client].sockets = Array.from(connectedUsersViaSocket[client].sockets.filter((s:string)=> s !== socket))
       }
       if (!connectedUsersViaSocket[client].sockets.length) {
        delete connectedUsersViaSocket[client]
    }
    }
}