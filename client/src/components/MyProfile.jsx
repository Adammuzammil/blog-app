import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import Toast from "./Toast";
import CustomToast from "./Toast";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import {
  updateUser,
  deleteUser,
  signOut,
} from "../redux/features/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const MyProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  console.log(imageFileUrl);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
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

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(userInfo._id);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      const { data } = await axios.put(
        `/api/user/update/${userInfo._id}`,
        formData
      );
      dispatch(updateUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const { data } = await axios.delete(`/api/user/delete/${userInfo._id}`);
      dispatch(deleteUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignout = async () => {
    try {
      const { data } = await axios.post("/api/user/signout");
      dispatch(signOut(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {imageFileUploadError && <CustomToast message={imageFileUploadError} />}
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-center mb-5">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative h-48 w-48 self-center cursor-pointer shadow-md rounded-full overflow-hidden "
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && imageFileUploadProgress < 100 && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
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
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || userInfo.profilePicture}
              alt=""
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>

          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={userInfo.username}
            onChange={handleOnChange}
          />

          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={userInfo.email}
            onChange={handleOnChange}
          />

          <TextInput
            type="password"
            id="password"
            placeholder="Update your password"
            onChange={handleOnChange}
          />

          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            //   disabled={loading || imageFileUploading}
          >
            Update
          </Button>
        </form>

        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer" onClick={() => setShowModal(true)}>
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </span>
        </div>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          size="md"
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default MyProfile;
