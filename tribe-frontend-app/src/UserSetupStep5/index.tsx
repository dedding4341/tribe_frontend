import React from 'react';
import { Form } from 'react-bootstrap';

interface IProps {
  handleChange: Function;
  handleSubmit: Function;
  next: Function;
  prev: Function;
  currentStep: Number;
}

function UserSetupStep5({ handleChange, handleSubmit, next, prev, currentStep }: IProps) {
  return (
    <div>
    {currentStep === 5 &&
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

export default UserSetupStep5;