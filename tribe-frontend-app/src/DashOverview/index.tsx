import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import SearchBar from '../SearchBar';
import TaskCard from '../TaskCard';
import './DashOverview.css';
import { BASE_URL } from '../config';
import * as mock from '../mock';

interface Task {
  task_id: Number,
  task_name: String,
  associated_points: Number,
  assignee: Array<any>,
  created_by: Number,
  completion_time: String;
}

function DashOverview() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [tasks, setTasks] = useState([] as Task[]);

  useEffect(function handleGetTasks() {
    function getTasks() {
      // const getFamTaskUrl = `${BASE_URL}/tasks/family`;
      // const res = await fetch(getFamTaskUrl, { credentials: "include" });

      return mock.response;
    }
    let resp = getTasks();
    setTasks(resp.tasks);
  }, []);

  // GET all the tasks from their family id and display them here as a TaskCard
  const handleClose = () => {
    setShowNewTaskForm(false);
  }

  // TODO: Implement server logic
  const tradeTask = (task_id: Number, recipients: any) => {
    console.log(`Requesting trade for task id ${task_id} to users ${recipients}`);
    alert(`You've sent trade requests to users #${recipients}.`);
  }

  // TODO: Implement server logic
  const completeTask = (task_id: Number) => {
    console.log(`Completing task id ${task_id}`);
    alert("You've completed the task.")
  }

  // TODO: Implement server logic
  const deleteTask = (task_id: Number) => {
    setTasks(currTasks => {
      let filteredTasks = currTasks.filter(task => {
        return task.task_id !== task_id;
      });
      return filteredTasks;
    });
  }

  const postNewTask = (data: Task) => {
    // TODO: Delete the Math.random line once the backend communication is implemented.
    // We need `data.task_id` because it needs a `task_id` for the `deleteTask` fxn.
    data.task_id = Math.floor(Math.random() * (99999 - 10001) + 10001);

    setTasks(currTasks => ([...currTasks, data]));
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
              <TaskCard task={task} tradeTask={tradeTask} deleteTask={deleteTask} completeTask={completeTask}/>
            </Col>)
          }) : <Col md={6}>No tasks to display.</Col>}
        </Row>
      </Container>
    </Container>
  )
}

export default DashOverview;