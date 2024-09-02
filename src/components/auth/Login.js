import React, { useState } from 'react';

const Login = ({ onLogin, toggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    //localStorage 
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(user => user.username === username && user.password === password);

    //funktion för att logga in om användaren är giltig och finns
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin();
      alert('Du är nu inloggad');
    } else {
      alert('Oops! Ogiltigt användarnamn eller lösenord!');
    }
  };

  return (
    <div className='flex flex-col lg:flex-row justify-center gap-10 lg:justify-between items-center h-[80vh] lg:gap-20'>
      <div className='flex flex-col items-center lg:items-start gap-2 w-[400px] lg:w-[550px]'>
        <h1 className='text-2xl lg:text-4xl font-bold'>Välkommen till React--Recept</h1>
        <h3 className='text-2xl font-semibold italic'>Ett Recept App bygg av grupp: Nr6</h3>
        <p className='text-md text-center lg:text-xl lg:text-start italic'>Har du inget konto? klicka på "Go to Register knappen" för att sätta igång</p>
      </div>  
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 border rounded-xl w-[400px] lg:w-[500px] h-[400px]'>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <p className='italic text-xl font-medium'>Fyll i dina uppgifter</p>
        <label className='text-xl'>
          Username:
          <input
            className='border rounded-md px-2 ml-5 outline-none p-1'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className='text-xl'>
          Password:
          <input
            className='border rounded-md px-2 ml-6 outline-none p-1'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className='flex flex-col w-[360px] gap-4'>
            <button 
            className='bg-blue-400 w-full p-2 rounded-md text-white'
            type="submit"
            >
            Login
            </button>
            <button
                className='bg-slate-600 text-white p-2 w-full rounded-md'
                onClick={toggleForm}
            >
                Go to Register
            </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
