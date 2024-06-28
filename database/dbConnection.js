import mongoose from "mongoose";

export const dbConnection=()=>{
     mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_STACK_JOB_SEEKING"
    }).then(()=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log(`SOME ERROR OCCURED OCCURED DURING CONNETION TO DATABASE : ${err}`)
    })
   
}

