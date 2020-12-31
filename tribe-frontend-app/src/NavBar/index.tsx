import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';

function NavBar() {
  return (
    <Navbar className="NavBar container" collapseOnSelect expand="lg" fixed="top">
      <div className="NavBar-container container">
        <Navbar.Brand className="brand">tribe</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#about">About</Nav.Link>
            <Nav.Link href="/users/auth">Get Started</Nav.Link>
            <Nav.Link href="/users/auth">Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;