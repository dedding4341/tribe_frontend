import React, { useContext } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../appContext';
import './DashboardNav.css';

function DashboardNav() {
  const { reset } = useContext(UserContext); 
  const history = useHistory();

  const handleLogout = () => {
    reset();
    document.cookie = "x-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push("/users/auth");
  }

  return (
    <div className="DashboardNav">
      <Nav defaultActiveKey="/tribe" className="flex-column" >
        <Nav.Link className="mt-2 mb-2"  href={`/tribe/overview`}>Home</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/calender`}>Calender</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/todo`}>To-do</Nav.Link>
        <Nav.Link className="mt-2 mb-2" href={`/tribe/store`}>Store</Nav.Link>
        <li className="DashboardNav-vertical-divider"></li>
        <Button className="mt-2 mb-2" onClick={handleLogout}>Logout</Button>
      </Nav>
    </div>
  );
}

export default DashboardNav;