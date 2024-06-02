import jwt from "jsonwebtoken";
import  Admin  from "../Models/admin.models.js";
import apiError  from "../Helper/apiError.js";

import  asyncHandler  from "../Helper/asyncHandler.js";

export const verifyJWT = asyncHandler(async(req,_,next) => {
    try {
        const token = req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            throw new apiError(401,'Unauthorized');
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Admin.findById(decoded.id);

        if(!user){
            throw new apiError(404,'User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        throw new apiError(401,'Unauthorized');
    }

})