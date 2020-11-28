import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUpForm.css';


const EC2_SIGNUP_URL = 'http://ec2-52-53-238-185.us-west-1.compute.amazonaws.com:5000/sign-up';
const LOCALHOST_SIGNUP_URL = 'http://127.0.0.1:8000/sign-up';


function SignUpForm() {
    const INITIAL_FORM_VALUES = { username: "", password: "", email: "", repeatPassword: ""}
    const [formData, setFormData] = useState(INITIAL_FORM_VALUES);

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        if (formData.password === formData.repeatPassword && formData.username.length > 5 && formData.password.length > 8 ) {
            fetch(LOCALHOST_SIGNUP_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json;"
                }
            })
                .then(res => res.json())
                .then(json => console.log(json))
        } else {
            alert("Invaild Form")
        }
        console.log(formData)
    }

    return (
        <Form className="SignUpForm" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" size="lg" name="username"placeholder="Enter Username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label className="SignUpFormlabel">Email address</Form.Label>
                <Form.Control type="email" size="lg" name="email"placeholder="Enter Email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" size="lg" name="password"placeholder="Enter Password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" size="lg" name="repeatPassword"placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default SignUpForm;