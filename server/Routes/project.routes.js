import {Router} from 'express';
import { uploadImage,deleteImage, updateProject,deleteProject, getProjects, createProject } from '../Controller/projects.controllers.js';
import upload from '../Middleware/uploadFile.middleware.js';
import { verifyJWT } from '../Middleware/verifyJWT.js';

const router = Router();

router.post('/uploadImage',verifyJWT,upload.array('images', 10), uploadImage);
router.delete('/deleteImage',verifyJWT,deleteImage);
router.post('/updateProject',verifyJWT,updateProject)
router.delete('/deleteProject',verifyJWT,deleteProject)
router.get ("/getProject",getProjects)
router.post('/createProject',verifyJWT,createProject);
export default router;