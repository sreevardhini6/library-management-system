import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxLength:30    

    },
    email: {
        type:String,
        trim:true,
        maxLength:30,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true,
        minLength:4
    },
    is_admin:{
        type:Boolean
    }


})

const User = mongoose.model('User', userSchema)

export {
    User
}