import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/posts/${params?.title}`
        );
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [params?.title]);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/posts/${post?._id}/comments`
        );
        setComments(data);
      } catch (error) {
        //console.log(error);
      }
    };
    getAllComments();
  }, [post?._id]);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.author}</p>
      <p>{post.post}</p>
      <p>
        {post.categories?.map((c) => (
          <span key={c._id}>{c.name} </span>
        ))}
      </p>
      <hr />
      {comments?.map((c) => (
        <div key={c?._id}>
          <span>{c?.name}: </span>
          {c?.comment}
        </div>
      ))}
    </div>
  );
};

export default PostDetails;
