import React, { useState } from 'react';


function SignUpForm() {
    const INITIAL_VALUES = { username: "", password: "" }
    const [formData, setFormData] = useState(INITIAL_VALUES);

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData(currData => ({ ...currData, [name]: value }));
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        fetch('http://ec2-52-53-238-185.us-west-1.compute.amazonaws.com:5000/sign-up', {
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
        <form className="LoginForm" onSubmit={handleSubmit}>
            <input placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            <input placeholder="Password" name="password" value={formData.password} type="Password" onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpForm