import express from 'express'
import {
  createPost,
  getAllPosts,
  getMyPosts,
} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createPost).get(getAllPosts)
router.route('/myposts').get(protect, getMyPosts)

export default router
