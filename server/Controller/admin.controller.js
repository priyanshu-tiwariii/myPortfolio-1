import asyncHandler from "../Helper/asyncHandler.js";
import Admin from "../Models/admin.models.js";
import apiError from "../Helper/apiError.js";
import apiResponse from "../Helper/apiResponse.js";

const generateTokens = async (userId) => {
  try {
    const user = await Admin.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Token generation failed");
  }
};

export const signUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existedUser = await Admin.findOne({ email });
    if (existedUser) {
      throw new apiError(400, "User already exists");
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    if (!admin) {
      throw new apiError(400, "User creation failed");
    }

    return res
      .status(201)
      .json(new apiResponse(201, {}, "User created successfully"));
  } catch (error) {
    throw new apiError(400, "Admin creation failed");
  }
});

export const signIn = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new apiError(400, "Please provide email and password");
    }
    const existedUser = await Admin.findOne({ email });
    if (!existedUser) {
      throw new apiError(400, "User not found");
    }
    const isMatch = await existedUser.matchPassword(password);

    if (!isMatch) {
      throw new apiError(400, "Wrong Password");
    }

    const { accessToken, refreshToken } = await generateTokens(existedUser._id);

    const loggedInUser = await Admin.findById(existedUser._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new apiResponse(
          200,
          { loggedInUser, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  } catch (error) {
    throw new apiError(400, "Admin login failed");
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    const userID = req.user._id;
    const user = await Admin.findById(userID);
    user.refreshToken = null;
    await user.save();
    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    };
    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json(new apiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    throw new apiError(400, "Admin logout failed");
  }
});

export const refreshToken = asyncHandler(async (req, res) => {
  try {
    const userID = req.user._id;
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      const user = await Admin.findById(userID);
      user.refreshToken = null;
      await user.save();
      const options = {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      };
      return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new apiResponse(400, {}, "Please login again"));
    }
    const user = await Admin.findById(userID);
    if (user.refreshToken !== refreshToken) {
      throw new apiError(400, "Invalid refresh token");
    }
    const { accessToken, newRefreshToken } = await generateTokens(userID);

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new apiResponse(200, { accessToken }, "Token refreshed successfully")
      );
  } catch (error) {
    throw new apiError(400, "Token refresh failed");
  }
});
