import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './UserSetupStep3.css';

interface IProps {
  value: boolean;
  next: Function;
  prev: Function;
  currentStep: Number;
  handleIsParentChange: Function;
}

function UserSetupStep3({ value, handleIsParentChange, next, prev, currentStep }: IProps) {
  return (
    <div>
      {currentStep === 3 &&
        <Form onSubmit={(evt) => { 
          evt.preventDefault();
          next();
        }}>
          <Form.Group>
            <Form.Label className="slide-in-bottom row">Are you a parent or a child?</Form.Label>
            <div className="row">
              <Card style={{cursor: "pointer"}} className="UserSetUpForm-card slide-in-blurred-left col-3 shadow-sm" onClick={() => handleIsParentChange(true)}>
                <Card.Body>
                  I'm a Parent!
                </Card.Body>
              </Card>
              <Card style={{cursor: "pointer"}} className="UserSetUpForm-card slide-in-blurred-right col-3 shadow-sm" onClick={() => handleIsParentChange(false)}>
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