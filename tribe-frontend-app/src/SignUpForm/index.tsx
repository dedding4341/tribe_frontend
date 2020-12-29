import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUpForm.css';


const EC2_SIGNUP_URL = 'http://ec2-52-53-238-185.us-west-1.compute.amazonaws.com:5000/sign-up';
const LOCALHOST_SIGNUP_URL = 'http://127.0.0.1:8000/sign-up';

function SignUpForm() {
    const INITIAL_FORM_VALUES = { username: "", password: "", email: "", repeatPassword: "" }
    const [formData, setFormData] = useState(INITIAL_FORM_VALUES);
    const [validated, setValidated] = useState(false);

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));

    }


    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        // if (formData.password === formData.repeatPassword) {
        //     fetch(LOCALHOST_SIGNUP_URL, {
        //         method: 'POST',
        //         body: JSON.stringify(formData),
        //         headers: {
        //             "Content-type": "application/json;"
        //         }
        //     })
        //         .then(res => res.json())
        //         .then(json => console.log(json))
        // } else {
        //     alert("Passwords do not match!")
        // }

        const form = evt.currentTarget as any;
        if (form.checkValidity() === false) {
            evt.preventDefault();
            evt.stopPropagation();
            console.log(validated)
        }
        console.log(validated)
        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} className="SignUpForm" onSubmit={handleSubmit}>
            <Form.Group  controlId="formGroupUsername" >
                <Form.Label>Username</Form.Label>
                <Form.Control required size="lg" pattern=".{5,10}" autoComplete="username" placeholder="Username" type="username" name="username" value={formData.username} onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required size="lg" placeholder="Enter Email" name="email" type="email" value={formData.email} onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required size="lg" pattern=".{8,20}"autoComplete="current-password" placeholder="Password" name="password" value={formData.password} type="password" onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers, and
                must not contain spaces, special characters, or emoji.
            </Form.Text>
            <Form.Group controlId="formGroupRePassword">
                <Form.Control required size="lg" pattern=".{password}"autoComplete="current-password" placeholder="Re-type password" name="repeatPassword" value={formData.repeatPassword} type="password" onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Button type="submit">Register</Button>
        </Form>
    )
}

export default SignUpForm;