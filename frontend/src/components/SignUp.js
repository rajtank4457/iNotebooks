import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    // const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const response = await fetch(
      `https://inotebook-6pk4.onrender.com/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirct
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  // eslint-disable-next-line
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center">
            <h5 className="card-title">Sign Up</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="name">Enter Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                onChange={onchange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
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
                minLength={5}
                onChange={onchange}
                name="password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                className="form-control"
                minLength={5}
                onChange={onchange}
                name="cpassword"
                required
              />
            </div>
            <div className="form-group text-center">
              <input type="submit" className="btn btn-primary" value="Sign Up" />
            </div>
            <div className="form-group">
              <p>Already have an account? <Link to="/Login">Log in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  
  );
};

export default SignUp;
