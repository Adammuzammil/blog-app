import asyncHandler from "express-async-handler";
import Comment from "../models/commentmodel.js"

export const createComment = asyncHandler(async (req, res, next) => {
    try {
        const { user, postId, content } = req.body;
    if(user !== req.user.id){
        return res.status(403).json("You are not allowed to comment on this post")
    }

    const newComment = new Comment({
        content,
        user,
        postId
    })

    await newComment.save();
    res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
});

export const getComment = async (req, res, next) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId }).sort({
        createdAt: -1,
      });
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };

  