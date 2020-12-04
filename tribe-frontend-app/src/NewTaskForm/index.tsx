import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface IProps {
  show: Boolean,
  handleClose: Function
}

function NewTaskForm({show, handleClose}: IProps) {
  const familyMembers = [ {name: "Taka", uid: 321}, {name:"Diana", uid: 231}, {name:"Danny", uid: 132}, {name:"Dennis", uid: 123}];
  const INITIAL_STATE = {task_name: "", task_description: "", associated_points: 1, assignee: `${familyMembers[0].uid}`}
  const [formData, setFormData] = useState(INITIAL_STATE);


  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log("submitting...", formData);
    handleClose();
  }

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData(currData => ({ ...currData, [name]: value}));
  }

  return (
    <Modal show={show} onHide={handleClose} className="NewTaskForm">
      <Modal.Header>
        <Modal.Title>
          Create a task
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
          <Form.Control value={formData.associated_points} name="associated_points" type="number" placeholder="Enter points" onChange={(evt) => handleChange(evt as any)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Assign to:</Form.Label>
          <Form.Control value={formData.assignee} name="assignee" as="select" onChange={(evt) => handleChange(evt as any)}>
            {familyMembers.map(memb => <option key={memb.uid} value={memb.uid}>{memb.name}</option>)}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit">Add</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default NewTaskForm;