import asyncHandler from "../Helper/asyncHandler.js";
import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";
import Certificate from "../Models/certificate.models.js";
import { uploadFileOnCloudinary, deleteFileFromCloudinary } from "../Helper/cloudinary.js";
// Create Certificate
export const createCertificate = asyncHandler(async (req, res) => {
    try {
        const { title, issuer, date, description, jobs ,images } = req.body;
        const isAdmin = req.user.isAdmin;
        
        if (!isAdmin) {
            throw new apiError(403, "You are not authorized");
        }

        const newCertificate = await Certificate.create({
            title,
            issuer,
            date,
            description,
            jobs,
            image:images
        });

        if (!newCertificate) {
            throw new apiError(400, "Certificate creation failed");
        }

        return res.status(201).json(new apiResponse(201, newCertificate, "Certificate created successfully"));
    } catch (error) {
        throw new apiError(400, error.message);
    }
});


// Update Certificate
export const updateCertificate = asyncHandler(async (req, res) => {
    try {
        const _id = req.query._id;
        const { title, issuer, date, description, jobs,images } = req.body;
     
        const isAdmin = req.user.isAdmin;

        if (!isAdmin) {
            throw new apiError(403, "You are not authorized");
        }

        const updateCertificate = await Certificate.findByIdAndUpdate(
            { _id },
            {
                title,
                issuer,
                date,
                description,
                jobs,
                image: images
            },
            { new: true }
        );

        if (!updateCertificate) {
            throw new apiError(400, "Certificate update failed");
        }

        return res.status(200).json(new apiResponse(200, updateCertificate, "Certificate updated successfully"));
    } catch (error) {
        throw new apiError(400, error.message);
    }
});

// Delete Certificate
export const deleteCertificate = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new apiError(403, "You are not authorized");
    }

    const deleteCertificate = await Certificate.findByIdAndDelete({ _id });

    if (!deleteCertificate) {
      throw new apiError(400, "Certificate deletion failed");
    }

    return res.status(200).json(new apiResponse(200, deleteCertificate, "Certificate deleted successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Get All Certificates
export const getAllCertificates = asyncHandler(async (req, res) => {
  try {
    const certificates = await Certificate.find({
      ...(req.query._id) && { _id: req.query._id },
    });

    if (!certificates) {
      throw new apiError(404, "No certificates found");
    }

    return res.status(200).json(new apiResponse(200, certificates, "Certificates fetched successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});




// upload Certificate Image
export const uploadCertificateImage = asyncHandler(async (req, res) => {
  try {
    const certificateImage = req.file.path;

    if (!certificateImage) {
      throw new apiError(400, "Certificate image not found");
    }

    const certificateImageUpload = await uploadFileOnCloudinary(certificateImage);

    if (!certificateImageUpload) {
      throw new apiError(400, "Certificate image upload failed");
    }

    const { secure_url: url, public_id } = certificateImageUpload;

    return res.status(200).json(new apiResponse(200, { url, public_id }, "Certificate image uploaded successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Delete Certificate Image
export const deleteCertificateImage = asyncHandler(async (req, res) => {
  try {
    const _id = req.query._id;
    const public_id = req.query.public_id;

    const existedCertificate = await Certificate.findById(_id);

    if (!existedCertificate) {
      throw new apiError(400, "Certificate not found");
    }

    const deleteImage = await deleteFileFromCloudinary(public_id);

    if (!deleteImage) {
      throw new apiError(400, "Certificate image delete failed");
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      _id,
      { $unset: { image: "" } },
      { new: true }
    );

    if (!updatedCertificate) {
      throw new apiError(400, "Certificate image delete failed");
    }

    return res.status(200).json(new apiResponse(200, {}, "Certificate image deleted successfully"));
  } catch (error) {
    throw new apiError(400, error.message);
  }
});