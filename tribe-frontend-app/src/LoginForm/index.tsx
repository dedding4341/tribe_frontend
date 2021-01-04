import React, { useContext, useState } from 'react';
import './LoginForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { BASE_URL } from '../config';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actionCreators';

function UserNameNotRecognized(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Username is not recognized</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function EmailNotRecognized(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Email is not recognized</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function PasswordIncorrect(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Password is incorrect</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function UserNotVerified(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Your account is not verified, please check your email for next steps</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }



/**
 * LoginForm renders a controlled form for login information.
 */
function LoginForm() {
    const INITIAL_VALUES = { userIdentification: "", username: "", password: "", email: "" }
    const [formData, setFormData] = useState(INITIAL_VALUES);

    const [userNameNotRecognizedModalShow, setUserNameNotRecognizedModalShow] = React.useState(false);
    const [passwordIncorrectModalShow, setPasswordIncorrectModalShow] = React.useState(false);
    const [userNotVerifiedModalShow, setUserNotVerifiedModalShow] = React.useState(false);
    const [emailNotRecognizedModalShow, setEmailNotRecognizedModalShow] = React.useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        let retcode: number;
        let data;

        if (!formData.userIdentification.includes('@')) {
            data = {username: formData.userIdentification, password: formData.password}

        } else {
            data = {email: formData.userIdentification, password: formData.password}
        }

        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }, 
            credentials: "include"
        })
        .then(res => {
            if (res.status === 401) {
                retcode = 401
            } else {
                retcode = 200
            }
            return res.json();
        })
        .then(json => {
            if (retcode === 401) {
                if (json.msg === "Username is not recognized as a registered user") {
                    setUserNameNotRecognizedModalShow(true);
                } else if (json.msg === "Password is incorrect") {
                    setPasswordIncorrectModalShow(true);
                } else if (json.msg === "User has not completed verification process") {
                    setUserNotVerifiedModalShow(true);
                } else if (json.msg === "Email is not recognized as a registered user") {
                    setEmailNotRecognizedModalShow(true);
                }

            } else if (retcode === 200) {
              const famId = json.user.family_id;
              dispatch(loginUser(json.user));
              if (famId) {
                history.push(`/tribe/overview`);
              } else {
                history.push("/users/welcome");
              }
            }
        });
    }

    return (
        <div>
            <Form className="LoginForm" onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username/Email</Form.Label>
                    <Form.Control required size="lg" placeholder="Username/Email" name="userIdentification" value={formData.userIdentification} onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required size="lg" placeholder="Password" name="password" value={formData.password} type="password" onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>
                <Button type="submit">Login</Button> 
            </Form>
            <UserNameNotRecognized
                show={userNameNotRecognizedModalShow}
                onHide={() => setUserNameNotRecognizedModalShow(false)}
            />
            <PasswordIncorrect
                show={passwordIncorrectModalShow}
                onHide={() => setPasswordIncorrectModalShow(false)}
            />
            <UserNotVerified
                show={userNotVerifiedModalShow}
                onHide={() => setUserNotVerifiedModalShow(false)}
            />
            <EmailNotRecognized
                show={emailNotRecognizedModalShow}
                onHide={() => setEmailNotRecognizedModalShow(false)}
            />
        </div>
        
    )
}

export default LoginForm;