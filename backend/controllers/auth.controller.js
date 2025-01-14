import {
  userLoginValidation,
  userSignUpValidation,
} from "../middlewares/authValidation.js";
import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

const signup = async (req, res) => {
  try {
    const { error } = userSignUpValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      return res.status(403).json({ error: error });
    }

    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ message: "User already exist", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userModel = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await userModel.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = userLoginValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      return res.status(403).json({ error: error });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      envConfig.general.APP_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { signup, login };
