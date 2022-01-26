import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  getPost,
  listComment,
  addCommentAction,
} from "./../../redux/post/postActions";
import "./PostDetails.scss";

const PostDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const postItem = useSelector((state) => state.postItem);
  const { post, loading } = postItem;

  const addcomment = useSelector((state) => state.addcomment);
  const { success } = addcomment;

  const commentList = useSelector((state) => state.commentList);
  const { comments } = commentList;

  useEffect(() => {
    dispatch(getPost(params.slug));
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      dispatch(listComment(post?._id));
    }
  }, [dispatch, loading, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCommentAction(post?._id, { name, message }));
    setName(" ");
    setMessage(" ");
  };

  return (
    <div className="postdetails">
      <section className="postdetails__wrapper">
        <div className="postdetails__main">
          <div className="postdetails__img">
            <img src={`/image/${post?.photo}`} alt="" />
          </div>
          <h3 className="heading-md">{post?.title}</h3>
          <div className="postdetails__box">
            <div className="postdetails__cat">
              {post?.categoryList?.map((c) => (
                <span key={c._id}>{c.name}</span>
              ))}
            </div>
            <div className="postdetails__time">
              {new Date(post?.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="postdetails__text">{post?.desc}</div>
          <div
            className="postdetails__comment-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>
              <i className="fas fa-comment-dots"></i> {comments?.length}{" "}
              comments
            </p>
          </div>
          <div
            className={
              isOpen
                ? "postdetails__comment-box open"
                : "postdetails__comment-box"
            }
          >
            {comments?.map((c) => (
              <div className="postdetails__comment" key={c._id}>
                <div className="postdetails__comment-img">
                  <img src={`/image/default.jpg`} alt={c.name} />
                </div>
                <div className="postdetails__comment-info">
                  <p className="postdetails__comment-user">{c.name}</p>
                  <p className="postdetails__comment-time">
                    {format(c.createdAt)}
                  </p>
                  <p className="postdetails__comment-text">{c.message}</p>
                </div>
              </div>
            ))}
            <form className="form" onSubmit={handleSubmit}>
              <h3 className="form__title">Leave a comment</h3>
              <input
                type="text"
                placeholder="Enter name"
                className="form__name"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                cols="30"
                rows="10"
                placeholder="message"
                className="form__message"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <input
                type="submit"
                value="Post comment"
                className="btn form__btn"
              />
            </form>
          </div>
        </div>
        <Sidebar />
      </section>
    </div>
  );
};

export default PostDetails;
