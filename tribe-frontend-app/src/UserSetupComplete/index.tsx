import React from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  currentStep: Number,
  handleRedirect: Function,
}


function UserSetupStep6({ currentStep, handleRedirect }: IProps) {
  return (
    <div>
      {currentStep === 6 &&
        <div className="slide-in-bottom">
          <p>
          Ok! You're all set to go.
          <br/>
          Let's get tribing!
          </p>
          <Button onClick={() => handleRedirect()}>Take me to the Tribe!</Button>
        </div>
      }
    </div>
  );
}

export default UserSetupStep6;