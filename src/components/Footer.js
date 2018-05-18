import PropTypes from 'prop-types'
import React from 'react'

const Footer = ({ instagram, facebook, email }) => (
  <div className="site-footer">
    <div className="footer-top bg-off-black pv4">
      <div className="footer-columns db">
        <div className="footer-column" />
        <div className="footer-column">
          <ul className="social-media links ">
            <li className="db">
              <a className="social-media-link db" href={instagram}>
                <i className="fa fa-instagram db black" />
              </a>
            </li>
            <li className="db">
              <a className="social-media-link db" href={facebook}>
                <i className="fa fa-facebook db black" />
              </a>
            </li>
            <li className="db">
              <a className="social-media-link db" href={email}>
                <i className="fa fa-envelope-o db black" />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column" />
      </div>
    </div>
    <div className="footer-bottom bg-black">
      <div className="container">
        <p className="copyright-row dark-grey">
          <span className="copyright">Copyright 2017</span>
          <span className="made-by">
            Site built by{' '}
            <a
              href="http://cvharris.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              CV Harris Design, LLC.
            </a>
          </span>
        </p>
      </div>
    </div>
  </div>
)

Footer.propTypes = {
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  email: PropTypes.string
}

export default Footer
