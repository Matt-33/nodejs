import {Router} from 'express'
import { createPost, getAllPosts } from '../controllers/postController.js'



const postRouter = Router()


postRouter.get('/posts', getAllPosts )
postRouter.post('/post', createPost)

export default postRouter