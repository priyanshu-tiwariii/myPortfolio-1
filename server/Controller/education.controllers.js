import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";
import asyncHandler from "../Helper/asyncHandler.js";
import Education from "../Models/Education.models.js";
import { uploadFileOnCloudinary, deleteFileFromCloudinary } from "../Helper/cloudinary.js";

// Create Education
export const createEducation = asyncHandler(async (req, res) => {
  try {
    const { school, startDate, endDate, fieldOfStudy, degree ,images } = req.body;
    const isAdmin = req.user.isAdmin;
   
    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const newEducation = await Education.create({
      school,
      startDate,
      endDate,
      fieldOfStudy,
      degree,
      image : images
    });

    if (!newEducation) {
      throw new apiError(400, "Education creation failed");
    }

    return res.status(201).json(new apiResponse(201, newEducation, "Education created successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Update Education
export const updateEducation = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const { school, startDate, endDate, fieldOfStudy, degree,images } = req.body;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const updateEducation = await Education.findByIdAndUpdate(
      { _id },
      {
        school,
        startDate,
        endDate,
        fieldOfStudy,
        degree,
        image: images
      },
      { new: true }
    );

    if (!updateEducation) {
      throw new apiError(400, "Education update failed");
    }

    return res.status(200).json(new apiResponse(200, updateEducation, "Education updated successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Delete Education
export const deleteEducation = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const deleteEducation = await Education.findByIdAndDelete(_id);

    if (!deleteEducation) {
      throw new apiError(400, "Education deletion failed");
    }

    return res.status(200).json(new apiResponse(200, {}, "Education deleted successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Upload Education Image
export const uploadEducationImage = asyncHandler(async (req, res) => {
  try {
    const EduImage = req.file.path;

    if (!EduImage) {
      throw new apiError(400, "Institute image not found");
    }

    const educationImage = await uploadFileOnCloudinary(EduImage);

    if (!educationImage) {
      throw new apiError(400, "Institute image upload failed");
    }

    const { secure_url: url, public_id } = educationImage;

    return res.status(200).json(new apiResponse(200, { url, public_id }, "Education image uploaded successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Delete Education Image
export const deleteEducationImage = asyncHandler(async (req, res) => {
  try {
   
    const _id = req.query._id;
    const public_id = req.query.public_id;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const existedEducation = await Education.findById(_id);

    if (!existedEducation) {
      throw new apiError(400, "Education not found");
    }

    const deleteImage = await deleteFileFromCloudinary(public_id);

    if (!deleteImage) {
      throw new apiError(400, "Education image delete failed");
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      { _id },
      {
        $pull: { image: { public_id } },
      },
      { new: true }
    );

    if (!updatedEducation) {
      throw new apiError(400, "Education image delete failed");
    }

    return res.status(200).json(new apiResponse(200, {}, "Education image deleted successfully"));
  } catch (error) {
   
    throw new apiError(400, error.message);
  }
});

// Get Education
export const getEducation = asyncHandler(async (req, res) => {
  try {
    const educations = await Education.find({
      ...(req.query._id ) && { _id: req.query._id },
      ...(req.query.school ) && { school: req.query.school },
    }
    );

    if (!educations) {
      throw new apiError(400, "Unable to get education");
    }

    return res.status(200).json(new apiResponse(200, educations, "Education found"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});
