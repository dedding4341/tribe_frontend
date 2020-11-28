import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUpForm.css';


const EC2_SIGNUP_URL = 'http://ec2-52-53-238-185.us-west-1.compute.amazonaws.com:5000/sign-up';
const LOCALHOST_SIGNUP_URL = 'http://127.0.0.1:8000/sign-up';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


function SignUpForm() {
    const INITIAL_FORM_VALUES = { username: "", password: "", email: "", repeatPassword: ""}
    const [errors, setErrors] = useState({username: "", password: "", email: "", repeatPassword: ""})
    const [formData, setFormData] = useState(INITIAL_FORM_VALUES);

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
        let signUpErrors = errors;

        switch (name) {
            case 'username':
                signUpErrors.username = value.length < 5 ? 'Full Name must be 5 characters long!' : '';
                break;
            case 'password':
                signUpErrors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
                break;
            case 'email': 
                signUpErrors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
                break;
            case 'repeatPassword':
                signUpErrors.repeatPassword = value === formData.password ? '' : 'Does not match password';
                break;
            default:
                break;
        }

        setErrors(signUpErrors => ({ ...signUpErrors, [name]: value}));
        console.log(errors)
        

    }

    const validateForm = (errors: any) => {
        let valid = true;
        Object.values(errors).forEach(
          // if we have an error string set valid to false
            (val: any) => val.length > 0 && (valid = false)
        );
        return valid;
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

        if(validateForm(errors)) {
            console.log('valid Form')
        } else {
            console.log('Invalid Form')
        }
    }

    return (
        <Form className="SignUpForm" onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control size="lg" autoComplete="username" placeholder="Username" name="username" value={formData.username} onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control size="lg" placeholder="Enter Email" name="email" type="email" value={formData.email} onChange={(evt) => handleChange(evt as any)} />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control size="lg" autoComplete="current-password" placeholder="Password" name="password" value={formData.password} type="password" onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Form.Group controlId="formGroupRePassword">
                <Form.Control size="lg" autoComplete="current-password" placeholder="Re-type password" name="repeatPassword" value={formData.repeatPassword} type="password" onChange={(evt) => handleChange(evt as any)} />
            </Form.Group>
            <Button type="submit">Register</Button>
        </Form>
    )
}

export default SignUpForm;