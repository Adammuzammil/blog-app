import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { LuFileEdit } from "react-icons/lu";
import { FaMoon, FaSun } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/features/theme/themeSlice";

import logo from "../../public/quil.svg";
import UserNavigation from "./UserNavigation";

const Navbar = () => {
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleUserPanel = () => {
    setShowUserMenu((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowUserMenu(false);
    }, 200);
  };

  const navbarStyles = {
    backgroundColor: theme === "light" ? "#fff" : "rgb(16,23,42)",
    color: theme === "light" ? "#000" : "#fff",
    // Add more styles based on the theme...
  };
  return (
    <>
      <nav className="navbar" style={navbarStyles}>
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="Logo" className="w-full " />
        </Link>

        <div
          className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey rounded-full py-4 px-[4vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
            searchBoxVisible ? "show" : "hide"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />

          <FiSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-2xl text-dark-grey" />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBoxVisible((currentVal) => !currentVal)}
          >
            <FiSearch className="text-xl" />
          </button>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="text-black dark:text-white"
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>

          <Link
            to="/editor"
            className="hidden md:flex md:items-center gap-2 link dark:text-white"
          >
            <LuFileEdit />
            <p className="dark:text-white">Write</p>
          </Link>

          {userInfo ? (
            <div
              className="relative"
              onClick={handleUserPanel}
              onBlur={handleBlur}
            >
              <button className="w-12 h-12 mt-1">
                <img
                  src={userInfo.profilePicture}
                  alt="profile picture"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
              {showUserMenu ? <UserNavigation /> : ""}
            </div>
          ) : (
            <>
              <Link to="signin" className="btn-dark py-2">
                Sign In
              </Link>
              <Link to="signup" className="btn-light py-2 hidden md:block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
