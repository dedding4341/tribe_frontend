import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import './SignUpForm.css';
import { BASE_URL } from '../config';


const EC2_SIGNUP_URL = 'https://api.tribeapp.family/sign-up';
const LOCALHOST_SIGNUP_URL = 'http://localhost:8000/sign-up';

function validatePassword(password: String, confirmPassword: String) : Boolean {
    // Validate length
    if (password.length < 8 || password.length > 20) {
        return false;
    }

    // Check for alphanumeric
    let containsAlpha = false;
    let containsNumeric = false;
    for (let idx = 0; idx < password.length; idx++) {
        if (!containsAlpha && (/[a-zA-Z]/).test(password.charAt(idx))) {
            containsAlpha = true;
        }

        if (!containsNumeric && (/\d/).test(password.charAt(idx))) {
            containsNumeric = true;
        }
    }

    if (!containsNumeric || !containsAlpha) {
        return false;
    }

    // Confirm that password + confirmPassword are the same
    if (password !== confirmPassword) {
        return false;
    }

    return true;
}

function validateUsername(username: String) {
    if (username.length >= 5 && username.length <= 10) {
        return true;
    }
    return false;
}


function SignUpForm() {
    const INITIAL_FORM_VALUES = { username: "", password: "", email: "", repeatPassword: ""}
    const [formData, setFormData] = useState(INITIAL_FORM_VALUES);
    const [validated, setValidated] = useState(false);
    const [errorMessageModalShow, setErrorMessageModalShow] = React.useState(false);
    const [existingUserModal, setExistingUserModal] = React.useState(false);
    const [existingEmailModal, setExistingEmailModal] = React.useState(false);
    const [checkEmailModal, setCheckEmailModal] = React.useState(false);
    

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
    }

    const WhatsWrong = () => {
        let msgs = [];
        let rg = /\S+@\S+\.\S+/;
        let rgTwo = /\d+/g;
        
        if (!validateUsername(formData.username)){
            msgs.push("Username must be at least 5 characters long.")
        }
        
        if(!rg.test(formData.email)){
            msgs.push("Invalid email")
        }
        
        if(rgTwo.test(formData.password) === false) {
            msgs.push("Password must have a number.")
        }

        if(formData.password.length <= 7) {
            msgs.push("Password must be at least 8 characters long.")
        }
        if(formData.repeatPassword !== formData.password) {
            msgs.push("Password and repeat password do not match.")
        }
       
        console.log(msgs)
        return (
            msgs.map(msg => <ListGroup.Item>{msg}</ListGroup.Item> )
        )
    }


    function ErrorMessage(props: any) {
        return(
            <Modal
            {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <ListGroup>
                        {WhatsWrong()}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function UserNameAlreadyExists(props: any) {
        return(
            <Modal
            {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>Username already exists</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function EmailAlreadyExists(props: any) {
        return(
            <Modal
            {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>Email already in use</h4>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function GoCheckEmail(props: any) {
        return(
            <Modal
            {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>Congratulations you're almost ready to start tribing! Please go check your email to verify your account.</h4>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        let retcode: number;

        if (!validateUsername(formData.username)) {
            // Display error for username & early terminate
            if(validated === true) {
                setValidated(false)
            }
            // alert("Something is wrong with your username, check the requirements and try again!")
            setErrorMessageModalShow(true);
        }

        if (!validatePassword(formData.password, formData.repeatPassword)) {
            //Display error for password & early terminate
            if(validated === true) {
                setValidated(false)
            }
            // alert("Something is wrong with your password, check the requirements and try again!")
            setErrorMessageModalShow(true)
        }

        if(!/\S+@\S+\.\S+/.test(formData.email)){
            if(validated === true) {
                setValidated(false)
            }
            setErrorMessageModalShow(true)
        }

        if(validatePassword(formData.password, formData.repeatPassword) && validateUsername(formData.username) && /\S+@\S+\.\S+/.test(formData.email)){
        // If both checks pass - execute fetch
        // TODO: What should happen when you recieve a 401 instead of a 200 back from the API? (This error means that the username/email utilized has already been used by another user)
            fetch(LOCALHOST_SIGNUP_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json;"
                }
            })
            .then(res => {
                if(res.status == 409) {
                    retcode = 409
                } else {
                    retcode = 200
                }
                return res.json();
            })
            .then(json => {
                if( retcode === 409) {
                    if (json.msg === "Username already exists") {
                        setExistingUserModal(true);
                    } else if (json.msg === "Email already in use"){
                        setExistingEmailModal(true);
                    }
                } else if (retcode === 200) {
                    setCheckEmailModal(true)
                }
            })
        }

        const form = evt.currentTarget as any;
        if (form.checkValidity() === false) {
            evt.preventDefault();
        }
        setValidated(true);
    }

    return (
        <div>
            <Form noValidate validated={validated} className="SignUpForm" onSubmit={handleSubmit}>
                <Form.Group  controlId="formGroupUsername" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control required size="lg" pattern=".{5,10}" autoComplete="username" placeholder="Username" type="username" name="username" value={formData.username} onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>
                <Form.Text id="userNameHelpBlock" muted>
                    Your username must be 5-10 characters long.
                </Form.Text>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required size="lg" placeholder="Enter Email" name="email" type="email" value={formData.email} onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required size="lg" pattern="^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,20}$" autoComplete="current-password" placeholder="Password" name="password" value={formData.password} type="password" onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>
                <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers, and
                    must not contain spaces, special characters, or emoji.
                </Form.Text>
                <Form.Group controlId="formGroupRePassword">
                    <Form.Control required size="lg" pattern={formData.password} autoComplete="current-password" placeholder="Re-type password" name="repeatPassword" value={formData.repeatPassword} type="password" onChange={(evt) => handleChange(evt as any)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ErrorMessage
                show={errorMessageModalShow}
                onHide={() => setErrorMessageModalShow(false)}
            />
            <UserNameAlreadyExists
                show={existingUserModal}
                onHide={() => setExistingUserModal(false)}
            />
            <EmailAlreadyExists
                show={existingEmailModal}
                onHide={() => setExistingEmailModal(false)}
            />
            <GoCheckEmail
                show={checkEmailModal}
                onHide ={() => setCheckEmailModal(false)}
            />
        </div>
    )
}

export default SignUpForm;