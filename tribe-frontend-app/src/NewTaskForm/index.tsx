import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../appContext';

interface IProps {
  show: Boolean,
  handleClose: Function,
  postNewTask: Function
}


function NewTaskForm({ show, handleClose, postNewTask }: IProps) {
  const INITIAL_STATE = { task_name: "", task_description: "", associated_points: "" as any, assignee: "" as any, completion_time: undefined }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { family } = useContext(UserContext);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    formData.assignee = parseInt(formData.assignee);
    formData.associated_points = parseInt(formData.associated_points);
    postNewTask(formData);
    handleClose();
  }

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData(currData => ({ ...currData, [name]: value }));
    console.log(name, value);
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
    // console.log(formData);
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
            <Form.Control name="assignee" as="select" multiple={true} onChange={(evt: any) => handleChange(evt)}>
              {family.map((memb: any) => {
                console.log("memb", memb.attribute_values.user_id);
              return <option key={memb.attribute_values.user_id} value={memb.attribute_values.user_id}>{memb.attribute_values.first_name}</option>
              })}
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