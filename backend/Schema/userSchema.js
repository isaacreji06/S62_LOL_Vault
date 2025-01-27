const { string } = require('i/lib/util');
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        required:true,
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    bio:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const User=mongoose.model('User',userSchema,'Users')
module.exports=User