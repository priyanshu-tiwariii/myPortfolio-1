import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";
import Message from "../Models/message.models.js";
import asyncHandler from "../Helper/asyncHandler.js";
import Projects from "../Models/project.models.js";
import Intro from "../Models/intro.models.js";
import Project from "../Models/project.models.js";
export const createMessage = asyncHandler(async (req, res) => {
    try {
        const { message, email, first_name, last_name } = req.body;
        const newMessage = await Message.create({
        message,
        email,
        first_name,
        last_name,
        });
    
        if (!newMessage) {
        throw new apiError(400, "Message creation failed");
        }
    
        return res
        .status(201)
        .json(new apiResponse(201, {}, "Message created successfully"));
    } catch (error) {
        throw new apiError(400, "Message creation failed");
    }
    });

export const getMessages = asyncHandler(async (req, res) => {
    try {
        const isAdmin = req.user.isAdmin;
        if (!isAdmin) {
        throw new apiError(401, "Unauthorized");
        }
        const messages = await Message.find();
        return res.status(200).json(new apiResponse(200, messages, "Messages fetched successfully"));
    } catch (error) {
        throw new apiError(400, "Message fetch failed");
    }
    });

export const deleteMessage = asyncHandler(async (req, res) => {
    try {
        const _id = req.query._id
        const isAdmin = req.user.isAdmin;
        if (!isAdmin) {
        throw new apiError(401, "Unauthorized");
        }
        
        const deleteMessages = await Message.findByIdAndDelete(_id); 
        if (!deleteMessages) {
        throw new apiError(400, "Message deletion failed");
        }
        return res
        .status(200)
        .json(new apiResponse(200, {}, "Message deleted successfully"));
    } catch (error) {
        throw new apiError(400, "Message deletion failed");
    }
    }
    );

   
