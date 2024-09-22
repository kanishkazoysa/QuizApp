import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const login = async (req, res) => {
  res.send("Login route");
};

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
    generateTokenAndSetCookie(res,user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.send("Logout route");
};
