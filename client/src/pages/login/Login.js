import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import("./Login.css");
function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const {loading, error, dispatch} = useContext(AuthContext);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("/auth/login", credentials);
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data.details});
        navigate("/")
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <input type="text" placeholder="Username" id="username" onChange={handleChange} className="lInput" />
        <input type="password" placeholder="Password" id="password" onChange={handleChange} className="lInput" />
        <button disabled={loading} className="lBtn" onClick={handleClick}>
          Login
        </button>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default Login;
