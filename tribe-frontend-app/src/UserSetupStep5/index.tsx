import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './UserSetupStep5.css';

interface IProps {
  handleChange: Function;
  handleSubmit: Function;
  next: Function;
  prev: Function;
  famIdValue: any;
  famNameValue: string;
  hasFamilyId: boolean;
  currentStep: Number;
  isParent: boolean;
}

function UserSetupStep5({ isParent, famIdValue, famNameValue, hasFamilyId, handleChange, handleSubmit, prev, currentStep }: IProps) {
  return (
    <div className="col-12 ml-5 text-left">
      {currentStep === 5 &&
        <div className="slide-in-bottom">
          <Form className="slide-in-bottom" onSubmit={(evt) => handleSubmit(evt as any)}>
            {hasFamilyId ?
              <>
                <Form.Group>
                  <Form.Label>Enter your Tribe's invite! ^_^</Form.Label>
                  <Form.Control autoFocus={true} name="family_code" value={famIdValue} onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>
                <Button id="enter" type="submit">Submit</Button>
              </>
              :
              isParent ?
                <>
                  <Form.Group>
                    <Form.Label>Create your Tribe's name! ^_^</Form.Label>
                    <Form.Control autoFocus={true} name="family_name" value={famNameValue} onChange={(evt) => handleChange(evt as any)} />
                  </Form.Group>
                  <Button id="enter" type="submit">Submit</Button>
                </>
                :
                <div className="UserSetUpStep5-no-code">Please ask your Tribe leader for an invite code!</div>
            }
            <Button className="UserSetupStep5-back-btn " onClick={() => prev()}>Back</Button>
          </Form>
        </div>
      }
    </div>
  );
}

export default UserSetupStep5;