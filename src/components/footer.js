import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="social-list">
        <li className="contact"><a href="mailto:carolinasknoll@gmail.com"><i className="fa fa-envelope"></i></a></li>
        <li className="linkedin"><a href="https://www.linkedin.com/in/carolinaknoll"><i className="fa fa-linkedin"></i></a></li>
        <li className="github"><a href="https://github.com/carolinaknoll"><i className="fa fa-github"></i></a></li>
        <li className="twitter"><a href="https://twitter.com/carolina_knoll"><i className="fa fa-twitter"></i></a></li>
        <li className="codepen"><a href="http://codepen.io/carolinaknoll/"><i className="fa fa-codepen"></i></a></li>
        <li className="freecodecamp"><a href="http://www.freecodecamp.com/carolinaknoll"><i className="fa fa-fire"></i></a></li>
      </ul>
      <p className="footer-note">Made with <i className="fa fa-heart"></i> by Carolina Knoll / 2019</p>
    </footer>
  )
}
