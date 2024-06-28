import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler, { errorMiddleware } from "../middleware/error.js";
import { User } from "../model/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill full Registration form !"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exist !"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  sendToken(user, 200, res, "User registered successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("plaese provide email,password and role", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password", 400));
  }
  const isComparePassword = await user.comparePassword(password);
  if (!isComparePassword) {
    return next( new ErrorHandler("Invalid email or Password", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("user with this role is not found", 400));
  }
  sendToken(user,200,res,"user loggedIn succesfully")
});

export const logout=catchAsyncError(async(req,res,next)=>{
  res.status(201).cookie("token","",{
    httpOnly:true,
    expires:new Date(Date.now()),
    secure:true,
        sameSite:"None",
  }).json({
    success: true,
    message:"User Logged out successfully !"
  })
})

export const getUser=catchAsyncError((req,res,next)=>{
   const user=req.user
   res.status(200).json({
    success:true,
    user
   })
})
