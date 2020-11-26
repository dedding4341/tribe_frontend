import React from 'react';

interface IProps {
  currentStep: Number;
}


function UserSetupStep6({ currentStep }: IProps) {
  return (
    <div>
      {currentStep === 6 &&
        <div>
          Ok! You're all set to go.
          <br/>
          Let's get tribing!
        </div>
      }
    </div>
  );
}

export default UserSetupStep6;