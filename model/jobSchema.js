import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide job title"],
        minength:[3,"job title must contain atleast 3 characters"],
        maxlength:[50,"job title cannot exceed 50 characters"],
    },
    description:{
        type:String,
        required:[true,"please provide job description"],
        minength:[30,"job description must contain atleast 30 characters"],
        maxlength:[500,"job description cannot exceed 500 characters"],
    },
    category:{
        type:String,
        required:[true,"job category is required"]
    },
    country:{
        type:String,
        required:[true,"job country is required"]
    },
    city:{
        type:String,
        required:[true,"job city is required"]
    },
    location:{
        type:String,
        required:[true,"Please provide exact location"],
        minlength:[10,"job location must contain atleast 10 Charecters"]
    },
    fixedSalary:{
        type:Number,
        minlength:[4,"fixed salary must contain atleast 4 Digits"],
        maxlength:[9,"fixed salary cannot exceed 9 digits"],
    },
    salaryFrom:{
        type:Number,
        minlength:[4,"salary from must contain atleast 4 Digits"],
        maxlength:[9,"salary from cannot exceed 9 digits"],
    },
    salaryTo:{
        type:Number,
        minlength:[4,"Salary To must contain atleast 4 Digits"],
        maxlength:[9,"Salary To cannot exceed 9 digits"],
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now(),
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }
})

export const Job=mongoose.model("Job",jobSchema);