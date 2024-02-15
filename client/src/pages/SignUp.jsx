import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", formData);

      setLoading(false);
      navigate("/signin");
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        if (error.response.data === "User already exists") {
          toast.error("User already exists. Try logging in.");
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-gelasio capitalize text-center my-4">
          Join us today
        </h1>
        <Toaster />
        <div className="relative w-[100%]  mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input-box"
            onChange={handleChange}
          />
          <FaRegUser className="input-icon" />
        </div>

        <div className="relative w-[100%] mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-box"
            onChange={handleChange}
          />
          <MdOutlineMailOutline className="input-icon" />
        </div>

        <div className="relative w-[100%] mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-box"
            onChange={handleChange}
          />
          <IoKeyOutline className="input-icon" />

          {showPassword ? (
            <FaRegEye
              className="input-icon right-4 left-[auto] cursor-pointer"
              onClick={() => setShowPassword((currentVal) => !currentVal)}
            />
          ) : (
            <FaRegEyeSlash
              className="input-icon right-4 left-[auto] cursor-pointer"
              onClick={() => setShowPassword((currentVal) => !currentVal)}
            />
          )}
        </div>

        <button className="btn-dark center mt-6 w-[90%]" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="w-full relative flex items-center gap-2 opacity-10 my-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button className="btn-dark flex items-center justify-center center gap-4 w-[90%]">
          <FcGoogle />
          Continue with Google
        </button>

        <p className="mt-6 text-dark-grey text-xl text-center">
          Already have an account?
          <Link to="/signup" className="underline text-black text-xl ml-1">
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
