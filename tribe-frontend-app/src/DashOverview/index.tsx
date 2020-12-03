import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBar from '../SearchBar';
import './DashOverview.css';

function DashOverview() {
  return (
    <Container className="DashOverview">
      <Row className="d-flex align-items-center">
        <Col md={7}>
          <h1 className="DashOverview-title">
            Task
            Overview
          </h1>
        </Col>
        <Col md={5}>
          <SearchBar />
        </Col>
      </Row>
    </Container>
  )
}

export default DashOverview;