import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUpForm.css';


const EC2_SIGNUP_URL = 'https://api.tribeapp.family/sign-up';
const LOCALHOST_SIGNUP_URL = 'http://127.0.0.1:8000/sign-up';

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

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        if (!validateUsername(formData.username)) {
            // Display error for username & early terminate
            if(validated === true) {
                setValidated(false)
            }
            alert("Something is wrong with your username, check the requirements and try again!")
        }

        if (!validatePassword(formData.password, formData.repeatPassword)) {
            //Display error for password & early terminate
            if(validated === true) {
                setValidated(false)
            }
            alert("Something is wrong with your password, check the requirements and try again!")
        }

        // If both checks pass - execute fetch
        // TODO: What should happen when you recieve a 401 instead of a 200 back from the API? (This error means that the username/email utilized has already been used by another user)
        // fetch(EC2_SIGNUP_URL, {
        //     method: 'POST',
        //     body: JSON.stringify(formData),
        //     headers: {
        //         "Content-type": "application/json;"
        //     }
        // })
        // .then(res => res.json())
        // .then(json => console.log(json))

        const form = evt.currentTarget as any;
        if (form.checkValidity() === false) {
            evt.preventDefault();
        }
        setValidated(true);
    }

    return (
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
    )
}

export default SignUpForm;