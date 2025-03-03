import { Application } from "express"
import admin_route from './admin/admin-route'
import auth_route from './auth/auth-routes'
import user_route from './user/user-routes'

const AppEndPoints = (app:Application)=>{
    app.get('/',(req,res)=>res.send('Welcome to Staff Blast v1.1.8.')) 
    app.use('/admin',admin_route)
    app.use('/auth',auth_route)
    app.use('/user',user_route)
}

export { AppEndPoints }