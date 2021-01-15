import React, { useState } from 'react';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import './Login.css';
import Form from 'react-bootstrap/Form';

function Login() {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className="Login container-fluid align-items-center justify-content-center d-flex">
            <div className="Login-bg row shadow-lg bg-white rounded">
                {/* <section className="Login-img-container col-7">
                    <img className="img-responsive" src="" alt=""></img>
                </section> */}
                <section className="Login-forms-container col-5">
                    <header>
                        <img src="https://i.imgur.com/UCP0fq6.jpg" alt="tribe"></img>
                        <h1>{showSignUp ? "Let's Get Started!" : "Welcome back!"}</h1>
                        <div className="d-flex align-items-center justify-content-center">
                            <p className="Login-toggle-label mt-4">{showSignUp ? "Already have an account" : "Not registered"}?</p>
                            <Form.Check
                                id="switchEnabled"
                                type="switch"
                                className="custom-switch-lg"
                                checked={showSignUp}
                                onChange={() => setShowSignUp(!showSignUp)}
                            ></Form.Check>
                        </div>
                    </header>
                    {showSignUp ? <SignUpForm /> : <LoginForm />}
                </section>
            </div>
        </div>
    )
}

export default Login;