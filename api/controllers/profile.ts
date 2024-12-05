import { Request , Response } from "express";
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from "../models/User";
import { encrypt } from "../utils/encrypt";
import { AuthenticationError } from "../middlewares/error";

dotenv.config({path:"../../.env"});

const ResetPassword = asyncHandler(async(req:Request,res:Response)=>{
    const { password , newPassword } : { password:string , newPassword:string} = req.body;
    const jwtCookie = req.cookies.jwt;
    const userData = jwt.verify(jwtCookie,process.env.TOKEN_SECRET!) as JwtPayload;
    const user = await userModel.findById(userData.id,"id fname lname email password");
    console.log(user);
    if(user&&password&&await user.comparePassword(password)) {
        user.updateOne({password:await encrypt(newPassword),version:+1}).then(()=>user.save())
        res.redirect("/");
    }else {
        throw new AuthenticationError("Password incorrect.");
    }
});


export { ResetPassword };
