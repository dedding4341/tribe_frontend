import React from 'react';
import UserSetupForm from '../UserSetupForm';
import './UserSetup.css';

function UserSetup() {
  return (
    <div className="UserSetup container bg-light">
      <section className="row">
        <div className="UserSetup-form-container col-12">
          <UserSetupForm />
        </div>
      </section>
    </div>
  );
}

export default UserSetup;