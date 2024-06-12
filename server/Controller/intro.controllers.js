import asyncHandler from "../Helper/asyncHandler.js";
import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";
import Intro from "../Models/intro.models.js";
import {
  uploadFileOnCloudinary,
  deleteFileFromCloudinary,
} from "../Helper/cloudinary.js";

export const createIntro = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      headlines,
      location,
      city,
      about,
      hobbies,
      languages,
      interests,
      subHeading
    } = req.body;
    const unique_id = process.env.UNIQUE_ID;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      throw new apiError(400, "You are not authorized to add social media");
    }
    const existedIntro = await Intro.findOne({ unique_id });
    if (existedIntro) {
      const updatedIntro = await Intro.findOneAndUpdate(
        { unique_id },
        req.body,
        { new: true }
      );

      if (!updatedIntro) {
        throw new apiError(400, "Intro update failed");
      }
      return res
        .status(200)
        .json(new apiResponse(200, updatedIntro, "Intro updated successfully"));
    }

    const newIntro = await Intro.create({
      name,
      email,
      headlines,
      location,
      city,
      about,
      hobbies,
      languages,
      interests,
      subHeading
    });

    if (!newIntro) {
      throw new apiError(400, "Intro creation failed");
    }

    return res
      .status(201)
      .json(new apiResponse(201, newIntro, "Intro created successfully"));
  } catch (error) {
    throw new apiError(400, "Intro creation failed");
  }
});

export const addSocials = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const { email, name, url } = req.body;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(400, "You are not authorized to add social media");
    }
    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      const newIntro = await Intro.create({
        email,
        unique_id,
        socials: [
          {
            name: name,
            url: url,
          },
        ],
      });
      const newSocials = newIntro.socials;

      return res
        .status(201)
        .json(
          new apiResponse(201, newSocials, "Social MEdia created successfully")
        );
    }
    const socialExist = existedIntro.socials.find(
      (social) => social.name === name
    );
    if (socialExist) {
      throw new apiError(400, "Social Media already exist");
    }

    const addSocial = await Intro.findOneAndUpdate(
      { email },
      {
        $push: {
          socials: {
            name: name,
            url: url,
          },
        },
      },
      { new: true }
    );

    if (!addSocial) {
      throw new apiError(400, "Social Media creation failed");
    }

    const newSocials = addSocial.socials;

    return res
      .status(201)
      .json(
        new apiResponse(201, newSocials, "Social Media added successfully")
      );
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

export const addSkills = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const { name, level,category } = req.body;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(400, "You are not authorized to add social media");
    }
    const existedIntro = await Intro.findOne({ unique_id });

    if (!existedIntro) {
      const newIntro = await Intro.create({
        unique_id,
        skills: [
          {
            name,
            level,
            category
          },
        ],
      });

      const newSkills = newIntro.skills;
      return res
        .status(201)
        .json(new apiResponse(201, newSkills, "Skills created successfully"));
    }
    const skillExist = existedIntro.skills.find((skill) => skill.name === name);
    if (skillExist) {
      throw new apiError(400, "Skill already exist");
    }

    const addSkills = await Intro.findOneAndUpdate(
      { unique_id },
      {
        $push: {
          skills: {
            name,
            level,
            category
          },
        },
      },
      {
        new: true,
      }
    );

    if (!addSkills) {
      throw new apiError(400, "Skills creation failed");
    }

    const newSkills = addSkills.skills;

    return res
      .status(201)
      .json(new apiResponse(201, newSkills, "Skills created successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

export const getIntro = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      throw new apiError(400, "Intro not found");
    }
    return res
      .status(200)
      .json(new apiResponse(200, existedIntro, "Intro found successfully"));
  } catch (error) {
    throw new apiError(400, "Intro not found");
  }
});



export const deleteSocial = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const _id = req.query._id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(400, "You are not authorized to add social media");
    }
    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      throw new apiError(400, "Intro not found");
    }
    const deletedSocial = await Intro.findOneAndUpdate(
      { unique_id },
      {
        $pull: {
          socials: {
            _id,
          },
        },
      },
      { new: true }
    );
    if (!deletedSocial) {
      throw new apiError(400, "Social delete failed");
    }
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Social deleted successfully"));
  } catch (error) {
    throw new apiError(400, "Social delete failed");
  }
});

