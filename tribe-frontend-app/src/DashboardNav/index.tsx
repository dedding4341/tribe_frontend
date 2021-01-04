import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUser } from '../actionCreators';
import './DashboardNav.css';

function DashboardNav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/users/auth");
  }

  return (
    <div className="DashboardNav">
      <Nav defaultActiveKey="/tribe" className="flex-column" >
        <NavLink className="mt-2 mb-2"  to={`/tribe/overview`}>Home</NavLink>
        <NavLink className="mt-2 mb-2" to={`/tribe/calender`}>Calender</NavLink>
        <NavLink className="mt-2 mb-2" to={`/tribe/todo`}>To-do</NavLink>
        <NavLink className="mt-2 mb-2" to={`/tribe/store`}>Store</NavLink>
        <li className="DashboardNav-vertical-divider"></li>
        <Button className="mt-2 mb-2" onClick={handleLogout}>Logout</Button>
      </Nav>
    </div>
  );
}

export default DashboardNav;