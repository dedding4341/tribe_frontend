import React, { useEffect, useState } from 'react';
import { Button, CardColumns, Col, Container, Row } from 'react-bootstrap';
import NewTaskForm from '../NewTaskForm';
import TaskCard from '../TaskCard';
import './DashOverview.css';
import { useDispatch, useSelector } from 'react-redux';
import { completeTaskFromAPI, deleteTaskFromAPI, getFamilyTasksFromAPI, postTaskToAPI, updateTaskToAPI } from '../actionCreators';
import FilterBar from '../FilterBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Task {
  task_id: Number,
  task_name: String,
  associated_points: Number,
  assignee: Array<any>,
  created_by: Number,
  completion_time: String;
}

interface IProps {
  showHistory: Boolean
}

/**
 * `DashOverview` component handles the task-related dispatches to
 * handle backend communication and Store updates.
 * 
 * Depending on `showHistory`, it will render Task Overview or (current user's) Task History
 */
function DashOverview({ showHistory }: IProps) {
  // `loading` is true until all required information is received from API.
  const loading = useSelector((st: any) => st.loading);
  const family_tasks = useSelector((st: any) => st.family_tasks);
  const user = useSelector((st: any) => st.user);
  const familyManager = useSelector((st: any) => st.user.family_manager);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [tasks, setTasks] = useState(family_tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    let tasks;
    if (showHistory) {
      tasks = family_tasks.filter((t: any) => {
        return t.completed;
      });
    } else {
      tasks = family_tasks.filter((t: any) => {
        return !t.completed;
      });
    }
    setTasks(tasks);
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
    dispatch(completeTaskFromAPI(task_id));
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

  // TODO: Migrate and update this filter to another component (maybe the FilterBar component)
  // `filter` filters tasks on the `filterType` to display on UI.
  const filter = (filterType: String) => {
    let filteredTasks: Array<any>;
    switch (filterType) {
      case "unassigned":
        // show unassigned tasks
        filteredTasks = family_tasks.filter((t: any) => {
          return !t.assignee
        });
        setTasks(filteredTasks);
        break;
      case "myTasks":
        // show currentUser's tasks
        filteredTasks = family_tasks.filter((t: any) => {
          return t.assignee === user.user_id && !t.completed;
        });
        setTasks(filteredTasks);
        break;
      case "completedTasks":
        filteredTasks = family_tasks.filter((t: any) => {
          return t.assignee === user.user_id && t.completed;
        });
        setTasks(filteredTasks);
        break;
      case "all":
        // show all active tasks
        filteredTasks = family_tasks.filter((t: any) => {
          return !t.completed;
        });
        setTasks(filteredTasks);
        break;
      default:
        filteredTasks = family_tasks.filter((t: any) => {
          return t.completed === false;
        });
        setTasks(family_tasks);
        break;
    }
  }

  return (
    <Container className="DashOverview">
      {loading ? <div> loading... </div> :
        <>
          { showNewTaskForm && <NewTaskForm postNewTask={postNewTask} show={showNewTaskForm} handleClose={handleClose} isEdit={false} />}
          <Row className="d-flex align-items-center justify-content-between">
            <Col md={4}>
              <h1 className="DashOverview-title">
                {showHistory ? "Task History" :
                  "Task Overview"}
              </h1>
            </Col>
            {!showHistory &&
              <Col md={7} className="d-flex justify-content-end ml-2 align-items-center">
                {familyManager && <Button className="DashOverview-new-task-btn shadow-none" onClick={() => setShowNewTaskForm(!showNewTaskForm)}><FontAwesomeIcon icon={faPlus} /> Add Task</Button>}
                <FilterBar filter={filter} />
              </Col>
            }
          </Row>
          <Row className="mt-3">
              {tasks.length > 0 ? tasks.map((task: any) => {
                return (<Col md={6} className="mt-3" key={`${task.associated_points}-${task.task_id}`}>
                  <TaskCard key={`${task.task_id}-card`} task={task} updateTask={updateTask} tradeTask={tradeTask} deleteTask={deleteTask} completeTask={completeTask} />
                </Col>)
            })
            : <Col md={12}>No tasks to display.</Col>}
          </Row>
        </>
      }
      <Button className="DashOverview-fetch-task-btn shadow-none mt-5" onClick={fetchTasks}>Reload tasks</Button>
    </Container>
  )
}

export default DashOverview;