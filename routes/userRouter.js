import { Router } from 'express'
import User from '../models/User.js'
import { emailVerification, userCreation } from '../middlewares/userValidation.js'

const userRouter = Router()

userRouter.get('/users', async (req, res) => {
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
})

userRouter.post('/user', userCreation, emailVerification, async (req, res) => {
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
})




export default userRouter