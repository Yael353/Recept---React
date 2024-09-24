import React, { useState } from "react";

const Login = ({ onLogin, toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (user) => user.username === username && user.password === password
    );

    //funktion för att logga in om användaren är giltig och finns
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin();
     // alert("You are now logged in!");
    } else {
      //alert("Oops! Invalid username or password!");
      setLoginError("Oops! Invalid username or password!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-10 lg:justify-between h-screen items-center lg:gap-20">
      <div className="flex flex-col items-center lg:items-start gap-2 w-[400px] lg:w-[550px]">
        <h1 className="text-2xl lg:text-4xl font-bold">
          Welcome to React-Recipes
        </h1>
        <h3 className="text-2xl font-semibold italic">
          A Recipe App built by group Nr6
        </h3>
        <p className="text-md text-center lg:text-xl lg:text-start italic">
          Don't have an account? Click the "Go to Register button" to get
          started.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-lg items-center justify-center gap-4 border rounded-xl w-[400px] lg:w-[500px] h-[400px]"
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="italic text-xl font-medium">Fill in your details</p>
        <label className="text-xl">
          Username:
          <input
            className="border rounded-md px-2 ml-5 outline-none p-1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="text-xl">
          Password:
          <input
            className="border rounded-md px-2 ml-6 outline-none p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="flex flex-col w-[360px] gap-4">
          <button
            className="bg-blue-400 w-full p-2 rounded-md text-white"
            type="submit"
          >
            Login
          </button>
          {loginError && <p className="text-red-600 text-[16px]">{loginError}</p>}
          <button
            className="bg-slate-600 text-white p-2 w-full rounded-md"
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
