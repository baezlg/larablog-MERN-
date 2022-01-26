import React from "react";
import "./Showcase.scss";
import { Link } from "react-router-dom";

const Featured = ({ name }) => {
  return (
    <div className="showcase">
      <img
        src="https://images.unsplash.com/photo-1490529553037-4f4ed6f3f575?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="showcase"
        className="showcase__bg"
      />
      <div className="showcase__overlay"></div>
      <h3 className="heading-lg">posts</h3>
      <p className="showcase__links">
        <Link to="/">Home</Link>
        <i className="fas fa-long-arrow-alt-right"></i>
        <span>{name}</span>
      </p>
    </div>
  );
};

export default Featured;
