
import { Router } from "express";
import upload from "../Middleware/uploadFile.middleware.js";
import { verifyJWT } from "../Middleware/verifyJWT.js";
import { createEducation, deleteEducation, deleteEducationImage, getEducation, updateEducation, uploadEducationImage } from "../Controller/education.controllers.js";
const router = Router();

router.post("/createEducation" ,verifyJWT,createEducation)
router.put("/updateEducation" , verifyJWT, updateEducation)
router.delete("/deleteEducation",verifyJWT,deleteEducation)

router.get("/getEducation" , getEducation)
router.post("/uploadImage",verifyJWT,upload.single("educationImage"),uploadEducationImage)
router.delete("/deleteImage",verifyJWT,deleteEducationImage)

export default router