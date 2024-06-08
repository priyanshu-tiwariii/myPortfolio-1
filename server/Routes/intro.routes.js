import { Router } from "express";
import { createIntro, addSkills,addSocials,updatedIntro,getIntro,getAllIntro,deleteIntro,deleteSocial,deleteSkill,getSkill,getSocial } from "../Controller/intro.controllers.js";

const router = Router();
router.post('/createIntro', createIntro);
router.post('/addSkills', addSkills);
router.post('/addSocials', addSocials);
router.post('/updatedIntro', updatedIntro);
router.post('/getIntro', getIntro);
router.get('/getAllIntro', getAllIntro);
router.delete('/deleteIntro', deleteIntro);
router.delete('/deleteSocial', deleteSocial);
router.delete('/deleteSkill', deleteSkill);
router.get('/getSkill', getSkill);
router.get('/getSocial', getSocial);
export default router;
