import React from 'react';
import { Button, Form } from 'react-bootstrap';

interface IProps {
  handleChange: Function;
  value: string;
  next: Function;
  prev: Function;
  currentStep: Number;
}

function UserSetupStep2({ value, handleChange, next, prev, currentStep}: IProps) {
  return (
    <div className="col-12 ml-5 text-left">
      {currentStep === 2 &&
        <Form className="slide-in-bottom" onSubmit={(evt) => { 
          evt.preventDefault();
          next();
        }}>
          <Form.Group>
            <Form.Label>What's your last name?</Form.Label>
            <Form.Control autoFocus={true} id="input-box" name="lastName" value={value} onChange={(evt) => handleChange(evt as any)}/>
          </Form.Group>
          <Button id="enter-btn" onClick={() => next()}>Enter</Button>
        </Form>
      }
    </div>
  );
}

export default UserSetupStep2;