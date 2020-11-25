import React from 'react';
import About from '../About';
import Footer from '../Footer';
import LandingContent from '../LandingContent';
import NavBar from '../NavBar';

function Landing() {
  return (
    <div className="Landing">
      <NavBar/>
      <LandingContent/>
      <About/>
      <Footer/>
    </div>
  )
}

export default Landing;