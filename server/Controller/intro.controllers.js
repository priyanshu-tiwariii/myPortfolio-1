import asyncHandler from "../Helper/asyncHandler.js";
import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";
import Intro from "../Models/intro.models.js";
import { uploadFileOnCloudinary,deleteFileFromCloudinary } from "../Helper/cloudinary.js";
export const createIntro = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      headlines,
      location,
      city,
      about,
      socials,
      skills,
      hobbies,
      languages,
      interests,
      references,
      resumePdf,
      extraLinks,
    } = req.body;
    const existedIntro = await Intro.findOne({ email });
    if (existedIntro) {
      const updatedIntro = await Intro.findOneAndUpdate(
        { email },
        {
          name,
          email,
        
          headlines,
          location,
          city,
          about,
          socials,
          skills,
          hobbies,
          languages,
          interests,
          references,
          resumePdf,
          extraLinks,
        }
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
      image,
      headlines,
      location,
      city,
      about,
      socials,
      skills,
      hobbies,
      languages,
      interests,
      references,
      resumePdf,
      extraLinks,
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
    const { email, name, url } = req.body;
    const existedIntro = await Intro.findOne({ email });
    if (!existedIntro) {
      const newIntro = await Intro.create({
        email,
        socials: [
          {
            name,
            url,
          },
        ],
      });
      return res
        .status(201)
        .json(new apiResponse(201, newIntro, "Socials created successfully"));
    }
    const addSocial = await Intro.findOneAndUpdate(
        { email },
        {
            $push:{
                socials:{
                    name,
                    url,
                }
            }
        }
    )

    if (!addSocial) {
      throw new apiError(400, "Socials creation failed");
    }

    const newSocials = await Intro.findOne({
        email,
        });
    return res
      .status(201)
      .json(new apiResponse(201, newSocials, "Socials added successfully"));

  } catch (error) {
    throw new apiError(400, "Socials creation failed");
  }
});

export const addSkills = asyncHandler(async (req, res) => {
    try {
        const { email, name, level } = req.body;
        const existedIntro = await Intro.findOne({ email });
        if (!existedIntro) {
        const newIntro = await Intro.create({
            email,
            skills: [
            {
                name,
                level,
            },
            ],
        });
        return res
            .status(201)
            .json(new apiResponse(201, newIntro, "Skills created successfully"));
        }
        const addSkills = await Intro.findOneAndUpdate(
            { email },
            {
                $push:{
                    skills:{
                        name,
                        level,
                    }
                }
            }
        )
    
        if (!addSkills) {
        throw new apiError(400, "Skills creation failed");
        }

        const newSkills = await Intro.findOne({
            email,
            });

        return res
        .status(201)
        .json(new apiResponse(201, newSkills, "Skills created successfully"));
    
    } catch (error) {
        throw new apiError(400, "Skills creation failed");
    }
    });

    export const updatedIntro = asyncHandler(async (req, res) => {
        try {
            const { email } = req.body;
            const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            const updatedIntro = await Intro.findOneAndUpdate
            (
                { email },
                req.body
            );
            if (!updatedIntro) {
                throw new apiError(400, "Intro update failed");
            }
            return res
                .status(200)
                .json(new apiResponse(200, updatedIntro, "Intro updated successfully"));

            
        } catch (error) {
            throw new apiError(400, "Intro update failed");
        }
    });

    export const getIntro = asyncHandler(async (req, res) => {
        try {
          const { email } = req.body;
          const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            return res
                .status(200)
                .json(new apiResponse(200, existedIntro, "Intro found successfully"));
        } catch (error) {
            throw new apiError(400, "Intro not found");
        }
    }
    );

    export const deleteIntro = asyncHandler(async (req, res) => {
        try {
            const { email } = req.body;
            const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            const deletedIntro = await Intro.findOneAndDelete({ email });
            if (!deletedIntro) {
                throw new apiError(400, "Intro delete failed");
            }
            return res
                .status(200)
                .json(new apiResponse(200, {}, "Intro deleted successfully"));
        } catch (error) {
            throw new apiError(400, "Intro delete failed");
        }
    });

    export const deleteSocial = asyncHandler(async (req, res) => {
        try {
            const { email, name } = req.body;
            const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            const deletedSocial = await Intro.findOneAndUpdate
            (
                {email},
                {
                    $pull:{
                        socials:{
                            name,
                            
                        }
                    }
                }
            )
            if (!deletedSocial) {
                throw new apiError(400, "Social delete failed");
            }
            return res
                .status(200)
                .json(new apiResponse(200, {}, "Social deleted successfully"));
        } catch (error) {
            throw new apiError(400, "Social delete failed");
        }
    }
    );

    export const deleteSkill = asyncHandler(async (req, res) => {
        try {
            const { email, name } = req.body;
            const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            const deletedSkill = await Intro.findOneAndUpdate
            (
                {email},
                {
                    $pull:{
                        skills:{
                            name,
                            
                        }
                    }
                }
            )

            if (!deletedSkill) {
                throw new apiError(400, "Skill delete failed");
            }
            return res
                .status(200)
                .json(new apiResponse(200, {}, "Skill deleted successfully"));
        } catch (error) {
            throw new apiError(400, "Skill delete failed");
        }
    }
    );

    export const getSocial = asyncHandler(async (req, res) => {
        try {
          const { email } = req.body;
          const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            return res
                .status(200)
                .json(new apiResponse(200, existedIntro.socials, "Socials found successfully"));
        } catch (error) {
            throw new apiError(400, "Socials not found");
        }
    }
    );

    export const getSkill = asyncHandler(async (req, res) => {
        try {
          const { email } = req.body;
          const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            return res
                .status(200)
                .json(new apiResponse(200, existedIntro.skills, "Skills found successfully"));
        } catch (error) {
            throw new apiError(400, "Skills not found");
        }
    }
    );

    export const getAllIntro = asyncHandler(async (req, res) => {
        try {
          const intros = await Intro.find();
          if (!intros) {
            throw new apiError(400, "Intros not found");
          }
          return res
            .status(200)
            .json(new apiResponse(200, intros, "Intros found successfully"));
        } catch (error) {
          throw new apiError(400, "Intros not found");
        }
      });

