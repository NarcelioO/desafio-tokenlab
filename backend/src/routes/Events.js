import {Router} from 'express'
import eventController from '../controllers/eventController.js'
import auth from '../middlewares/auth.js'

const router = Router()
router.use(auth)

router.route('/')
    .get((req, res)=>eventController.list(req, res))
    .post((req, res)=>eventController.create(req, res))


router.route('/:id')
    .put((req, res)=>eventController.update(req, res))
    .delete((req, res)=>eventController.delete(req, res))


export default router


