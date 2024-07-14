import zod from "zod"
import { User } from "../models/userModel";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";


export const signUp = async (req,res)=>{
    try{
        const signUpBody = zod.object({
            username : zod.string(),
            email:zod.string().email(),
            firstname:zod.string(),
            lastname:zod.lastname(),
            password:zod.string()
        })
        // const {username,email,firstname,lastname,password} = req.body;
        const {success} = signUpBody.safeParse(req.body);
        if(!success){
           return res.status(401).json({
                success:false,
                message:"user signup failed / incorrect input"
            })
        }
        // check for existing user
        const existingUser = await User.findOne({email : req.body.email});
        if(existingUser){
           return res.status(412).json({
                success:false,
                message:" user already exists / signup failed"
            })
        }
        //create user
        const user = await User.create({
            username : req.body.username,
            email:req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password:req.body.password
        })
        const userId = user._id;
        const token = jwt.sign({
            userId
        },JWT_SECRET)

        res.status(200).json({
            success:true,
            message:"user signUp successfull",
            token:token
        })

    }catch(err){
        console.log("Error in signUp Controller : ",err);
        res.status(401).json({
            success:false,
            message:"user signUp failed."
        })
    }
}

export const signIn = async (req,res)=>{
    try{
        const userSignInBody = zod.object({
            email:zod.string().email(),
            password:zod.string()
        })
        const {success} = userSignInBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                success:false,
                message:"incorrect inputs"
            })
        }
        const resgisteredUser = await User.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(!resgisteredUser){
            return res.status(411).json({
                success:false,
                message:"Invalid Inputs"
            })
        }
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)
        res.status(202).json({
            success:true,
            message:"Login successfull",
            token:token
        })

    }catch(err){
        console.log("Error in signIn Controller : ",err);
        res.status(401).json({
            success:false,
            message: "Error while logging in"
        })
    }
}