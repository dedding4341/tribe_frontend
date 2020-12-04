import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import SearchBar from '../SearchBar';
import TaskCard from '../TaskCard';
import './DashOverview.css';

function DashOverview() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  // GET all the tasks from their family id and display them here as a TaskCard
  const handleClose = () => {
    setShowNewTaskForm(false);
  }

  return (
    <Container className="DashOverview">
      {showNewTaskForm && <NewTaskForm show={showNewTaskForm} handleClose={handleClose} />}
      <Row className="d-flex align-items-center">
        <Col md={4}>
          <h1 className="DashOverview-title">
            Task
            Overview
          </h1>
        </Col>
        <Col md={8} className="d-flex justify-content-around align-items-center">
          <Button className="DashOverview-new-task-btn" onClick={() => setShowNewTaskForm(!showNewTaskForm)}>Add Task</Button>
          <SearchBar />
        </Col>
      </Row>
      <Container fluid className="mt-3">
        <Row>
          <Col md={6}>
            <TaskCard />
          </Col>
          <Col md={6}>
            <TaskCard />
          </Col>
          <Col md={6}>
            <TaskCard />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default DashOverview;