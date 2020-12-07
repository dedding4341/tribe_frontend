import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface IProps {
  show: Boolean,
  handleClose: Function,
  postNewTask: Function
}


function NewTaskForm({ show, handleClose, postNewTask }: IProps) {
  // familyMembers information will be stored in a global state.
  // for now, it will be placed here.
  const familyMembers = [{ first_name: "Taka", last_name: "M", user_id: 321, family_manager: false }, { first_name: "Diana", last_name: "Liang", user_id: 231, family_manager: true }, { first_name: "Danny", last_name: "M", user_id: 132, family_manager: false }, { first_name: "Dennis", last_name: "E", user_id: 123, family_manager: false }];
  const INITIAL_STATE = { task_name: "", task_description: "", associated_points: 1, assignee: [] as any, completion_time: undefined }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    formData.assignee = formData.assignee.map((uid: string) => parseInt(uid));
    postNewTask(formData);
    handleClose();
  }

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData(currData => ({ ...currData, [name]: value }));
  }

  const handleMultiselect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    let selected: any = [...formData.assignee];
    let selectedOption = (evt.target.selectedOptions);

    for (let i = 0; i < selectedOption.length; i++) {
      let foundIdx = formData.assignee.indexOf(selectedOption.item(i)?.value);
      if (foundIdx !== -1) {
        selected.splice(foundIdx, 1);
      } else {
        selected.push(selectedOption.item(i)?.value);
      }
    }

    setFormData(currData => ({ ...currData, assignee: selected }))
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
            <Form.Label>Due by</Form.Label>
            <Form.Control value={formData.completion_time} name="completion_time" type="date" onChange={(evt) => handleChange(evt as any)}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Assign to:</Form.Label>
            <Form.Control name="assignee" as="select" value={formData.assignee} multiple={true} onChange={(evt: any) => handleMultiselect(evt)}>
              {familyMembers.map(memb => <option key={memb.user_id} value={memb.user_id}>{memb.first_name}</option>)}
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