// import asyncHandler from "../Helper/asyncHandler.js";
// import apiError from "../Helper/apiError.js";
// import apiResponse from "../Helper/apiResponse.js";



// export const createIntro = asyncHandler(async (req, res) => {
//     try {
//         const {name,email,image,headlines,location,city,about,socials,skills,hobbies,languages,interests,references,resumePdf, extraLinks} = req.body;
//         const existedIntro = await Intro.findOne({ email });

        
//     } catch (error) {
//         throw new apiError(400, "Intro creation failed");
//     }
// }
// );