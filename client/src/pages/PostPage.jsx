import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";

const PostPage = () => {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/blog/getusers?slug=${postslug}`);
        console.log(data.posts[0]);
        setPost(data.posts[0]);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postslug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-6 p-3 text-center font-gelasio max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5 border rounded-full"
      >
        <Button color="grey" pill size="xs">
          {post && post.category}
        </Button>
      </Link>

      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-7 p-3 w-full object-cover max-h-[450px] max-w-6xl mx-auto"
      />

      <div className="flex justify-between items-center p-3 border-b border-s-teal-500 mx-auto w-full max-w-6xl text-xs`">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && post.content.length / 1000} mins read</span>
        {userInfo._id === post.user ? (
          <Link to={`/update-post/${post._id}`}>
            <Button color="s-teal-500" pill size="xs">
              Edit
            </Button>
          </Link>
        ) : (
          ""
        )}
      </div>

      <div
        className="p-3 max-w-6xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      {post && <CommentCard postId={post._id} />}
    </main>
  );
};

export default PostPage;
