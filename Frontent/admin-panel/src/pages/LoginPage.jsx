// src/pages/LoginPage.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const user = { name: 'John Doe', role };
    dispatch(loginSuccess(user));

    if (role === 'admin') navigate('/admin-dashboard');
    else if (role === 'vendor') navigate('/vendor-dashboard');
    else navigate('/user-dashboard');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => handleLogin('admin')}>Login as Admin</button>
      <button onClick={() => handleLogin('vendor')}>Login as Vendor</button>
      <button onClick={() => handleLogin('user')}>Login as User</button>
    </div>
  );
};

export default LoginPage;
