import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import SearchBar from '../SearchBar';
import TaskCard from '../TaskCard';
import './DashOverview.css';

function DashOverview() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [tasks, setTasks] = useState([] as Object[]);

  useEffect(function handleGetTasks() {
    function getTasks() {
      return {
        tasks: [
          {
            task_name: "Movie nite w/ fam",
            associated_points: 5,
            assignee: [132],
            created_by: 231,
            completion_time: '12/13/2020'
          },
          {
            task_name: "Wash dishes",
            associated_points: 2,
            assignee: [231],
            created_by: 321,
            completion_time: '12/08/2020'
          },
          {
            task_name: "Do laundry",
            associated_points: 2,
            assignee: [123],
            created_by: 321,
            completion_time: '12/08/2020'
          },
          {
            task_name: "help Diana with hw",
            associated_points: 100,
            assignee: [123, 132],
            created_by: 321,
            completion_time: '12/10/2020'
          }
        ]
      }
    }
    let resp = getTasks();
    setTasks(resp.tasks);
  }, []);

  // GET all the tasks from their family id and display them here as a TaskCard
  const handleClose = () => {
    setShowNewTaskForm(false);
  }

  const postNewTask = (data: Object) => {
    setTasks(currTasks => ([...currTasks, data]))
  }

  return (
    <Container className="DashOverview">
      {showNewTaskForm && <NewTaskForm postNewTask={postNewTask} show={showNewTaskForm} handleClose={handleClose} />}
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
          {tasks ? tasks.map(task => {
            return (<Col md={6}>
              <TaskCard task={task} />
            </Col>)
          }) : <Col md={6}>No tasks to display.</Col>}
        </Row>
      </Container>
    </Container>
  )
}

export default DashOverview;