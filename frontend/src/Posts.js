import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/posts");
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);
  return (
    <div>
      {posts?.map((p) => (
        <div key={p._id}>
          <Link to={`/${p.slug}`}>
            <p>{p.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
