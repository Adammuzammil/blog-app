import React from "react";
import { Link } from "react-router-dom";

import logo from "../../public/edited.svg";

import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer md:hidden">
      <Link to="/" className="flex-none w-10">
        <img src={logo} alt="Logo" className="w-full bg-white" />
      </Link>

      <div className="flex items-center justify-center mx-6">
        <h2 className="text-white pl-5">&copy; Dedium, 2023</h2>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <Link to="/">
          <FaLinkedin style={{ fontSize: "1.5rem", color: "white" }} />
        </Link>
        <Link to="/">
          <FaGithub style={{ fontSize: "1.5rem", color: "white" }} />
        </Link>
        <Link to="/">
          <FaInstagram style={{ fontSize: "1.5rem", color: "white" }} />
        </Link>
        <Link to="/">
          <FaXTwitter style={{ fontSize: "1.5rem", color: "white" }} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
