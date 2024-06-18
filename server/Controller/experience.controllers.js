import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";
import asyncHandler from "../Helper/asyncHandler.js";
import Experience from "../Models/experience.models.js";
import { uploadFileOnCloudinary, deleteFileFromCloudinary } from "../Helper/cloudinary.js";
// Create Experience
export const createExperience = asyncHandler(async (req, res) => {
  try {
    const { role, companyName, employmentType, location, startDate, endDate, experience, description } = req.body;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const newExperience = await Experience.create({
      role,
      companyName,
      employmentType,
      location,
      startDate,
      endDate,
      experience,
      description,

    });

    if (!newExperience) {
      throw new apiError(400, "Experience creation failed");
    }

    return res.status(201).json(new apiResponse(201, newExperience, "Experience created successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Update Experience
export const updateExperience = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const { role, companyName, employmentType, location, startDate, endDate, experience, description } = req.body;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const updateExperience = await Experience.findByIdAndUpdate(
      { _id },
      {
        role,
        companyName,
        employmentType,
        location,
        startDate,
        endDate,
        experience,
        description,
      }
    );

    if (!updateExperience) {
      throw new apiError(400, "Experience update failed");
    }

    return res.status(200).json(new apiResponse(200, updateExperience, "Experience updated successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Delete Experience
export const deleteExperience = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const deleteExperience = await Experience.findByIdAndDelete({ _id });

    if (!deleteExperience) {
      throw new apiError(400, "Experience deletion failed");
    }

    return res.status(200).json(new apiResponse(200, deleteExperience, "Experience deleted successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Get All Experiences
export const getExperiences = asyncHandler(async (req, res) => {
  try {
    const experiences = await Experience.find(
      {
        ...(req.query.role) && { role: req.query.role },
        ...(req.query._id) && { _id: req.query._id },
      }
    );

    if (!experiences) {
      throw new apiError(400, "No experiences found");
    }

    return res.status(200).json(new apiResponse(200, experiences, "Experiences fetched successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});




