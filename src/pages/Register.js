import React, { useState } from "react";

const Register = ({ onRegister, toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // setRegisterError("");
    // setPasswordError("");
    // setUserNameError("");

    //validation
    if (!username || !password) {
      setUserNameError("Fill in username");
      setPasswordError("Fill in password");

      return;
    }

    if (!username) {
      setUserNameError("Fill in username");
      setRegisterError("");
      setPasswordError("");
    } 

    if (!password) {
      setPasswordError("Fill in password");
      setRegisterError("");
      setUserNameError("");
    } 

    //check if user exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.find((user) => user.username === username)) {
      //alert("The specified account already exists.");
      setRegisterError("The specified account already exists.");
      return;
    }

    //add new user
    const newUser = { username, password };
    setRegisterError("");
    setPasswordError("");
    setUserNameError("");
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    //alert("Your account has been created.");
    if (onRegister) onRegister();
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:justify-between lg:gap-20 h-screen">
      <div>
        <h1 className="text-3xl text-center lg:text-start font-bold">
          Register your account
        </h1>
        <h3 className="text-lg lg:text-xl text-center lg:text-start mt-4 italic">
          Here you can register for free and with 3 simple steps
        </h3>
        <p></p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 border rounded-xl w-[400px] lg:w-[500px] h-[400px]"
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-xl italic font-bold">
          This is a simple form, fill in all fields.
        </p>
        <div className="flex flex-col items-center">
          <label className="text-xl">
            Username:
            <input
              className="border rounded-md px-2 ml-5 outline-none p-1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {userNameError && (
            <p className="text-red-600 text-[16px]">{userNameError}</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xl">
            Password:
            <input
              className="border rounded-md px-2 ml-6 outline-none p-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {passwordError && (
            <p className="text-red-600 text-[16px]">{passwordError}</p>
          )}
        </div>

        <div className="flex flex-col w-[360px] gap-2">
          <button
            className="bg-blue-400 w-full p-2 rounded-md text-white"
            type="submit"
          >
            Register
          </button>
          {registerError && (
            <p className="text-red-600 text-[16px]">{registerError}</p>
          )}
          <button
            className="bg-slate-500 w-full p-2 rounded-md text-white"
            onClick={toggleForm}
          >
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
