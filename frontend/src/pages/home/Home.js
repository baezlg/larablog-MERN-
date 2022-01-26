import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import { listPosts } from "./../../redux/post/postActions";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { posts } = postList;

  useEffect(() => {
    dispatch(listPosts(true));
  }, [dispatch]);
  return (
    <div className="home">
      <div className="home__featured">
        <img
          className="home__featured-bg"
          src="https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <div className="home__featured-overlay"></div>
      </div>
      <section className="home__main">
        <div className="home__latest-post">
          <h3 className="heading">Latest posts</h3>
          <div className="home__post-wrapper">
            {posts?.data?.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
        </div>
        <Sidebar />
      </section>
    </div>
  );
};

export default Home;
