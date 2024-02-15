import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Editor from "./components/Editor";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./Layout";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./components/Settings";
import EditProfile from "./pages/EditProfile";
import MyProfile from "./components/MyProfile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<Layout />}>
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />}>
            <Route path="user/:id/edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/user/:id" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
