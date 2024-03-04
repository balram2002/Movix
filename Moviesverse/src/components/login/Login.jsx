import React from 'react'
import { FaUserTie } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";



import './login.css';



function Login() {
    return (
        <div className="auth">
            <div ClassName="wrapper">
                <span className="bg-animate"></span>
                <div className="form-box login">
                    <h2>Login</h2>
                    <form action="">
                        <div className="input-box">
                            <input type="text" required />
                            <label>Username</label>
                            <FaUserTie className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" required />
                            <label>Password</label>
                            <FaLock className='icon' />
                        </div>
                        <button className="btn" type='submit'>Login</button>
                        <div className="logreg-link">
                            <p>Don't have an account? <a href="" className="register-link">Sign Up</a></p>
                        </div>
                    </form>
                </div>
                <div className="info-text login">
                    <h2>Welcome Back!</h2>
                    <p>Create An account for Discover and Explore millions of movies and TV Shows.</p>
                </div>

            </div>
        </div>
    )
}

export default Login