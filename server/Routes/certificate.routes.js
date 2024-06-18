import { Router } from "express";
import { createCertificate, deleteCertificate, deleteCertificateImage, getAllCertificates, updateCertificate, uploadCertificateImage } from "../Controller/certificate.controllers.js";
import { verifyJWT } from "../Middleware/verifyJWT.js";
import upload from "../Middleware/uploadFile.middleware.js";

const route = Router();

route.post("/createCertificate",verifyJWT,createCertificate)
route.put("/updateCertificate",verifyJWT,updateCertificate);
route.delete("/deleteCertificate",verifyJWT,deleteCertificate);
route.get("/getCertificates",getAllCertificates);
route.post("/uploadImage",verifyJWT, upload.single("certificateImage"),uploadCertificateImage);
route.delete("/deleteImage",verifyJWT,deleteCertificateImage);
export default route;