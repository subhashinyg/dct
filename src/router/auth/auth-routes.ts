import { Router } from "express";
import { JwtHandler } from "../../utilities/handler/jwt-handler";
import { AuthController } from "../../controller/auth/auth-controller";

const router = Router();
const auth = new AuthController()
const jwt = new JwtHandler()
router.post('/login', (req,res)=>auth.Login(req,res))
router.post('/generate-otp',(req,res)=>auth.GenerateOTP(req,res))
router.post('/otp-verification',(req,res)=>auth.OtpVerification(req,res))
router.put('/reset-password',(req,res)=>auth.ResetPassword(req,res))
router.post('/change-password',jwt.accessPermission(false,[]),(req,res)=>auth.ChangePassword(req,res))
router.get('/profile',jwt.accessPermission(false,[]),(req,res)=>auth.Profile(req,res))
router.put('/update-profile/:id',jwt.accessPermission(false,[]),(req,res)=>auth.UpdateUser(req,res))
router.post('/pre-url-request',(req, res) => auth.preUrlRequest(req, res))

export default router;