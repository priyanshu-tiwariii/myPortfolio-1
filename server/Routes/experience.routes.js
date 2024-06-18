import {Router} from 'express';
import { createExperience, deleteExperience,getExperiences, updateExperience } from '../Controller/experience.controllers.js';
import { verifyJWT } from '../Middleware/verifyJWT.js';

const route = Router();
route.post("/createExperience",verifyJWT,createExperience);
route.put("/updateExperience",verifyJWT,updateExperience);
route.delete("/deleteExperience",verifyJWT,deleteExperience);
route.get("/getExperience",getExperiences);



export default route;