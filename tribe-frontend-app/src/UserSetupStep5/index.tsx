import React from 'react';
import { Button, Form } from 'react-bootstrap';

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
    <div>
      {currentStep === 5 &&
        <>
          <Form onSubmit={(evt) => handleSubmit(evt as any)}>
            {hasFamilyId ?
              <>
                <Form.Group>
                  <Form.Label>Enter your Tribe's invite! ^_^</Form.Label>
                  <Form.Control name="familyId" value={famIdValue} onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>
                <Button id="enter" type="submit">Submit</Button>
              </>
              :
              isParent ?
                <>
                  <Form.Group>
                    <Form.Label>Create your Tribe's name! ^_^</Form.Label>
                    <Form.Control name="familyName" value={famNameValue} onChange={(evt) => handleChange(evt as any)} />
                  </Form.Group>
                  <Button id="enter" type="submit">Submit</Button>
                </>
                :
                <div>Please ask your Tribe leader for an invite code!</div>
            }
          </Form>
          <Button onClick={() => prev()}>Back</Button>
        </>
      }
    </div>
  );
}

export default UserSetupStep5;