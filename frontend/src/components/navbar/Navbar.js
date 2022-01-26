import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../customHooks/customHooks";
import "./Navbar.scss";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [width, height] = useWindowSize();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        Lara<span>Blog</span>.
      </Link>
      <div className="navbar__items">
        <Link to="/" className="navbar__link">
          home
        </Link>
        <Link to="/posts" className="navbar__link">
          posts
        </Link>
        <Link to="/about" className="navbar__link">
          about
        </Link>
        <Link to="/contact" className="navbar__link">
          contact
        </Link>
      </div>
      <div className="fas fa-bars navbar__menu-btn"></div>
    </nav>
  );
};

export default Header;
