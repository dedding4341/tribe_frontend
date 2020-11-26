import React from 'react';
import { Form } from 'react-bootstrap';

interface IProps {
  handleChange: Function;
  next: Function;
  prev: Function;
  currentStep: Number;
}

function UserSetupStep2({ handleChange, next, prev, currentStep}: IProps) {
  return (
    <div>
      {currentStep === 2 &&
        <Form>
          <Form.Group>
            <Form.Label>What's your last name?</Form.Label>
            <Form.Control/>
          </Form.Group>
        </Form>
      }
    </div>
  );
}

export default UserSetupStep2;