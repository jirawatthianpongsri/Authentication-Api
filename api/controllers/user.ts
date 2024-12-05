import { Request , Response } from "express";
import userModel from "../models/User";
import { BadRequestError } from "../middlewares/error";
import asyncHandler from 'express-async-handler';
import { capitalizeFirstLetter, fullName } from "../utils/string";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "dotenv";

config({path:"../../.env"});

const getUser = asyncHandler(async(req:Request, res:Response)=>{
    const userId = req.params.id;
    const user = await userModel.findById(userId,"fname lname email");

    if(!user) throw new BadRequestError("User not available");

    res.status(200).json({
        id:user.id,
        name:`${capitalizeFirstLetter(user.fname)} ${capitalizeFirstLetter(user.lname)}`,
        email:user.email,
    });
});

const getMe = asyncHandler(async(req:Request,res:Response)=>{
    const jwtCookie = req.cookies["jwt"];
    const userData:JwtPayload = jwt.verify(jwtCookie,process.env.TOKEN_SECRET!) as JwtPayload;
    const user = await userModel.findById(userData.id,"id fname lname email");
    res.status(201).json({
        id:user?.id,
        name:`${capitalizeFirstLetter(user?.fname as string)} ${capitalizeFirstLetter(user?.lname as string)}`,
        email:user?.email
    })
})

export { getUser  , getMe };