export const createExtraLinks = asyncHandler(async (req, res) => {
    try {
        const { email, name, url } = req.body;
        const existedIntro = await Intro.findOne({ email });
        if (!existedIntro) {
        const newIntro = await Intro.create({
            email,
            extraLinks: [
            {
                name,
                url,
            },
            ],
        });
        return res
            .status(201)
            .json(new apiResponse(201, newIntro, "ExtraLinks created successfully"));
        }
        const addExtraLinks = await Intro.findOneAndUpdate
        (
            { email },
            {
                $push:{
                    extraLinks:{
                        name,
                        url,
                    }
                }
            }
        )

        if (!addExtraLinks) {
        throw new apiError(400, "ExtraLinks creation failed");
        }
        return res
        .status(201)
        .json(new apiResponse(201, addExtraLinks, "ExtraLinks created successfully"));

    } catch (error) {
        throw new apiError(400, "ExtraLinks creation failed");
    }
    }
    );

    export const deleteExtraLinks = asyncHandler(async (req, res) => {
        try {
            const { email, name } = req.body;
            const existedIntro = await Intro.findOne({ email });
            if (!existedIntro) {
                throw new apiError(400, "Intro not found");
            }
            const deletedExtraLinks = await Intro.findOneAndUpdate
            (
                {email},
                {
                    $pull:{
                        extraLinks:{
                            name,
                            
                        }
                    }
                }
            )

            if (!deletedExtraLinks) {
                throw new apiError(400, "ExtraLinks delete failed");
            }
            return res
                .status(200)
                .json(new apiResponse(200, {}, "ExtraLinks deleted successfully"));
        } catch (error) {
            throw new apiError(400, "ExtraLinks delete failed");
        }
    }
    );

    export const getExtraLinks = asyncHandler(async (req, res) => {
        try {
          const { email } = req.body;
          const existedIntro = await Intro.findOne
            (
                { email }
            );
                if (!existedIntro) {
                    throw new apiError(400, "Intro not found");
                }
                return res
                    .status(200)
                    .json(new apiResponse(200, existedIntro.extraLinks, "ExtraLinks found successfully"));
        } catch (error) {
            throw new apiError(400, "ExtraLinks not found");
        }
    }
);

export const updateExtraLinks = asyncHandler(async (req, res) => {
    try {
        const { email, name } = req.body;
        const existedIntro = await Intro.findOne
        (
            { email }
        );
        if (!existedIntro) {
            throw new apiError(400, "Intro not found");
        }
        const updatedExtraLinks = await Intro.findOneAndUpdate
        (
            { email },
            req.body
        );
        if (!updatedExtraLinks) {
            throw new apiError(400, "ExtraLinks update failed");
        }

        return res
            .status(200)
            .json(new apiResponse(200, updatedExtraLinks, "ExtraLinks updated successfully"));
    } catch (error) {
        throw new apiError(400, "ExtraLinks update failed");
    }   
}
);


export const uploadProfileImage = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
    
      const existedIntro = await Intro.findOne({ email });
      if (!existedIntro) {
       
        const newIntro = await Intro.create({
            email,
            image:[]
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
        { email },
        {
          image:[
            {
                url: profileImage.secure_url,
                public_id: profileImage.public_id
                
            },
          ]
        },
        { new: true }
      );
      if (!updatedIntro) {
        throw new apiError(400, "Profile image update failed");
      }
      return res
        .status(200)
        .json(new apiResponse(200, updatedIntro, "Profile image uploaded successfully"));
    } catch (error) {
      
      throw new apiError(400, "Profile image upload failed");
    }
  })

  export const deleteProfileImage = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      const publicId = req.query.publicId;
         const existedIntro = await Intro.findOne({
            email
        });
        const deleteImage = await deleteFileFromCloudinary(publicId);
        if (!deleteImage) {
            throw new apiError(400, "Profile image delete failed");
        }


        const deletedProfileImage = await Intro.findOneAndUpdate
        (
            { email },
            {
                image: null
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
}
);