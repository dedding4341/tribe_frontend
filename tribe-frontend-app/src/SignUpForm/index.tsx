import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUpForm.css';


const EC2_SIGNUP_URL = 'http://ec2-52-53-238-185.us-west-1.compute.amazonaws.com:5000/sign-up';
const LOCALHOST_SIGNUP_URL = 'http://127.0.0.1:8000/sign-up';

function SignUpForm() {
    const INITIAL_VALUES = { username: "", password: "", email: "" }
    const [formData, setFormData] = useState(INITIAL_VALUES);

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
    }


    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        fetch(LOCALHOST_SIGNUP_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json;"
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
    }

    return (
        <Form className="SignUpForm" onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control size="lg" placeholder="Username" name="username" value={formData.username} onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control size="lg" placeholder="Enter Email" name="email" type="email" value={formData.email} onChange={(evt) => handleChange(evt as any)} />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control size="lg" placeholder="Password" name="password" value={formData.password} type="password" onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Button type="submit">Register</Button>
        </Form>
    )
}

export default SignUpForm;