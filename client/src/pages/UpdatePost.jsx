import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../public/quil.svg";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import AnimationWrapper from "../components/AnimationWrapper";

const UpdatePost = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/blog/getusers?postId=${postId}`);
      setFormData(data.posts[0]);
      console.log(formData);
    };

    try {
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleImageUpload = async () => {
    try {
      if (!file) {
        return setUploadError("Please select an image");
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadError("Image Upload failed");
          setUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadProgress(null);
            setUploadError(null);
            setFormData((prevFormData) => ({
              ...prevFormData,
              image: downloadURL,
            }));
          });
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        `/api/blog/updatepost/${formData._id}/${userInfo._id}`,
        formData
      );
      navigate(`/post/${data.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <button className="btn-dark py-2" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <div className="p-3 max-w-3xl mx-auto h-cover">
          <h1 className="text-center text-3xl my-7 font-semibold">
            Update post
          </h1>
          <form>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TextInput
                type="text"
                placeholder="Enter blog title"
                required
                id="title"
                className="flex-1"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <Select
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                value={formData.category}
              >
                <option value="uncategorized">Select Category</option>
                <option value="coding">Coding</option>
                <option value="food">Food</option>
                <option value="adventure">Adventure</option>
                <option value="sports">Sports</option>
              </Select>
            </div>

            <div className="flex gap-4 items-center justify-between p-3 border-4 my-2">
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button
                type="button"
                size="sm"
                color="dark"
                onClick={handleImageUpload}
                disabled={uploadProgress}
              >
                {uploadProgress ? (
                  <div className="w-16 h-16">
                    <CircularProgressbar
                      value={uploadProgress}
                      text={`${uploadProgress || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
            {uploadError && <Alert color="failure">{uploadError}</Alert>}

            {formData.image && (
              <img
                src={formData.image}
                alt="upload"
                className="w-full h-72 object-cover"
              />
            )}

            <div>
              <ReactQuill
                theme="snow"
                placeholder="Write something..."
                className="h-72 shadow-md"
                required
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                value={formData.content}
              />
            </div>
          </form>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default UpdatePost;
