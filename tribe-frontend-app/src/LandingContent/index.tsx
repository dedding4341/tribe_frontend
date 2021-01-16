import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faPlay } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './LandingContent.css';
import { Button } from 'react-bootstrap';

function LandingContent() {
  return (
    <section className="LandingContent">
      <div className="LandingContent-bg">
        <div className="home-content row no-gutters">
          <div className="row contents col-11"> {/**start contents */}
            <div className="home-content-left col-9 mr-auto ml-auto" >
              <div className="home-welcome text-left">
                <h3>Welcome to Tribe</h3>
                <h1>
                  A Task Trading App<br />
                  for the Family.<br />
                  Ready to join your Tribe?
                </h1>
              </div>
              <div className="buttons row">
                <a href="/users/auth"><Button className="LandingContent-login-btn">
                  Login
                </Button></a>
                {/* <a href="#demo" className="button stroke">
                  <FontAwesomeIcon icon={faPlay}/>
                  Watch Video
                </a> */}
              </div>
            </div> {/**end contents */}

            <div className="home-image-right"> {/**start image */}
              <img src="" alt="" />
            </div>
          </div> {/**end image */}

          <div className="col-1">
            <ul className="home-social-list"> {/**start socials */}
              {/* <li>
                <a href="#"><FontAwesomeIcon icon={faFacebook} size="2x"/></a>
              </li>
              <li>
                <a href="#"><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
              </li>
              <li>
                <a href="#"><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
              </li>
              <li>
                <a href="#"><FontAwesomeIcon icon={faYoutube} size="2x"/></a>
              </li> */}
            </ul> {/**end socials */}
            <div className="home-scrolldown">
              <a href="#about" className="scroll-icon smoothscroll">
                <span>SCROLL DOWN</span>
                <FontAwesomeIcon icon={faArrowDown} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingContent;