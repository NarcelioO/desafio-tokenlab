import express from 'express'
const router = express.Router();

import auth from './Auth.js'
import events from './Events.js'

router.use('/auth', auth)
router.use('/events', events)

export default router