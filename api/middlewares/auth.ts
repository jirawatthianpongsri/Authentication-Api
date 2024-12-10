import { Request , Response , NextFunction } from "express";
import jwt , { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { AuthenticationError } from "./error";
import dotenv from 'dotenv';
import userModel from "../models/User";
import { clearToken } from "../utils/auth";

dotenv.config({path:"../../.env"});

const authenticate = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let token = req.cookies["jwt"];
        if(!token) throw new AuthenticationError("Token not found");
        const { TOKEN_SECRET } = process.env;
        const userData = jwt.verify(token,TOKEN_SECRET!) as JwtPayload;
        if(!userData) throw new AuthenticationError("UserId not found");
        const user = await userModel.findById(userData.id,"id fname lname email version");
        if(!user) throw new AuthenticationError("User not found");
        if(user.version!==userData.version) {
            clearToken(res);
            throw new AuthenticationError("Invalid token");
        }
        req.user = user;
        next();
    }catch(error) {
        throw new AuthenticationError("Invalid token");
    }
});

export { authenticate };