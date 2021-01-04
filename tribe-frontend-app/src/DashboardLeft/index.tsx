import React from 'react';
import DashboardNav from '../DashboardNav';
import ProfileHeader from '../ProfileHeader';
import './DashboardLeft.css';

function DashboardLeft() {
  return (
    <div className="DashboardLeft">
      <ProfileHeader/>
      <DashboardNav />
    </div>
  );
}

export default DashboardLeft;