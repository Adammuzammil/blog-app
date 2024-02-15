import React from "react";
import AnimationWrapper from "./AnimationWrapper";
import { Link } from "react-router-dom";
import { LuFileEdit } from "react-icons/lu";
import { useSelector } from "react-redux";

const UserNavigation = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <AnimationWrapper className="relative right-0 z-50">
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200 z-50">
        <Link
          to="editor"
          className="flex items-center gap-2 link md:hidden pl-8 py-4"
        >
          <LuFileEdit />
          <p>Write</p>
        </Link>

        <Link to={`/user/${userInfo.username}`} className="link pl-8 py-4">
          Profile
        </Link>

        <Link to="/dashboard" className="link pl-8 py-4">
          Dashboard
        </Link>

        <Link to="/settings" className="link pl-8 py-4">
          Settings
        </Link>

        <span className="w-[100%]">
          <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4">
            <h1 className="font-bold text-xl mb-1">Sign Out</h1>
            <p className="text-dark-grey">@{userInfo.username}</p>
          </button>
        </span>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigation;
