import React from 'react';
import { Form } from 'react-bootstrap';

interface IProps {
  handleChange: Function;
  next: Function;
  currentStep: Number;
  value: string;
}

function UserSetupStep1({ handleChange, next, currentStep, value }: IProps) {
  return (
    <div className="UserSetupStep1 mt-5">
      {currentStep === 1 &&
        <Form>
          <Form.Group>
            <Form.Label>What's your first name?</Form.Label>
            <Form.Control name="firstName" value={value} onChange={(evt) => handleChange(evt as any)}/>
          </Form.Group>
        </Form>
      }
    </div>
  );
}

export default UserSetupStep1;