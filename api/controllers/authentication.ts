import { Request , Response } from "express";
import asyncHandler from 'express-async-handler';
import userModel from "../models/User";
import { clearToken, generateToken } from "../utils/auth";
import { capitalizeFirstLetter } from "../utils/string";
import { AuthenticationError, BadRequestError } from "../middlewares/error";
import { generateVerifyCode } from "../utils/verify";
import { sendMail } from "../utils/sendmail";

const welcome = (req:Request,res:Response) => {
    res.send("welcome");
};

const login = asyncHandler(async(req:Request<never,never,{email:string,password:string},never>,res:Response) => {
    const { email , password } = req.body;
    const user = await userModel.findOne({email});
    if(user && await user.comparePassword(password)) {
        generateToken(res, {
            id:user.id,
            email:user.email,
            version:user.version,
            verified:user.verified
        });
        res.status(201).json({
            id: user.id,
            name: `${capitalizeFirstLetter(user.fname)} ${capitalizeFirstLetter(user.lname)}`,
            email: user.email,
        });
    } else {
        throw new AuthenticationError("User not found / password incorrect");
    }
});

interface RegisterRequest {
    fname:string,
    lname:string,
    email:string,
    password:string
}

const register = asyncHandler(async(req:Request<never,never,RegisterRequest,never>,res:Response) => {
    const { fname , lname , email , password } = req.body;
    const existUser = await userModel.findOne({email});
    if(existUser) {
        res.status(409).json({
            message:"The email already exists"
        });
    } 

    const code = generateVerifyCode(10);
    const user = new userModel({fname,lname,email,password,createdAt:new Date(),version:0,verified:false,codeVerify:code});
    if(user) {
        sendMail({to:email,subject:"Is it you?",text:`Verify code : ${code}`});
        generateToken(res, {
            id:user.id,
            email:user.email,
            version:user.version,
            verified:false
        });
        res.status(201).json({
            id:user._id,
            name:`${capitalizeFirstLetter(user.fname)} ${capitalizeFirstLetter(user.lname)}`,
            email: user.email,
            verified: false
        });
        user.save();
        console.log(user);
    } else {
        throw new BadRequestError("An error occurred in registering the user");
    }
    
});

const logoutUser = asyncHandler(async(req:Request,res:Response)=>{
    clearToken(res);
    res.status(200).json({ message: "Successfully logged out"});
});

const verify = asyncHandler(async(req:Request,res:Response)=>{
    const { email , code } = req.body;
    const user = await userModel.findOne({email});
    if(!user) throw new AuthenticationError("Not found user");
    if(user.codeVerify===code && !user.verified) {
        generateToken(res, {
            id:user.id,
            email:user.email,
            version:user.version,
            verified:true
        });
        await user.updateOne({verified:true,codeVerify:""});
        user.save();
        res.status(201).json({
            id:user.id,
            email:user.email,
            verfied:true
        });
    } else {
        throw new AuthenticationError("Wrong code / Already verified")
    }
});

export {
    welcome,
    login,
    register,
    logoutUser,
    verify
}
