import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="footer-main container">
        <div className="row ml-5 mr-5 d-flex align-items-center">

          <div className="col-4 footer-info">
            <div className="footer-logo"></div>
            <p>
              Thanks for taking some time to checkout Tribe! We'd love to hear any feedback or help you with any issues you experience. Reach out to us directly using our contact information!
            </p>
            <ul className="footer-social-list">
              <li>
                <a href="#"><i className="fa fa-facebook-square"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-twitter"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-behance"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-dribbble"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-instagram"></i></a>
              </li>
            </ul>
          </div>

          <div className="col-4 footer-contact">
            <h4>Contact</h4>
            <p>
              E-mail: support@tribeapp.family
            </p>
          </div>

          <div className="col-4 footer-site-links">
            <h4>Site Links</h4>
            <ul className="list-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer;