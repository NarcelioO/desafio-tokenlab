import {Router} from 'express'
import authController from '../controllers/AuthController.js';
const router = Router();


router.route('/login')
    .post((req, res)=>authController.login(req, res))

router.route('/register')
    .post((req, res)=>authController.register(req, res))

    
export default router;


