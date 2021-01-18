import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import NewTaskForm from "../NewTaskForm";
import "./TaskCardDetailsModal.css"

interface IProps {
  show: Boolean,
  handleUpdateTask: Function,
  handleClose: Function,
  task: any,
  taskOwner: any,
  isFamilyAdmin: Boolean
}

/**
 * `TaskCardDetailsModal` modal component displays a task's information in full.
 * Includes navigation to EDIT a task if current user is a `family_manager`
 */
function TaskCardDetailsModal({ show, handleUpdateTask, handleClose, task, taskOwner, isFamilyAdmin }: IProps) {
  const [showTaskEdit, setShowTaskEdit] = useState(false);

  const handleShowEdit = () => {
    setShowTaskEdit(true);
  }

  const handleCloseEdit = () => {
    setShowTaskEdit(false);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <NewTaskForm postNewTask={handleUpdateTask} show={showTaskEdit} handleClose={handleCloseEdit} isEdit={true} task={task}/>
      <Modal.Header closeButton>
        <Modal.Title className="TaskCardDetailsModal-title">{task.task_name}<span className="TaskCard-pts">+{task.associated_points}pts</span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          posted {moment(new Date(task.created_at).toString()).calendar()} by {taskOwner.first_name}
        </p>
        <p>{task.task_description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
        {/**
         * If the current user is a `family_admin` and the task hasn't been completed yet,
         *  the Edit Task button will display to show `NewTaskForm` modal 
         * */}
        {(isFamilyAdmin && !task.complete ) && <Button onClick={() => handleShowEdit()}>Edit task</Button>}
      </Modal.Footer>
    </Modal>
  )
}

export default TaskCardDetailsModal;