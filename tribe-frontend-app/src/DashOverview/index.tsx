import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import SearchBar from '../SearchBar';
import TaskCard from '../TaskCard';
import './DashOverview.css';

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
      return {
        tasks: [
          {
            task_id: 39483,
            task_name: "Movie nite w/ fam",
            associated_points: 5,
            assignee: [132],
            created_by: 231,
            completion_time: '12/13/2020'
          },
          {
            task_id: 30493,
            task_name: "Wash dishes",
            associated_points: 2,
            assignee: [231],
            created_by: 321,
            completion_time: '12/08/2020'
          },
          {
            task_id: 34839,
            task_name: "Do laundry",
            associated_points: 2,
            assignee: [123],
            created_by: 321,
            completion_time: '12/08/2020'
          },
          {
            task_id: 12329,
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
              <TaskCard task={task} deleteTask={deleteTask}/>
            </Col>)
          }) : <Col md={6}>No tasks to display.</Col>}
        </Row>
      </Container>
    </Container>
  )
}

export default DashOverview;