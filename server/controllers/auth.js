import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs"
import User from "../models/usermodel.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signUp = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
    next(errorHandler(400, 'All fields are required'))
    }

    //check if the user exists
    const exisitingUser = await User.findOne({ email: email})
    if(exisitingUser){
        res.status(400).json("User already exists")
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create an user
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email ||!password || email === '' || password === ''){
        return next(errorHandler(400, 'All fields are required'))
    }
    
    try {
        const user = await User.findOne({ email })

    if(!user){
        res.status(404).json("User not found")
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch){
        res.status(400).json("Invalid password")
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const {password: passw, ...rest } = user._doc;

    res.status(200).cookie('access_token', token, { httpOnly: true}).json(rest)

    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(400).json("Invalid user data");
    }
});

export const googleAuth = asyncHandler(async (req, res, next) => {
    const { name, email, photoURL } = req.body;
    try {
        const user = await User.findOne({email})

        if(user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const {password: passw, ...rest } = user._doc;

            res.status(200).cookie('access_token', token, { httpOnly: true}).json(rest);
        } else {
            const generatepassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword =  bcryptjs.hashSync(generatepassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') +
                Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: photoURL.replace("s96-c", "s384-c", true)
            })

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    const {password: passw, ...rest } = newUser._doc;

    res.status(200).cookie('access_token', token, { httpOnly: true}).json(rest)

        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(400).json("Invalid user data");
    }
})