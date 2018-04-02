import React from "react";
import Link from "gatsby-link";

const Navbar = () => (
  <div className="site-header">
    <div className="header-wrapper">
      <div className="site-title">
        <Link to="/" className="menu-item">
          <h1>PJM Contracting LLC</h1>
        </Link>
        <small>
          <em>For All Your Remodel Needs</em>
        </small>
      </div>
      <nav className="menu">
        <Link className="menu-item" to={{ pathname: "/", hash: "#about-us" }}>
          About Us
        </Link>
        <Link className="menu-item" to={{ pathname: "/", hash: "#work" }}>
          What We Do
        </Link>
        <Link className="menu-item" to={{ pathname: "/", hash: "#contact-us" }}>
          Contact Us
        </Link>
        <Link className="menu-item" to="/portfolio">
          Portfolio
        </Link>
      </nav>
      <div id="menu-reveal" className="menu-button-container right">
        Menu&nbsp;<i className="fa fa-bars" />
      </div>
    </div>
  </div>
);

export default Navbar;
