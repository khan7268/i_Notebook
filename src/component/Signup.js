import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      //Save the token and redirect to home page of note
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("", "Account Created Successfully!");
    }
    else {
      props.showAlert("Error:", " Invalid credentials !!!");
    }

  }
  const onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className="d-flex justify-content-center align-items-center ">

      <div className="card mx-3 my-4" style={{ width: "38rem" }}>
        <div className=" d-flex justify-content-center align-items-center">
          <i className="fa-regular fa-user fa-5x mt-3 mb-2"></i>
        </div>
        <div className="container my-4 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
            </div>
            <div className="d-flex justify-content-center align-items-center ">
              <button type="submit" className="btn btn-primary ">Sign-up</button>
            </div>

          </form>

        </div>


      </div>
    </div>

  )
}

export default Signup
