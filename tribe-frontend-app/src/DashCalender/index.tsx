import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import TaskCard from '../TaskCard';
import './DashCalender.css';

function DashCalender() {
  return (
    <Container className="DashOverview">
      <Row className="d-flex align-items-center">
        <Col md={7}>
          <h1 className="DashOverview-title">
            Calender
          </h1>
        </Col>
      </Row>
      <Container fluid className="mt-3">
        <Row>
          <Col md={7} className="DashCalender-calender-wrapper">
            <Image src="https://3vwizk2qtr8l3diwrm3r2ba0-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/Apple-Google-2.png"></Image>
          </Col>
          <Col md={5} className="DashCalender-evt-list-wrapper">
            <Row className="DashCalender-evt-list-header">
              <h2>Upcoming Events</h2>
              <Button>View All</Button>
            </Row>
            <Row>
              <Col>
              {/* Need remake a new component similar named EventCard */}
                <TaskCard/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default DashCalender;