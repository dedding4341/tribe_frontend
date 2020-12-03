import React from 'react';
import { Nav } from 'react-bootstrap';
import './DashboardNav.css';

function DashboardNav() {
  const famId = 232323;
  return (
    <div className="DashboardNav">
      <Nav defaultActiveKey="/tribe" className="flex-column" >
        <Nav.Link className="mt-2 mb-2"  href={`/tribe/${famId}/overview`}>Home</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/${famId}/calender`}>Calender</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/${famId}/todo`}>To-do</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/${famId}/store`}>Store</Nav.Link>
        <li className="DashboardNav-vertical-divider"></li>
        <Nav.Link className="mt-2 mb-2" href="/">Logout</Nav.Link>
      </Nav>
    </div>
  );
}

export default DashboardNav;