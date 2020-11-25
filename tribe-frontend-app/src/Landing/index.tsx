import React from 'react';
import About from '../About';
import Footer from '../Footer';
import LandingContent from '../LandingContent';

function Landing() {
  return (
    <div className="Landing">
      <LandingContent/>
      {/* <About/> */}
      <Footer/>
    </div>
  )
}

export default Landing;