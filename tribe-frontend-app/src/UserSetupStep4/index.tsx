import React from 'react';
import { Form } from 'react-bootstrap';

interface IProps {
  handleChange: Function;
  handleSubmit: Function;
  next: Function;
  prev: Function;
  currentStep: Number;
}

function UserSetupStep4({ handleChange, handleSubmit, next, prev, currentStep }: IProps) {
  return (
    <div>
      {currentStep === 4 &&
        <Form>
          <Form.Group>
            <Form.Label>What's your first name?</Form.Label>
            <Form.Control/>
          </Form.Group>
        </Form>
      }
    </div>
  );
}

export default UserSetupStep4;