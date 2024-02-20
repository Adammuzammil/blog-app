import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentCard = ({ postId }) => {
  const { userInfo } = useSelector((state) => state.user);
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
        <div>
          You must be signed in to comment
          <Link to="/signin">Sign In</Link>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
