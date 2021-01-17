import React from 'react';
import "./About.css";

// TODO: THIS NEEDS TO BE REFACTORED INTO SMALLER COMPONENTS
function About() {

  return (
    <section id="about">
      <div className="container about-how mb-5">
        <div className="row">
          <h1 className="intro-header col-12 mb-5">How does Tribe work?</h1>
        </div>
        <div className="about-how-steps row">

          <div className="about-step about-step-1 col-6">
            <h3>Sign-Up</h3>
            <p>Simply sign-up for an account and when you're ready to get started!
            </p>
          </div>

          <div className="about-step about-step-2 col-6">
            <h3>Find your Tribe</h3>
            <p>Get together with those that mean the most to you by creating or joining a Tribe! Tribe leaders are able to create codes that new members can enter in order to Tribe together.
            </p>
          </div>

          <div className="about-step about-step-3 col-6" >
            <h3>Create</h3>
            <p>Create tasks and assign them with members of your Tribe! Don't like a task you've been assigned? No problem - feel free to trade tasks out with any other eligible member of your Tribe!
            </p>
          </div>

          <div className="about-step about-step-4 col-6" >
            <h3>Tribe</h3>
            <p>Now that you have gathered all of the members of your Tribe rest assured that your weeks will go exactly as planned since everyone knows exactly what roles they have to fill!
            </p>
          </div>


        </div>

      </div>
    </section>
  )
}

export default About;