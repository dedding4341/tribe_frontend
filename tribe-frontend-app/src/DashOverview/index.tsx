import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import TaskCard from '../TaskCard';
import './DashOverview.css';
import { BASE_URL } from '../config';
import { getCookie } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskFromAPI, getFamilyTasksFromAPI, postTaskToAPI, updateTaskToAPI } from '../actionCreators';
import FilterBar from '../FilterBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAirFreshener } from '@fortawesome/free-solid-svg-icons';

interface Task {
  task_id: Number,
  task_name: String,
  associated_points: Number,
  assignee: Array<any>,
  created_by: Number,
  completion_time: String;
}

/**
 * `DashOverview` component handles the task-related dispatches to
 * handle backend communication and Store updates.
 */
function DashOverview() {
  // `loading` is true until all required information is received from API.
  const loading = useSelector((st: any) => st.loading);
  const family_tasks = useSelector((st: any) => st.family_tasks);
  const userId = useSelector((st: any) => st.user.user_id);
  const familyManager = useSelector((st: any) => st.user.family_manager);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [tasks, setTasks] = useState(family_tasks);

  const dispatch = useDispatch();
  const token = getCookie("x-access-token");

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks(family_tasks);
    }
  }, [family_tasks]);

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
  }

  // Deletes an existing task on the backend and update the Store.
  const deleteTask = async (task_id: Number) => {
    dispatch(deleteTaskFromAPI(task_id));
  }

  // Posts a new task on the backend and update the Store.
  const postNewTask = async (data: Task) => {
    dispatch(postTaskToAPI(data));
  }

  // Updates an existing task on the backend and update the Store.
  const updateTask = async (data: Task, currentUserId: Number) => {
    dispatch(updateTaskToAPI(data, currentUserId));
  }

  const fetchTasks = async () => {
    dispatch(getFamilyTasksFromAPI());
  }

  // `filter` filters tasks on the `filterType` to display on UI.
  const filter = (filterType: String) => {
    let filteredTasks: Array<any>;
    switch (filterType) {
      case "unassigned":
        // show unassigned tasks
        filteredTasks = family_tasks.filter((t: any) => {
          return t.assignee === true;
        });
        setTasks(filteredTasks);
        break;
      case "myTasks":
        // show currentUser's tasks
        filteredTasks = family_tasks.filter((t: any) => {
          return t.assignee === userId;
        });
        setTasks(filteredTasks);
        break;
      default:
        // show all tasks
        setTasks(family_tasks);
        break;
    }
  }

  return (
    <Container className="DashOverview">
      {loading ? <div> loading... </div> :
        <>
          { showNewTaskForm && <NewTaskForm postNewTask={postNewTask} show={showNewTaskForm} handleClose={handleClose} isEdit={false} />}
          <Row className="d-flex align-items-center">
            <Col md={4}>
              <h1 className="DashOverview-title">
                Task
                Overview
              </h1>
            </Col>
            <Col md={7} className="d-flex justify-content-around align-items-center">
              <Button className="DashOverview-fetch-task-btn shadow-none" onClick={fetchTasks}><FontAwesomeIcon icon={faAirFreshener} /></Button>
              {familyManager && <Button className="DashOverview-new-task-btn shadow-none" onClick={() => setShowNewTaskForm(!showNewTaskForm)}><FontAwesomeIcon icon={faPlus} /> Add Task</Button>}
              <FilterBar filter={filter} />
            </Col>
          </Row>
          <Container fluid className="mt-3">
            <Row>
              {tasks.length > 0 ? tasks.map((task: any) => {
                return (<Col md={6}>
                  <TaskCard key={task.task_id} task={task} updateTask={updateTask} tradeTask={tradeTask} deleteTask={deleteTask} completeTask={completeTask} />
                </Col>)
              }) : <Col md={6}>No tasks to display.</Col>}
            </Row>
          </Container>
        </>
      }
    </Container>
  )
}

export default DashOverview;