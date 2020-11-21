import React from 'react';
import LoginForm from '../LoginForm';
import SignUp from '../Signup';
import './Login.css';

function Login() {
    return (
        <div className="Login">
            Login
            <LoginForm /><br />
            Signup
            <SignUp />
        </div>
    )
}

export default Login;