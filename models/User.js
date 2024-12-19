import mongoose, { Schema } from 'mongoose'


const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // match : '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    },
    name: {
        type: String,
        required: true
    },
    last_name: String,
    password: {
        type: String,
        required: true,
        minlength: 4,
    }
})

export default mongoose.model('User', userSchema)