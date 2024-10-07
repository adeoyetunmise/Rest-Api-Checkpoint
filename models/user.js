import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
})

const User = mongoose.model('User', userSchema)

export default User