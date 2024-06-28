import mongoose from "mongoose";
import validator from "validator";

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide Your name"],
        minlength:[3,"Name must contain atleast 3 charecters"],
        maxlength:[30,"name cannot exceed more than 30 characters"]
    },
    email:{
        type:String,
        required:[true,"Please provide your Email"],
        validate:[validator.isEmail,"Please provide a valide email"]
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide your coverLetter"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"],
    },
    address:{
       type:String,
       required:[true,"Please provide your address"]
    },
    resume:{
       public_id:{
        type:String,
        required:true,
       },
       url:{
        type:String,
        required:true
       }
    },
    applicantID:{
      user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true,
      },
      role:{
        type:String,
        role:["Job Seeker"],
        required:true,
      }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
         },
         role:{
           type:String,
           role:["Employer"],
           required:true,
         }
    }
})

export const Application=mongoose.model("Application",applicationSchema)