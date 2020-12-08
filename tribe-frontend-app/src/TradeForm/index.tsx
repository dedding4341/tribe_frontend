import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as mock from '../mock';

interface IProps {
  show: Boolean,
  handleClose: Function,
  handleTradeTask: Function
}


function TradeForm({ show, handleClose, handleTradeTask }: IProps) {
  // familyMembers information will be stored in a global state.
  // for now, it will be placed here.
  const INITIAL_STATE = { recipients: [] as any };
  const [formData, setFormData] = useState(INITIAL_STATE);
  

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    formData.recipients = formData.recipients.map((uid: string) => parseInt(uid));
    handleTradeTask(formData);
    handleClose();
  }

  const handleMultiselect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    let selected: any = [...formData.recipients];
    let selectedOption = (evt.target.selectedOptions);

    for (let i = 0; i < selectedOption.length; i++) {
      let foundIdx = formData.recipients.indexOf(selectedOption.item(i)?.value);
      if (foundIdx !== -1) {
        selected.splice(foundIdx, 1);
      } else {
        selected.push(selectedOption.item(i)?.value);
      }
    }

    setFormData({ recipients: selected })
  }

  return (
    <Modal show={show} onHide={handleClose} className="TradeForm">
      <Modal.Header>
        <Modal.Title>
          Trade Request
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Request trade to:</Form.Label>
            <Form.Control required name="recipients" as="select" value={formData.recipients} multiple={true} onChange={(evt: any) => handleMultiselect(evt)}>
              {mock.familyMembers.map(memb => <option key={memb.user_id} value={memb.user_id}>{memb.first_name}</option>)}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Send Request</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default TradeForm;