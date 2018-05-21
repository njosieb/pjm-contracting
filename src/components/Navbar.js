import Link from 'gatsby-link'
import React from 'react'

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
        <Link className="menu-item" to={{ pathname: '/', hash: '#about' }}>
          About
        </Link>
        <Link className="menu-item" to={{ pathname: '/', hash: '#services' }}>
          Services
        </Link>
        <Link className="menu-item" to={{ pathname: '/', hash: '#contact' }}>
          Contact
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
)

export default Navbar
