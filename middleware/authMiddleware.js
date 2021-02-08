import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//it extracts id from token and fetched user by id and attaches found user to req
const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]
      const { id } = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(id).select('name email')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }
