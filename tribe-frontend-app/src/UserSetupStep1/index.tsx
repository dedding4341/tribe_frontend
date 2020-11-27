import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './UserSetupStep1.css';

interface IProps {
  handleChange: Function;
  next: Function;
  currentStep: Number;
  value: string;
}

function UserSetupStep1({ handleChange, next, currentStep, value }: IProps) {
  return (
    <div className="UserSetupStep1 col-12 ml-5 text-left">
      {currentStep === 1 &&
        <Form className="slide-in-bottom" onSubmit={(evt) => { 
          evt.preventDefault();
          next();
        }}>
          <Form.Group>
            <Form.Label>What's your first name?</Form.Label>
            <Form.Control autoFocus={true} id="input-box" name="firstName" value={value} onChange={(evt) => handleChange(evt as any)} />
          </Form.Group>
          <Button id="enter-btn" size="lg" onClick={() => next()}>Enter</Button>
        </Form>
      }
    </div>
  );
}

export default UserSetupStep1;