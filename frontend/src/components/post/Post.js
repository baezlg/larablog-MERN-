import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./Post.scss";

const Post = ({ post }) => {
  return (
    <div className="post">
      <Link to={`/posts/${post.slug}`}>
        <div className="post__img">
          <img src={`image/${post.photo}`} alt="" />
        </div>
      </Link>
      <Link to={`/posts/${post.slug}`}>
        <h4 className="post__title">{post.title}</h4>
      </Link>
      <p className="post__desc post__desc--short">{post.desc}</p>
      <p className="post__time">{format(post.createdAt)}</p>
      <div className="post__cat">
        {post.categoryList.map((c) => (
          <span key={c._id}>{c.name}</span>
        ))}
      </div>
      <Link className="btn btn-transparent" to={`/posts/${post.slug}`}>
        <i className="fas fa-long-arrow-alt-right"></i> read more
      </Link>
    </div>
  );
};

export default Post;
