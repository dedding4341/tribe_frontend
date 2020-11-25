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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
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
              1600 Amphitheatre Parkway<br />
                Mountain View, CA <br />
                  94043 US<br />
            </p>
            <p>
              someone@dazzlesite.com <br />
                      Phone: (+63) 555 1212 <br />
                        Fax: (+63) 555 0100
            </p>
          </div>

          <div className="col-4 footer-site-links">
            <h4>Site Links</h4>
            <ul className="list-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer;