import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateVerificationCode } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from "../mailtrap/emails.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !name || !password) {
      throw new Error("All fields are required");
    }

    // Check if user exists in the database
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password ex: 1234 -> $2a$10$1Q
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationCode();
    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Save the user to the database
    await user.save();

    // jwt token
    generateTokenAndSetCookie(res, user._id);

    // Send Verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    try {
      const response = await sendWelcomeEmail(user.email, user.name);

      res.status(200).json({
        success: true,
        message: "Email verified successfully",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
      console.log("Welcome email sent successfully", response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Email not verified, failed to send welcome email",
      });
      console.error("Error sending welcome email:", error);
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username" });
    }

    // Check if password is correct
    const isPassswordValid = await bcryptjs.compare(password, user.password);
    if (!isPassswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLoginDate = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 0.5 * 60 * 60 * 1000; // 30 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send reset password email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res
      .status(200)
      .json({ success: true, message: "Reset password email sent" });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    //update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;

    // save new password to the database
    await user.save();

    // send password reset success email
    await sendPasswordResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
