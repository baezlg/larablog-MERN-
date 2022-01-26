import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import PostDetails from "./pages/postDetails/PostDetails";
import Posts from "./pages/posts/Posts";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:slug" element={<PostDetails />} />
      </Routes>
    </div>
  );
};

export default App;
