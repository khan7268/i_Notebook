import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        // console.log(json);

        if (json.success) {
            //Save the token and redirect to home page of note
            localStorage.setItem('token', json.authtoken);
            props.showAlert("", " Logged in Successfully!");
            navigate("/");

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
                    <i className="fa-solid fa-user fa-5x mt-3 mb-2"></i>
                </div>
                <div className="container my-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
                        </div>
                        <div className="d-flex justify-content-center align-items-center ">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                    </form>


                </div>

            </div>
        </div>


    )
}

export default Login;
