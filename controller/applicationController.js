import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Application } from "../model/applicationSchema.js";
import cloudinary from "cloudinary"
import { Job } from "../model/jobSchema.js";

export const postApplication=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user
    if(role==="Employer")
        {
            return next(new ErrorHandler("Employer are not allowed to Post an application",400))
        }
    if(!req.files || Object.keys(req.files).length===0)
        {
            return next(new ErrorHandler("Resume File Required"))
        }
    const {resume}=req.files
    const allowedFormate=["image/png","image/jpeg","image/webp"]
    if(!allowedFormate.includes(resume.mimetype))
        {
            return next(new ErrorHandler("Invalid File Type. Please upload a PNG,JPG or WEBP Formate",400))
        }
    const cloudinaryResponse=await cloudinary.uploader.upload(resume.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error)
        {
            console.error("Cloudinary Error : ", cloudinaryResponse.error || "Unknown Cloudinary error")
            return next(new ErrorHandler("Failed to upload Resume",500))
        }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID={
        user:req.user._id,
        role:"Job Seeker"
    }
    if(!jobId)
        {
            return next(new ErrorHandler("Job not Found",404))
        }
    const jobDetails=await Job.findById(jobId)
    if(!jobDetails)
        {
            return next(new ErrorHandler("Job not Found",404))
        }
     const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  }

  if (!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume)
     {
        return next(new ErrorHandler("Please fill all fields.", 400));
     }
    const application=await Application.create({
        name, email, coverLetter, phone, address, applicantID, employerID, resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success:true,
        message:"Application Sent successfully",
        application
    })
    
})

export const employerGetAllApplications=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user
    if(role==="Job Seeker")
        {
            return next(new ErrorHandler("Job seekers are not allowed to access these resources",400))
        }
    const {_id}=req.user
    const application=await Application.find({'employerID.user':_id})
    res.status(200).json({
        success:true,
        application
    })
})
export const jobSeekerGetAllApplications=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user
    if(role==="Employer")
        {
            return next(new ErrorHandler("Employer are not allowed to access these resources",400))
        }
    const {_id}=req.user
    const application=await Application.find({'applicantID.user':_id})
    res.status(200).json({
        success:true,
        application
    })
})

export const jobSeekerDeleteApplication=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user
    if(role==="Employer")
        {
            return next(new ErrorHandler("Employer are not allowed to access these resources",400))
        }
    const {id}=req.params
    const application=await Application.findById(id)
    if(!application)
        {
            return next(new ErrorHandler("Oops,application not found ! ",404))
        }
    await application.deleteOne()
    res.status(200).json({
        success:true,
        message:"Application deleted successfully"
    })
})

 