export const deleteSkill = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const _id = req.query._id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(400, "You are not authorized to add social media");
    }
    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      throw new apiError(400, "Intro not found");
    }
    const deletedSkill = await Intro.findOneAndUpdate(
      { unique_id },
      {
        $pull: {
          skills: {
            _id,
          },
        },
      },
      { new: true }
    );

    if (!deletedSkill) {
      throw new apiError(400, "Skill delete failed");
    }
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Skill deleted successfully"));
  } catch (error) {
    throw new apiError(400, "Skill delete failed");
  }
});

export const getSocial = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      throw new apiError(400, "Intro not found");
    }
    return res
      .status(200)
      .json(
        new apiResponse(200, existedIntro.socials, "Socials found successfully")
      );
  } catch (error) {
    throw new apiError(400, "Socials not found");
  }
});

export const getSkill = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      throw new apiError(400, "Intro not found");
    }
    return res
      .status(200)
      .json(
        new apiResponse(200, existedIntro.skills, "Skills found successfully")
      );
  } catch (error) {
    throw new apiError(400, "Skills not found");
  }
});





export const uploadProfileImage = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;

    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      const newIntro = await Intro.create({
        unique_id,
        image: [],
      });
    }

    const Profile = req.file.path;
   
    if (!Profile) {
      throw new apiError(400, "Profile image not found");
    }

    const profileImage = await uploadFileOnCloudinary(Profile);
    if (!profileImage) {
      throw new apiError(400, "Profile image upload failed");
    }

    const updatedIntro = await Intro.findOneAndUpdate(
      { unique_id },
      {
        image: [
          {
            url: profileImage.secure_url,
            public_id: profileImage.public_id,
          },
        ],
      },
      { new: true }
    );
    if (!updatedIntro) {
      throw new apiError(400, "Profile image update failed");
    }
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          updatedIntro,
          "Profile image uploaded successfully"
        )
      );
  } catch (error) {
   
    throw new apiError(400, "Profile image upload failed");
  }
});

export const deleteProfileImage = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const publicId = req.query.publicId;
    const existedIntro = await Intro.findOne({
      unique_id,
    });
    if (!existedIntro) {
      throw new apiError(400, "Intro not found");
    }

    const deleteImage = await deleteFileFromCloudinary(publicId);
    if (!deleteImage) {
      throw new apiError(400, "Profile image delete failed");
    }

    const deletedProfileImage = await Intro.findOneAndUpdate(
      { unique_id },
      {
        image: null,
      }
    );

    if (!deletedProfileImage) {
      throw new apiError(400, "Profile image delete failed");
    }
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Profile image deleted successfully"));
  } catch (error) {
    throw new apiError(400, "Profile image delete failed");
  }
});


export const uploadResumePdf = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const existedIntro = await Intro.findOne({ unique_id });
    if (!existedIntro) {
      const newIntro = await Intro.create({
        unique_id,
        resumePdf: [],
      });
    }

    const Profile = req.file.path;
    
    if (!Profile) {
      throw new apiError(400, "PDF not found");
    }

    const profileImage = await uploadFileOnCloudinary(Profile);
    if (!profileImage) {
      throw new apiError(400, "PDF upload failed");
    }

  
    const updatedIntro = await Intro.findOneAndUpdate(
      { unique_id },
      {
        resumePdf: [
          {
            url: profileImage.secure_url,
            public_id: profileImage.public_id,
          },
        ],
      },
      { new: true }
    );
    if (!updatedIntro) {
      throw new apiError(400, "PDF update failed");
    }
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          updatedIntro,
          "PDF uploaded successfully"
        )
      );
  } catch (error) {
    
    throw new apiError(400, "PDF upload failed");
  }
});

export const deleteResumePdf = asyncHandler(async (req, res) => {
  try {
    const unique_id = process.env.UNIQUE_ID;
    const publicId = req.query.publicId;
    const existedIntro = await Intro.findOne({
      unique_id,
    });
    if (!existedIntro) {
      throw new apiError(400, "Intro not found");
    }

    const deleteImage = await deleteFileFromCloudinary(publicId);
    if (!deleteImage) {
      throw new apiError(400, "PDF delete failed");
    }

    const deletedProfileImage = await Intro.findOneAndUpdate(
      { unique_id },
      {
        resumePdf: null,
      }
    );

    if (!deletedProfileImage) {
      throw new apiError(400, "PDF delete failed");
    }
    return res
      .status(200)
      .json(new apiResponse(200, {}, "PDF deleted successfully"));
  } catch (error) {
    throw new apiError(400, "PDF delete failed");
  }
});

