import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import AnimationWrapper from "./AnimationWrapper";

import logo from "../../public/quil.svg";
import Banner from "../../public/Banner.png";
import { updateTitle } from "../redux/features/editor/editorSlice";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./EditorContext";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";

const Editor = () => {
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.editor.blog);
  let imageUrl = null;
  const bannerRef = useRef();
  const [formData, setFormData] = useState({});
  console.log(imageUploadError, imageUploadProgress);

  //useeffect
  useEffect(() => {
    console.log(file);
    if (formData.image) {
      uploadImage();
    }
    console.log(imageUrl);
  }, [file]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    setFormData((prevFormData) => ({
      ...prevFormData,
      title: newTitle,
    }));
  };

  const handlePublishEvent = () => {
    if (!formData.image) {
      return toast.error("Upload banner");
    }

    if (!formData.title) {
      return toast.error("Give a title to publish");
    }

    if (!formData.content) {
      return toast.error("Give a description to publish");
    }
  };

  return userInfo === null ? (
    <Navigate to="/signin" />
  ) : (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="logo" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {formData.title && formData.title.length
            ? formData.title
            : "New Blog"}
        </p>

        <div className="ml-auto">
          <button className="btn-dark py-2" onClick={handlePublishEvent}>
            Publish
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <Toaster />
          {/* Main wrapper for the blog */}
          <div className="mx-auto max-w-[650px] w-full">
            <div className="relative aspect-video ">
              <label htmlFor="uploadBanner">
                <img
                  ref={bannerRef}
                  src={imageFileUrl || Banner}
                  alt="Image banner"
                  className="z-20 cursor-pointer"
                />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>

            <textarea
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              placeholder="Title"
              onKeyDown={handleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr />

            {/* <div id="blogEditor"></div> */}
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="h-72 shadow-md"
              required
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Editor;
