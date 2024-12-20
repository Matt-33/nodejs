import Post from '../models/Post.js'



export const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate('user_id', '-password')
    return res.json(posts)
}

export const createPost = async (req, res) => {
    const {title, author, content, user_id} = req.body
    const newPost = await new Post(req.body)
    newPost.save()
    return res.json(newPost)

}
