import { NextFunction,Request,Response } from "express";
import User from "../models/User.js";
import { hash,compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllusers = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {

    try {
    //Get all users
    const users = await User.find();
    return res.status(200).json({ message:"OK", users });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({message: 'Server error',cause: error.message});
    }

};

export const userSignup = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {

    try {
    //User Signup
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(401).send("User already Registered");
    const hashedPassword = await hash(password,10)
    const user = new User({name,email,password: hashedPassword});
    await user.save();

    //Create and Store Cookie
    res.clearCookie(COOKIE_NAME,{
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
    });

    const token = createToken(user._id.toString(),user.email,"7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME,token,{
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true
    });

    return res.status(200).json({ message:"OK", id: user._id.toString });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({message: 'Server error',cause: error.message});
    }

};

export const userLogin = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {

    try {
    //User Signup
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(401).send("Incorrect Password");
    }

    res.clearCookie(COOKIE_NAME,{
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
    });

    const token = createToken(user._id.toString(),user.email,"7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME,token,{
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true
    });
    return res.status(200).json({ message:"OK", id: user._id.toString });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({message: 'Server error',cause: error.message});
    }

};