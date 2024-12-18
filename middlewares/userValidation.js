import User from '../models/User.js'



export const userCreation = (req, res, next) => {
    const { email, name, last_name, password } = req.body
    if (!email, !name, !last_name, !password) {
        return res.json({ message: 'All fields are required' })
    }
    next()
}

export const emailVerification = async (req, res, next) => {
    const { email } = req.body
    const searchUserByEmail = await User.findOne({ email })
    if (searchUserByEmail) {
        return res.status(400).json({ message: 'Email already taken' })
    }
    next()
}