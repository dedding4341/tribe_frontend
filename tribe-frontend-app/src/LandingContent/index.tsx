import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function LandingContent() {
  return (
    <section className="container">

      <div className="overlay"></div>
      <div className="home-content row">

        <div className="row contents col-11"> {/**start contents */}
          <div className="home-content-left col-6">
            <div className="home-welcome text-left">
            <h3>Welcome to Tribe</h3>
            <h1>
              Creative Landing <br />
                Page to Showcase <br />
                  the Tribe App.
            </h1>
            </div>
            <div className="buttons row">
              <a href="#download" className="smoothscroll button stroke">
                <span className="icon-circle-down" aria-hidden="true"></span>
                            Download App
                        </a>
              <a href="#demo" className="button stroke">
                <span className="icon-play" aria-hidden="true"></span>
                            Watch Video
                        </a>
            </div>
          </div> {/**end contents */}

          <div className="home-image-right"> {/**start image */}
            <img src="" alt="" />
          </div>
        </div> {/**end image */}

        <div className="col-1 ml-auto">
          <ul className="home-social-list"> {/**start socials */}
            <li>
              <a href="#"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a>
            </li>
            <li>
              <a href="#"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
            </li>
            <li>
              <a href="#"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a>
            </li>
            <li>
              <a href="#"><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></a>
            </li>
          </ul> {/**end socials */}
          <div className="home-scrolldown">
            <a href="#about" className="scroll-icon smoothscroll">
              <span>Scroll Down</span>
              <i className="icon-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingContent;