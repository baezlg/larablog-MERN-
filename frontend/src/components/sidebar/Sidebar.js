import React, { useEffect } from "react";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listPopularPost,
  listCatCount,
  listCat,
} from "./../../redux/post/postActions";
import "./Sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popularPostList = useSelector((state) => state.popularPostList);
  const { popularPosts } = popularPostList;

  const postCatCountList = useSelector((state) => state.postCatCountList);
  const { postCatCount } = postCatCountList;

  const postCatList = useSelector((state) => state.postCatList);
  const { postCat } = postCatList;

  useEffect(() => {
    dispatch(listPopularPost());
    dispatch(listCatCount());
    dispatch(listCat());
  }, [dispatch]);
  return (
    <aside className="sidebar">
      <div className="sidebar__search">
        <input type="text" placeholder="Search Posts" />
        <i className="fas fa-search sidebar__search--icon"></i>
      </div>
      <div className="sidebar__writer">
        <div className="sidebar__writer-img">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="writer"
          />
        </div>
        <h4 className="sidebar__writer-name">jane doe</h4>
        <p className="sidebar__writer-role">blog writer</p>
        <div className="sidebar__writer-socials">
          <span className="fab fa-facebook-f"></span>
          <span className="fab fa-instagram"></span>
          <span className="fab fa-twitter"></span>
        </div>
        <p className="sidebar__writer-desc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
          tempore architecto ratione impedit natus laudantium saepe. Tempore
          animi id fuga accusamus accusantium similique officia quibusdam ullam
          corrupti, ratione temporibus non.
        </p>
      </div>
      <div className="sidebar__popular-posts">
        <h3 className="heading-md">popular posts</h3>
        {popularPosts?.map((p) => (
          <div className="sidebar__popular-post" key={p.post}>
            {p.postdoc?.map((pd) => (
              <div key={pd._id} className="sidebar__popular-post">
                <div className="sidebar__popular-post-img">
                  <img src={`/image/${pd.photo}`} alt={pd.title} />
                </div>
                <div className="sidebar__popular-post-desc">
                  <h4 className="sidebar__popular-post-title">{pd.title}</h4>
                  <p className="sidebar__popular-post-time">
                    {format(pd.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sidebar__advert">
        <img
          src="https://images.unsplash.com/photo-1523798724321-364e1951df59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80"
          alt="advert"
        />
      </div>
      <div className="sidebar__post-cats">
        <h3 className="heading-md">post categories</h3>
        {postCatCount?.map((pc) => (
          <div className="sidebar__post-cat" key={pc.category}>
            <p className="sidebar__cat-name">{pc.categorydoc[0].name}</p>
            <p className="sidebar__cat-count">{pc.count}</p>
          </div>
        ))}
      </div>
      <h3 className="heading-md">tag clouds</h3>
      <div className="sidebar__tags">
        {postCat?.map((c) => (
          <span className="sidebar__tag" key={c._id}>
            {c.name}
          </span>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
