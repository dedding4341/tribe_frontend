import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBar from '../SearchBar';
import TaskCard from '../TaskCard';
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
        <Col md={5} >
          <SearchBar />
        </Col>
      </Row>
      <Container fluid className="mt-3">
      <Row>
        <Col md={6}>
        <TaskCard/>
        </Col>
        <Col md={6}>
        <TaskCard/>
        </Col>
        <Col md={6}>
        <TaskCard/>
        </Col>
      </Row>

      </Container>
    </Container>
  )
}

export default DashOverview;