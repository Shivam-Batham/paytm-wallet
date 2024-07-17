import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { JWT_SECRET } from "../config.js";
import { Account } from "../models/accountModel.js";

export const helloUser = async (req, res) => {
  const response = await User.deleteMany();
  res.status(200).json({
    success: true,
    message: "Hello from server",
    response,
  });
};

export const signUp = async (req, res) => {
  try {
    const signUpBody = zod.object({
      username: zod.string(),
      email: zod.string().email({ message: "Invalid email address" }),
      firstname: zod.string(),
      lastname: zod.string(),
      password: zod.string(),
    });
    // const {username,email,firstname,lastname,password} = req.body;
    const { success } = signUpBody.safeParse(req.body);
    if (!success) {
      return res.status(401).json({
        success: false,
        message: "user signup failed / incorrect input",
      });
    }
    // check for existing user
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(412).json({
        success: false,
        message: " user already exists / signup failed",
      });
    }
    //create user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    });
    const userId = user._id;
    // creating Initial Balance
    await Account.create({
        userId,
        balance: 1 + Math.random * 10000
    })
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.status(200).json({
      success: true,
      message: "user signUp successfull",
      token: token,
      user: user,
    });
  } catch (err) {
    console.log("Error in signUp Controller : ", err);
    res.status(401).json({
      success: false,
      message: "user signUp failed..",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const userSignInBody = zod.object({
      email: zod.string().email(),
      password: zod.string(),
    });
    const { success } = userSignInBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        success: false,
        message: "incorrect inputs",
      });
    }
    const resgisteredUser = await User.findOne({
      email: req.body.email,
    });
    if (!resgisteredUser) {
      return res.status(411).json({
        success: false,
        message: "Invalid Inputs",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      resgisteredUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(411).json({
        success: false,
        message: "Invalid Inputs",
      });
    }
    const token = jwt.sign(
      {
        userId: resgisteredUser._id,
      },
      JWT_SECRET
    );
    res.status(202).json({
      success: true,
      message: "Login successfull",
      token: token,
    });
  } catch (err) {
    console.log("Error in signIn Controller : ", err);
    res.status(401).json({
      success: false,
      message: "Error while logging in",
    });
  }
};

export const updateUserData = async (req, res) => {
  const updateUserBody = zod.object({
    username: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
    email: zod.string().email(),
  });
  try {
    const { success } = updateUserBody.safeParse(req.body);
    if (!success) {
      return res.status(403).json({
        success: false,
        message: "incorrect inputs / updation failed",
      });
    }
    const updateResponse = await User.updateOne(req.body, {
      _id: req.userId,
    });
    res.status(201).json({
      success: true,
      message: "user info Updated successfully",
    });
  } catch (err) {
    console.log("Error in updateUserData ", err);
    return res.status(403).json({
      success: false,
      message: "incorrect inputs / updation failed",
    });
  }
};

export const findUser = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        {
          firstname: {
            $regex: filter,
          },
        },
        {
          lastname: {
            $regex: filter,
          },
        },
      ],
    });

    res.status(201).json({
        user:users.map((user)=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
  } catch (err) {
    console.log("Error in finding user ", err);
    return res.status(403).json({
      success: false,
      message: "find user search failed failed",
    });
  }
};
