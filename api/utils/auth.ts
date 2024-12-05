import jwt from 'jsonwebtoken';
import { Response } from 'express';
import dotenv from 'dotenv';
import { IUser } from '../models/User';
dotenv.config({path:"../../.env"});

const generateToken = (res:Response,user:Partial<IUser>) => {
    const token = jwt.sign(user,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 30
    });
}

const clearToken = (res:Response) => {
    res.cookie("jwt","", {
        httpOnly: true,
        expires:new Date(0),
    });
}

export { generateToken , clearToken };
