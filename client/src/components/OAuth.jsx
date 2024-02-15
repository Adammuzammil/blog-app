import React from "react";

import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/features/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const { user } = await signInWithPopup(auth, provider);
      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      const response = await axios.post("/api/auth/google_auth", userData);

      console.log(response.data);

      if (response.status === 200) {
        dispatch(setCredentials(response.data));
        navigate("/");
      }
      console.log(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button
      className="btn-dark flex items-center justify-center center gap-4 w-[90%]"
      onClick={handleGoogleSubmit}
    >
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default OAuth;
