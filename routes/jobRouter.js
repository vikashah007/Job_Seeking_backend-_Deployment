import express from "express"
import { deleteJob, getAllJobs, getMyJobs, getSingleJob, postJob, updateJob } from "../controller/jobController.js";
import { isAuthorised } from "../middleware/auth.js";

const router=express.Router();

router.get("/getall",getAllJobs)
router.post("/post",isAuthorised,postJob)
router.get("/getmyjobs",isAuthorised,getMyJobs)
router.put("/update/:id",isAuthorised,updateJob)
router.delete("/delete/:id",isAuthorised,deleteJob)
router.get("/:id",isAuthorised,getSingleJob)


export default router;