import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide youe name !"],
        minlength:[3,"name must contain atleast 3 characters !"],
        maxlength:[30,"name cannot exceed 30 charecters !"],
    },
    email:{
        type:String,
        required:[true,"please provide your email !"],
        validate:[validator.isEmail,"please provide a valid email !"],
    },
    phone:{
        type:Number,
        required: [true,"please provide  your phone number."],

    },
    password:{
        type:String,
        required:[true,"please provide your password !"],
        minlength:[8,"password must contain atleast 8 characters !"],
        maxlength:[32,"password cannot exceed 32 charecters !"],
        select: false,
    },
    role:{
        type:String,
        required:[true,"Please provide your role !"],
        enum:["Job Seeker","Employer"],
    },
    createdDate:{
        type:Date,
        default:Date.now,
    }
    
});

// Hashing Password
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

// Comparing password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User= mongoose.model("User",userSchema);