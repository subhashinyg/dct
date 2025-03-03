import { Router } from "express"
import { AdminController } from "../../controller/admin/admin-controller"
import { JwtHandler } from "../../utilities/handler/jwt-handler"
import { ERole } from "../../constants/enum/auth-enum"

const admin = new AdminController()
const jwt = new JwtHandler()
const router = Router()

router.get('/dashboard',jwt.accessPermission(false,[ERole.ADMIN]),admin.dashboard)
router.post('/admin-registration', admin.adminRegistration)
router.post('/create-our-projects',jwt.accessPermission(false,[ERole.USER]),(req, res) => admin.createProject(req, res))
router.delete('/delete-projects/:id',jwt.accessPermission(false,[ERole.USER]),(req, res) => admin.deleteProject(req, res))
router.put('/update-projects/:id',jwt.accessPermission(false,[ERole.USER]),(req, res) => admin.updateProject(req, res))

export default router