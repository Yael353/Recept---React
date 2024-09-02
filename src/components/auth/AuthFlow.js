//växling av konpontenter mellan Login och Regsiter
import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const AuthFlow = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  const handleRegister = () => {
    setShowLogin(true);
  };

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className='flex flex-col items-center'>
      {showLogin ? (
        <Login onLogin={handleLogin} toggleForm={() => setShowLogin(false)} />
      ) : (
        <Register onRegister={handleRegister} toggleForm={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default AuthFlow;
