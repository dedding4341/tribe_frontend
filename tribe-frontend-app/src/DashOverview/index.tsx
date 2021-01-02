import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import SearchBar from '../SearchBar';
import TaskCard from '../TaskCard';
import './DashOverview.css';
import { BASE_URL } from '../config';
import { getCookie } from '../helpers';
import { UserContext } from '../appContext';

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
  const [tasks, setTasks] = useState([] as any[]);
  const { user, loading } = useContext(UserContext);

  useEffect(function handleGetTasks() {
    async function getTasks() {
      const token = getCookie("x-access-token");

      const getFamTaskUrl = `${BASE_URL}/tasks/family`;
      const res = await fetch(getFamTaskUrl, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${token}`,
        },
        credentials: "include"
      });
      const resData = await res.json();
      setTasks(resData.family_tasks);
    }
    if (!loading) getTasks();
  }, [loading]);

  // GET all the tasks from their family id and display them here as a TaskCard
  const handleClose = () => {
    setShowNewTaskForm(false);
  }

  // TODO: Implement server logic
  const tradeTask = (task_id: Number, recipients: any) => {
    alert(`You've sent trade requests to users #${recipients}.`);
  }

  // TODO: Implement server logic
  const completeTask = (task_id: Number) => {
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

  const postNewTask = async (data: Task) => {
    const token = getCookie("x-access-token");
    await fetch(`${BASE_URL}/create-task`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    setTasks(currTasks => ([{ ...data, created_by: user.user_id, created_at: new Date().getUTCDate() }, ...currTasks ]));
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
        <Col md={7} className="d-flex justify-content-around align-items-center">
          <Button className="DashOverview-new-task-btn" onClick={() => setShowNewTaskForm(!showNewTaskForm)}>Add Task</Button>
          <SearchBar />
        </Col>
      </Row>
      <Container fluid className="mt-3">
        <Row>
          {tasks && !loading ? tasks.map(task => {
            return (<Col md={6}>
              <TaskCard key={task.task_id} task={task} tradeTask={tradeTask} deleteTask={deleteTask} completeTask={completeTask} />
            </Col>)
          }) : <Col md={6}>No tasks to display.</Col>}
        </Row>
      </Container>
    </Container>
  )
}

export default DashOverview;