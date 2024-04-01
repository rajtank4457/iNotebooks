import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const response = await fetch(`https://inotebook-6pk4.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirct
      localStorage.setItem("token", json.authtoken);

      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center">
            <h5 className="card-title">Login</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onchange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={credentials.password}
                onChange={onchange}
                name="password"
                required
              />
            </div>
            <div className="form-group text-center">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            <div className="form-group">
              <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  
  );
};

export default Login;
