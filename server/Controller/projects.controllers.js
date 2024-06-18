import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";
import asyncHandler from "../Helper/asyncHandler.js";
import Project from "../Models/project.models.js";
import {
  uploadFileOnCloudinary,
  deleteFileFromCloudinary,
} from "../Helper/cloudinary.js";
import slugify from "slugify";


// upload multiple images
export const uploadImage = asyncHandler(async (req, res) => {
  try {
    
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }
     const images = req.files;
    if (!images || images.length === 0) {
      throw new apiError(400, "Please upload images");
    }
    const imagesUpload = images.map(async (image) => {
      const uploadedImage = await uploadFileOnCloudinary(image.path);
      return {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    });
    const uploadedImages = await Promise.all(imagesUpload);
      return res
        .status(200)
        .json(new apiResponse(200, uploadedImages, "Image uploaded successfully"));
    }
   catch (error) {
    console.log(error);
    throw new apiError(400, error.message);
  }
});

//create project
export const createProject = asyncHandler(async (req, res) => {
  try {
    const {
      projectName,
      description,
      skills,
      projectUrl,
      from,
      to,
      images,
      githubUrl,
      linkedinUrl,
      
    } = req.body;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }
    const slug = slugify(projectName, { lower: true }); 
    const newProject = await Project.create({
      projectName,
      description,
      skills,
      projectUrl,
      from,
      to,
      images : images.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      })),
      githubUrl,
      linkedinUrl,
      slug,
    });
    if (!newProject) {
      throw new apiError(400, "Project creation failed");
    }
    return res
      .status(201)
      .json(new apiResponse(201, newProject, "Project created successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

//entering other data for project
export const updateProject = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }
   
   
    
    const updateProject = await Project.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );
    
    if (!updateProject) {
      throw new apiError(400, "Project update failed");
    }
    return res
      .status(200)
      .json(
        new apiResponse(200, updateProject, "Project updated successfully")
      );
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

//delete image from project
export const deleteImage = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const public_id = req.query.public_id;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }
    
    if (!public_id) {
      throw new apiError(400, "Please provide public_id");
    }
    const project = await Project.findByIdAndUpdate(
      { _id },
      {
        $pull: { images: { public_id } },
      },
      { new: true }
    );
    if (!project) {
      throw new apiError(400, "Project update failed");
    }
    await deleteFileFromCloudinary(public_id);
    return res
      .status(200)
      .json(new apiResponse(200, project, "Image deleted successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

//delete project
export const deleteProject = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }
    const deleteProject = await Project.findByIdAndDelete({ _id });
    if (!deleteProject) {
      throw new apiError(400, "Project deletion failed");
    }
    return res
      .status(200)
      .json(new apiResponse(200, deleteProject, "Project deleted successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

//get  projects
export const getProjects = asyncHandler(async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let startIndex = (page - 1) * limit;
        if(req.query.startIndex){
            startIndex = parseInt(req.query.startIndex);
        }
        let endIndex = page * limit;
        const shortDirection = req.query.shortDirection || "desc";

        const projects = await Project.find({
            ...(req.query.projectName) && {projectName: req.query.projectName},
            ...(req.query.skills) && {skills: req.query.skills},
            ...(req.query.slug) && {slug : req.query.slug},
            ...(req.query.description) && {description: req.query.description},
            ...(req.query._id) && {_id: req.query._id},
            ...(req.query.search) && {
                $or: [
                    {
                        projectName: 
                        {
                            $regex: req.query.search,
                            $options: "i" }},
                    {
                        skills:
                         { 
                            $regex: req.query.search, 
                            $options: "i" 
                        }},

                    {
                        description:
                         { 
                            $regex: req.query.search,
                             $options: "i" 
                    }},
                ],
            },

        })
        .sort({createdAt: shortDirection})
        .limit(limit)
        .skip(startIndex)
        .exec();


        return res.status(200).json(new apiResponse(200,projects, "Projects fetched successfully"));

    } catch (error) {
        throw new apiError(404,error.message);
    }
}
)


