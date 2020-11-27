import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

interface IProps {
  value: boolean;
  next: Function;
  prev: Function;
  currentStep: Number;
  handleSubmit: Function;
  handleIsParentChange: Function;
}

function UserSetupStep3({ value, handleSubmit, handleIsParentChange, next, prev, currentStep }: IProps) {
  return (
    <div>
      {currentStep === 3 &&
        <Form className="slide-in-bottom" onSubmit={(evt) => { 
          evt.preventDefault();
          next();
        }}>
          <Form.Group>
            <Form.Label className="row">Are you a parent or a child?</Form.Label>
            <div className="row">
              <Card style={{cursor: "pointer"}} onClick={() => handleIsParentChange(true)} className="col-3">
                <Card.Body>
                  I'm a Parent!
                </Card.Body>
              </Card>
              <Card style={{cursor: "pointer"}} onClick={() => handleIsParentChange(false)} className="col-3">
                <Card.Body>
                  I'm a Child!
                </Card.Body>
              </Card>
            </div>
          </Form.Group>
        </Form>
      }
    </div>
  );
}

export default UserSetupStep3;