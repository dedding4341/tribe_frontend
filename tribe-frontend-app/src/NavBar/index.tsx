import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';

function NavBar() {
  return (
    <Navbar className="NavBar col-10 mr-auto ml-auto" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>tribe</Navbar.Brand>
      <Navbar.Collapse>
      <Nav className="ml-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">About</Nav.Link>
        <Nav.Link href="#getstarted">Get Started</Nav.Link>
      </Nav>
      <span>
        <a type="button" href="#signup" title="sign-up" className="button button-primary cta">Sign Up</a>
      </span>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;