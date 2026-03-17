import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/AuthSevices';
import { useAuth } from '../context/AuthProvider';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);


    const response = await LoginService(formData);

    if (response.error) {
      console.error("Login failed:", response.error);
      setError(response.error);
    }
    else {
      loginAuth(response.user || response);
      navigate("/");

    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        {error && (
          <div style={{ color: '#721c24', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="admin@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
