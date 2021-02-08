import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(422)
    throw new Error('Please enter all  fields')
  }

  const emailExists = await User.findOne({ email })

  if (emailExists) {
    res.status(409)
    throw new Error('Email is already taken')
  }

  try {
    const user = new User({ name, email, password })
    const createdUser = await user.save()

    res.status(201).json({
      status: 'success',
      message: 'user created successfully',
      user: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        token: generateToken(createdUser._id),
      },
    })
  } catch (error) {
    res.status(500)
    throw new Error(`Error: ${error.message}`)
  }
})

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
})
