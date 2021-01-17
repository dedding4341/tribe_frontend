import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

interface IProps {
  show: Boolean,
  handleClose: Function,
  postNewTask: Function,
  isEdit: Boolean
}

/**
 * This NewTaskForm modal component works for both:
 * - making a new task AND 
 * - patching an existing task
 */
function NewTaskForm({ show, handleClose, postNewTask, isEdit }: IProps) {
  const INITIAL_STATE = { task_name: "", task_description: "", associated_points: "" as any, assignee: "" as any, completion_time: undefined }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const famMembers = useSelector((st: any) => st.famMembers);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    formData.assignee = formData.assignee !== -1 ? parseInt(formData.assignee) : -1;
    formData.associated_points = parseInt(formData.associated_points);
    postNewTask(formData);
    handleClose();
  }

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData(currData => ({ ...currData, [name]: value }));
  }


  const handleSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedOption = (evt.target.selectedOptions);

    /**save for the future when there can be multiple assignees*/
    // let selected: any = [...formData.assignee];
    // for (let i = 0; i < selectedOption.length; i++) {
    //   let foundIdx = formData.assignee.indexOf(selectedOption.item(i)?.value);
    //   if (foundIdx !== -1) {
    //     selected.splice(foundIdx, 1);
    //   } else {
    //     selected.push(selectedOption.item(i)?.value);
    //   }
    // }

    // setFormData(currData => ({ ...currData, assignee: selectedOption }));
  }

  return (
    <Modal show={show} onHide={handleClose} className="NewTaskForm">
      <Modal.Header>
        <Modal.Title>
          {isEdit ? "Edit task" : "Create a task"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control required value={formData.task_name} name="task_name" placeholder="Enter task" onChange={(evt) => handleChange(evt as any)}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control value={formData.task_description} name="task_description" placeholder="Enter task detail" onChange={(evt) => handleChange(evt as any)}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Points</Form.Label>
            <Form.Control value={formData.associated_points} name="associated_points" type="number" placeholder="Enter points" min="0" max="100" onChange={(evt) => handleChange(evt as any)} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Due by</Form.Label>
            <Form.Control value={formData.completion_time} name="completion_time" type="date" onChange={(evt) => handleChange(evt as any)}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Assign to:</Form.Label>
            <Form.Control name="assignee" as="select" multiple={true} onChange={(evt: any) => handleChange(evt)}>
              <option value="N/A">Assign task later</option>
              {famMembers.map((memb: any) => {
                return <option key={memb.user_id} value={memb.user_id}>{memb.first_name ? memb.first_name : "Unknown"}</option>
              })}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
          <Button type="submit">{isEdit ? "Save" : "Add"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default NewTaskForm;