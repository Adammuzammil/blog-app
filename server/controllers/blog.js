import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/error.js";
import Post from "../models/postmodel.js";

export const createPost = asyncHandler(async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
   return next(errorHandler(400, "Please fill all the fields"));
  }
  const userId = req.user.id;
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  
  try {
    const savedPost = await Post.create({
        ...req.body,
        slug,
         user: userId
      })
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json(error)
  }  
});
