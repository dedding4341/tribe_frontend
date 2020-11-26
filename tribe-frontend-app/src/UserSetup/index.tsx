import React from 'react';
import UserSetupForm from '../UserSetupForm';
import './UserSetup.css';

function UserSetup() {
  return (
    <div className="UserSetup container">
      This is the user's first time logging in!
      <section className="row ">
        <div className="col-12">
          <UserSetupForm />
        </div>
      </section>
    </div>
  );
}

export default UserSetup;