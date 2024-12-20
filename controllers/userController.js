import User from '../models/User.js'
import Post from '../models/Post.js'



export const getAllUsers =  async (req, res) => {
    try {
        const users = await User.find()
        if (users.length < 1) {
            return res.json({ message: 'Users not found' })
        }
        return res.json(users)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}


export const createUser =  async (req, res) => {
    let { email, name, last_name, password } = req.body
    try {
        const newUser = await new User({
            email,
            name,
            last_name,
            password
        })
        newUser.save()
        return res.status(201).json({ message: 'User has been created' })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export const getUserByID =  async (req, res) => {
    const {id} = req.params
    try{
        const userByID = await User.findById(id)
        if(!userByID){
            return res.status(400).json({message : 'User not found'})
        }
        return res.json(userByID)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export const updateUserByID = async (req, res) => {
    const {id} = req.params
    try{
       const updatedUser = await User.findByIdAndUpdate(id, req.body, {new : true})
       return res.status(200).json(updatedUser)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export const deleteUserByID = async (req, res) => {
    const {id} = req.params
    try{
        const deleteUser = await User.deleteOne({_id : id})
        const deletePostsRelatedToUser = await Post.deleteMany({user_id : id})
        console.log(deletePostsRelatedToUser)
        
        if(deleteUser.deletedCount === 1){
            return res.status(203).json({message : 'User has been deleted'})
        }
        return res.status(400).json({message : 'User not found'})
     }
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Internal server error' })
     }
}