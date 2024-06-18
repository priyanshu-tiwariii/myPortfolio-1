import { Router } from "express";
import { createMessage, deleteMessage, getMessages } from "../Controller/message.controller.js";
import {verifyJWT} from "../Middleware/verifyJWT.js";

const router = Router();


router.post("/createMessage" , createMessage)
router.get("/getMessage",verifyJWT, getMessages)
router.delete("/deleteMessage",verifyJWT, deleteMessage)



export default router