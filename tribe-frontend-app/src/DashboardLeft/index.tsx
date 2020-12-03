import React from 'react';
import DashboardNav from '../DashboardNav';
import ProfileHeader from '../ProfileHeader';

function DashboardLeft() {
  console.log("i'm rerendering!")
  return (
    <div className="DashboardLeft">
      <ProfileHeader/>
      <DashboardNav/>
    </div>
  );
}

export default DashboardLeft;