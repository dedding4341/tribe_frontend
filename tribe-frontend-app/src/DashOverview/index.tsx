import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchBar from '../SearchBar';
import './DashOverview.css';

function DashOverview() {
  return (
    <Container className="DashOverview">
      <Row>
        <h1 className="DashOverview-title">
          Task
          Overview
          </h1>
        <SearchBar />
      </Row>
    </Container>
  )
}

export default DashOverview;