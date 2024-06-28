class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode
    }
}

export const errorMiddleware=(err,req,res,next)=>{
     err.message=err.message || "Internal server error"
     err.statusCode=err.statusCode || 500

     if(err.name==="caseError")
        {
           message = `Error not found. Invalid ${err.path}`
           err=new ErrorHandler(message,400)
        }
     if(err.code==="11000")
        {
           message = `Duplcate ${Object.keys(err.keyValue)} Entered`;
           err=new ErrorHandler(message,400)
        }
     if(err.name==="jsonWebTokenError")
        {
           message = `Json web token is invald please try again`
           err=new ErrorHandler(message,400)
        }
     if(err.name==="TokenExpiredError")
        {
           message = `Json web token is expired please try again`
           err=new ErrorHandler(message,400)
        }
        return res.status(err.statusCode).json({
         success: false,
         message: err.message,
        })
}

export default ErrorHandler;