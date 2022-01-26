import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import Showcase from "./../../components/showcase/Showcase";
import { listPosts } from "./../../redux/post/postActions";
import "./Posts.scss";
const Posts = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemCount, setItemCount] = useState(null);
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { posts, loading } = postList;

  useEffect(() => {
    dispatch(listPosts(false, page));
  }, [dispatch, page]);
  useEffect(() => {
    if (!loading) {
      setTotalPage(posts?.pages);
    }
  }, [loading]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <div className="posts">
      <Showcase name="posts" />
      <div className="posts__main-wrapper">
        <div className="posts__main">
          <h3 className="heading">Posts</h3>
          <div className="posts__container">
            {posts?.data?.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={totalPage}
            marginPagesDisplayed={6}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination__item"}
            pageLinkClassName={"pagination__link"}
            previousLinkClassName={"pagination__item"}
            nextLinkClassName={"pagination__item"}
            breakClassName={"pagination__item break"}
            breakLinkClassName={"pagination__item"}
            activeClassName={"active"}
          />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Posts;
