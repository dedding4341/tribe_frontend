import React from 'react';
import { Card, Form } from 'react-bootstrap';

interface IProps {
  setHasFamilyId: any;
  next: Function;
  currentStep: Number;
}

function UserSetupStep4({setHasFamilyId, next, currentStep }: IProps) {
  const handleClick = (value: boolean) => {
    setHasFamilyId(value);
    next();
  }

  return (
    <div className="col-12 ml-5 text-left">
      {currentStep === 4 &&
        <Form className="slide-in-bottom" onSubmit={(evt) => { 
          evt.preventDefault();
          next();
        }}>
          <Form.Group>
            <Form.Label>Do you have a Tribe code?</Form.Label>
            <div className="row">
              <Card style={{cursor: "pointer"}} onClick={() => handleClick(true)} className="col-3">
                <Card.Body>
                  Yes
                </Card.Body>
              </Card>
              <Card style={{cursor: "pointer"}} onClick={() => handleClick(false)} className="col-3">
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