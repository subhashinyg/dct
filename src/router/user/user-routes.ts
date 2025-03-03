import { Router } from "express";
import { JwtHandler } from "../../utilities/handler/jwt-handler";
import { ERole } from "../../constants/enum/auth-enum";
import { UserController } from "../../controller/user/user-controller";

const router = Router();

const user = new UserController()
const jwt = new JwtHandler()

router.post('/registration', (req,res)=>user.Registration(req,res))
export default router;