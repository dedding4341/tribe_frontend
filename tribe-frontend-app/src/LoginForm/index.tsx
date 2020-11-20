import React, { useState } from 'react';
import './LoginForm.css';

/**
 * LoginForm renders a controlled form for login information.
 */
function LoginForm() {
  const INITIAL_VALUES = { username: "", password: "" }
  const [formData, setFormData] = useState(INITIAL_VALUES);

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
  }

  const handleSubmit = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log("submitting", formData);
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <input placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
      <input placeholder="Password" name="password" value={formData.password} type="Password" onChange={handleChange} />
      <button>Login</button>
    </form>
  )
}

export default LoginForm;