import express from "express"
import { employerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplications, postApplication } from "../controller/applicationController.js";
import { isAuthorised } from "../middleware/auth.js";

const router=express.Router();

router.get("/employer/getall",isAuthorised,employerGetAllApplications)
router.get("/jobseeker/getall",isAuthorised,jobSeekerGetAllApplications)
router.delete("/delete/:id",isAuthorised,jobSeekerDeleteApplication)
router.post("/post",isAuthorised,postApplication)

export default router;