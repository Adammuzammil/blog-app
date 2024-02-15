import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import toast, { Toaster } from "react-hot-toast";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ErrorToaster from "./ErrorToaster";

const Settings = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const fileImageRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

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

  return (
    <>
      <section className="relative flex gap-10 py-0 m-0 max-md:flex-col">
        <Toaster />
        <div className="sticky top-[80px] left-6 -inset-1">
          <div className="min-w-[200px] h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0">
            <h1 className="text-xl text-dark-grey mb-5 text-center ">
              My Profile
            </h1>
            {/* <hr className="border-black mb-8 mr-6 -ml-6" /> */}

            <div className="relative flex flex-col max-md:items-center gap-5 min-w-[250px]">
              <label htmlFor="uploadBanner">
                {imageUploadProgress && imageUploadProgress < 100 && (
                  <CircularProgressbar
                    value={imageUploadProgress || 0}
                    text={`${String(imageUploadProgress)}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${
                          imageUploadProgress / 100
                        })`,
                      },
                    }}
                  />
                )}
                <img
                  src={imageFileUrl || userInfo.profilePicture}
                  alt="profile"
                  className={`h-48 w-48 rounded-full cursor-pointer bg-grey md:w-32 md:h-32 z-1 ${
                    imageUploadProgress &&
                    imageUploadProgress < 100 &&
                    "opacity-60"
                  }`}
                />
                {imageUploadError && <ErrorToaster error={imageUploadError} />}
                <input
                  type="file"
                  id="uploadBanner"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                  ref={fileImageRef}
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <Outlet />
    </>
  );
};

export default Settings;
