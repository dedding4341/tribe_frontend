import React from 'react';
import { Card, Form } from 'react-bootstrap';

interface IProps {
  setHasFamilyId: any;
  next: Function;
  currentStep: number;
  prev: Function;
}

function UserSetupStep4({setHasFamilyId, next, currentStep, prev }: IProps) {
  const handleClick = (value: boolean) => {
    setHasFamilyId(value);
    next();
  }

  return (
    <div className="text-left">
      {currentStep === 4 &&
        <Form className="slide-in-bottom" onSubmit={(evt) => { 
          evt.preventDefault();
          next();
        }}>
          <Form.Group>
            <Form.Label>Do you have a Tribe code?</Form.Label>
            <div className="row no-gutters text-center">
              <Card style={{cursor: "pointer"}} onClick={() => handleClick(true)} className="UserSetUpForm-card slide-in-blurred-left shadow-sm col-3">
                <Card.Body>
                  Yes
                </Card.Body>
              </Card>
              <Card style={{cursor: "pointer"}} onClick={() => handleClick(false)} className="UserSetUpForm-card slide-in-blurred-right shadow-sm col-3">
                <Card.Body>
                  Nope
                </Card.Body>
              </Card>
            </div>
          </Form.Group>
        </Form>
      }
    </div>
  );
}

export default UserSetupStep4;