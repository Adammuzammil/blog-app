import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import AboutUser from "../components/AboutUser";

const Profile = () => {
  const { id: profileId } = useParams();
  const blog = 3515;
  const { userInfo } = useSelector((state) => state.user);
  return (
    <AnimationWrapper>
      <section className="h-cover">
        <div className="flex flex-col max-md:items-center gap-5 min-w-[250px]">
          <img
            src={userInfo.profilePicture}
            alt="profile"
            className="h-48 w-48 rounded-full bg-grey md:w-32 md:h-32"
          />
          <h1 className="text-2xl font-medium">@{userInfo.username}</h1>
          <p>{blog.toLocaleString()} Blogs</p>

          <div className="">
            {profileId == userInfo.username ? (
              <Link
                to={`/settings/user/${profileId}/edit-profile`}
                className="btn-light rounded-md"
              >
                Edit Profile
              </Link>
            ) : (
              ""
            )}
          </div>

          <AboutUser joined={userInfo.createdAt} />
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Profile;
