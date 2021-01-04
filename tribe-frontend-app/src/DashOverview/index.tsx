import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import SearchBar from '../SearchBar';
import TaskCard from '../TaskCard';
import './DashOverview.css';
import { BASE_URL } from '../config';
import { getCookie } from '../helpers';
import { UserContext } from '../appContext';
import { Redirect } from 'react-router-dom';

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
  const token = getCookie("x-access-token");

  useEffect(function handleGetTasks() {
    async function getTasks() {
      const getFamTaskUrl = `${BASE_URL}/tasks/family`;
      console.log("retrieving tasks");
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
  }, [loading, token]);

  // GET all the tasks from their family id and display them here as a TaskCard
  const handleClose = () => {
    setShowNewTaskForm(false);
  }

  // TODO: Implement server logic
  const tradeTask = (task_id: Number, recipients: any) => {
    alert(`You've sent trade requests to users #${recipients}.`);
  }

  // TODO: Implement server logic
  const completeTask = async (task_id: Number) => {
    alert("You've completed the task.");
    const res = await fetch(`${BASE_URL}/complete-task`, {
      method: "PATCH",
      body: JSON.stringify({ task_id }),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    if (res.status === 200) {
      console.log("completed");
    }
    setTasks(currTasks => {
      let filteredTasks = currTasks.filter(task => {
        return task.task_id !== task_id;
      });
      return filteredTasks;
    });
  }

  // TODO: Implement server logic
  const deleteTask = async (task_id: Number) => {
    const res = await fetch(`${BASE_URL}/delete-task`, {
      method: "PATCH",
      body: JSON.stringify({ task_id }),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    if (res.status === 200) {
      console.log("yeet");
    }
    setTasks(currTasks => {
      let filteredTasks = currTasks.filter(task => {
        return task.task_id !== task_id;
      });
      return filteredTasks;
    });
  }

  const postNewTask = async (data: Task) => {
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
          {tasks.length > 0 ? tasks.map(task => {
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