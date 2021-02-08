import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

export const createPost = asyncHandler(async (req, res) => {
  const user = req.user
  if (user) {
    const { title, content } = req.body
    if (!title || !content) {
      res.status(422)
      throw new Error(`Title or content of Post can't be empty`)
    }

    try {
      const post = new Post({ title, content, postedBy: user })
      const createdPost = await post.save()

      res.status(201).json({
        staus: 'success',
        message: 'post created successfully',
        post: {
          _id: createdPost._id,
          title: createdPost.title,
          content: createdPost.content,
          postedBy: createdPost.postedBy,
        },
      })
    } catch (error) {
      throw new Error(`Error: ${error.message}`)
    }
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//Public- GET - /api/posts
export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate('postedBy', 'name email')
  if (posts) {
    res.send({ posts })
  } else {
    res.status(404)
    throw new Error('No posts found')
  }
})

//Private- GET - /api/posts/myposts
export const getMyPosts = asyncHandler(async (req, res) => {
  const user = req.user

  if (user) {
    const posts = await Post.find({ postedBy: user._id })
    if (posts) {
      res.send({ posts })
    } else {
      res.status(404)
      throw new Error('No posts found')
    }
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
