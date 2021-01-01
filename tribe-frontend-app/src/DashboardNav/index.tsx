import React from 'react';
import { Nav } from 'react-bootstrap';
import './DashboardNav.css';

function DashboardNav() {
  return (
    <div className="DashboardNav">
      <Nav defaultActiveKey="/tribe" className="flex-column" >
        <Nav.Link className="mt-2 mb-2"  href={`/tribe/overview`}>Home</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/calender`}>Calender</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/todo`}>To-do</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/store`}>Store</Nav.Link>
        <li className="DashboardNav-vertical-divider"></li>
        <Nav.Link className="mt-2 mb-2" href="/">Logout</Nav.Link>
      </Nav>
    </div>
  );
}

export default DashboardNav;