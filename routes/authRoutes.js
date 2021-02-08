import express from 'express'
import { signin, signup } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.route('/protected').get(protect, (req, res) => res.send(req.user))

export default router
