import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import moment from "moment";

const CommentCard = ({ postId }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const { data } = await axios.post("/api/comment/create", {
        content: comment,
        postId,
        user: userInfo._id,
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("PostId: ", postId);
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/comment/getcomment/${postId}`);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      {userInfo ? (
        <div className="flex gap-2 items-center text-md max-w-6xl pl-2 mx-auto">
          <p>Signed in as:</p>
          <img
            src={userInfo.profilePicture}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-green-400 hover:underline"
          >
            @{userInfo.username}
          </Link>
        </div>
      ) : (
        <div className="my-3">
          You must be signed in to comment
          <Link to="/signin">Sign In</Link>
        </div>
      )}

      {userInfo && (
        <form
          className="border border-green-400 rounded-md p-3 mt-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Leave a comment..."
            rows="3"
            maxLength="200"
            className="placeholder:text-black text-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-base text-gray-500">
              {200 - comment.length} characters remaining
            </p>
            <Button
              outline
              pill
              gradientDuoTone="redToYellow"
              type="submit"
              size="sm"
            >
              Comment
            </Button>
          </div>
        </form>
      )}

      {comments.length === 0 ? (
        <p className="my-5">No comments so far...!!!</p>
      ) : (
        <>
          <div className="flex items-center gap-1 my-5">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentCard;
