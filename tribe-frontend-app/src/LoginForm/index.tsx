import React, { useState } from 'react';
import './LoginForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const EC2_LOGIN_URL = 'http://ec2-52-53-238-185.us-west-1.compute.amazonaws.com:5000/login';
const LOCALHOST_LOGIN_URL = 'http://127.0.0.1:8000/login';

/**
 * LoginForm renders a controlled form for login information.
 */
function LoginForm() {
    const INITIAL_VALUES = { username: "", password: "" }
    const [formData, setFormData] = useState(INITIAL_VALUES);

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        console.log("submitting", formData);
        fetch(LOCALHOST_LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json;"
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    }

    return (
        <Form className="LoginForm" onSubmit={handleSubmit}>
             <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control size="lg" placeholder="Username" name="username" value={formData.username} onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control size="lg" placeholder="Password" name="password" value={formData.password} type="password" onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Button type="submit">Login</Button>
        </Form>
    )
}

export default LoginForm;