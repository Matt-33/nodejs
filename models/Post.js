import {mongoose, Schema}  from 'mongoose'



const postSchema = Schema({
    title:  {type : String, required : true}, // String is shorthand for {type: String}
    author: {type : String, required : true},
    content:   String,
    date: { type: Date, default: Date.now },
    user_id : {
        type : mongoose.Schema.Types.ObjectId, ref : 'User' // create the association with the other collection through the userId
    }
})

export default mongoose.model('Post', postSchema)