import { Router } from "express";
import { createIntro, addSkills,addSocials,getIntro,deleteSocial,deleteSkill,getSkill,getSocial, uploadProfileImage, deleteProfileImage, uploadResumePdf, deleteResumePdf, getResumePdf, totalThings } from "../Controller/intro.controllers.js";
import upload from "../Middleware/uploadFile.middleware.js";
import { verifyJWT } from "../Middleware/verifyJWT.js";
const router = Router();

router.post('/createIntro',verifyJWT, createIntro);
router.post('/addSkills',verifyJWT ,addSkills);
router.post('/addSocials',verifyJWT, addSocials);

router.get('/getIntro', getIntro);

router.get('/getSkill', getSkill);
router.get('/getSocial', getSocial);


router.delete('/deleteSocial',verifyJWT, deleteSocial);
router.delete('/deleteSkill',verifyJWT, deleteSkill);


router.post("/uploadProfileImage",upload.single("profileImage"), uploadProfileImage);
router.delete("/deleteProfileImage", deleteProfileImage);

router.post("/uploadResumePdf",upload.single("resumePdf"),uploadResumePdf );
router.delete("/deleteResumePdf",deleteResumePdf)
router.get("/resumePdf", getResumePdf)
router.get("/getTotal", totalThings)

export default router;
