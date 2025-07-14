import React, { useState } from 'react'
import { FaUserTie } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import logbg from "../../../public/logbg.jpg";
import { UserAuth } from '../../context/AuthContext';

import { Helmet } from 'react-helmet';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Authentication() {

    const { signUp, logIn } = UserAuth()
    const navigate = useNavigate();

    const [emailr, setEmailr] = useState('');
    const [passwordr, setPasswordr] = useState('');
    const [userRegistering, setUserRegistering] = useState("Sign Up");
    const [userRegistered, setUserRegistered] = useState("Welcome Back!");
    const [userRegistered2, setUserRegistered2] = useState("Create An account for Discover and Explore millions of movies and TV Shows.");

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        try {
            setUserRegistering("Creating Account...");
            await signUp(emailr, passwordr);
            setUserRegistering("Sign Up");
            setUserRegistered("Account Created Successfully!");
            toast.success("Account Created Successfully!");
            setUserRegistered2("Now, Click on login to login to your account and enjoy our services.");
        }
        catch (error) {
            setUserRegistered("Account already exists!");
            toast.warn("Looks like user already exists!");
            setUserRegistered2("Create Account with different email, because this account already exists in our system.");
            console.log(error)
            setUserRegistering("Sign Up");
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongColor, setWrongColor] = useState("white");
    const [userLoging, setUserLoging] = useState("Login");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userWrongPass, setUserWrongPass] = useState("Welcome Back!");
    const [userWrongPass2, setUserWrongPass2] = useState("Login Into your account and Discover and Explore millions of movies and TV Shows.");

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            setUserLoging("Loging in...");
            await logIn(email, password);
            setLoggedIn(true);
            setUserLoging("Login");
            navigate('/');
        }
        catch (error) {
            setWrongColor("red");
            console.log(error)
            setUserLoging("Login");
            toast.error("Incorrect password");
            setUserWrongPass("Incorrect Password")
            setLoggedIn(false);
            setUserWrongPass2("Try Entering Right password again and then, login. Enjoy!")
        }
    }

    const [Wrapper, setWrapper] = useState(false);

    return (
        <div className="auth">
             <Helmet>
                            <title>{`${Wrapper ? 'SignUp' : 'Login'} | Welcome to Movix`}</title>
                            <meta name="description" content="Discover and stream your favorite Movies and TV Shows with our powerful MERN stack app using TMDB API. Features include Firebase authentication, dynamic recommendations, search and explore pages, global state with Redux, Watchlist/Likes, and seamless content streaming with full error handling." />
                        </Helmet>
            <img className="logbg" src={logbg} alt="" />
            <div id="authwrapperbd" className={`${Wrapper ? "active" : ""}`}>
                <span className="bg-animate"></span>
                <span className="bg-animate2"></span>
                <div className="auth-form-box login">
                    <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>Login</h2>
                    <form
                        onSubmit={handleLoginSubmit}
                    >
                        <div className="auth-input-box animation" style={{ "--i": 1, "--j": 22 }}>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} required />
                            <label>Email</label>
                            <MdEmail className='icon' />
                        </div>
                        <div className="auth-input-box animation" style={{ "--i": 2, "--j": 23 }}>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                            <label>Password</label>
                            <FaLock className='icon' />
                            {userWrongPass === "Incorrect Password" && <span onClick={() => navigate('/forgot-password')} className='forgotclickspan'>forgot password?</span>}
                        </div>
                        <button className="btn animation" style={{ "--i": 3, "--j": 24 }} type='submit'>{userLoging}</button>
                        <div className="logreg-link animation" style={{ "--i": 4, "--j": 25 }}>
                            <p>Don't have an account? <a href="" className="register-link" onClick={(e) => {
                                setWrapper(true);
                                e.preventDefault();
                            }}>Sign Up</a></p>
                        </div>
                    </form>
                </div>
                <div className="auth-info-text login">
                    <h2 className="animation" style={{ "--i": 0, "--j": 20, color: `${wrongColor}` }}>{userWrongPass}</h2>
                    <p className="animation" style={{ "--i": 1, "--j": 21 }}>{userWrongPass2}</p>
                </div>

                <div className="auth-form-box register">
                    <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>Sign Up</h2>
                    <form
                        onSubmit={handleRegisterSubmit}
                    >
                        {/* <div className="auth-input-box animation" style={{ "--i": 18, "--j": 1 }}>
                            <input type="text" onChange={(e) => setUsernamer(e.target.value)} required />
                            <label>Username</label>
                            <FaUserTie className='icon' />
                        </div> */}
                        <div className="auth-input-box animation" style={{ "--i": 19, "--j": 2 }}>
                            <input type="text" onChange={(e) => setEmailr(e.target.value)} required />
                            <label>Email</label>
                            <MdEmail className='icon' />
                        </div>
                        <div className="auth-input-box animation" style={{ "--i": 20, "--j": 3 }}>
                            <input type="password" onChange={(e) => setPasswordr(e.target.value)} required />
                            <label>Password</label>
                            <FaLock className='icon' />
                        </div>
                        <button className="btn animation" style={{ "--i": 21, "--j": 4 }} type='submit'>{userRegistering}</button>
                        <div className="logreg-link animation" style={{ "--i": 22, "--j": 5 }}>
                            <p>Already have an account? <a href="" className="login-link" onClick={(e) => {
                                setWrapper(false);
                                e.preventDefault();
                            }}>Login</a></p>
                        </div>
                    </form>
                </div>
                <div className="auth-info-text register">
                    <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>{userRegistered}</h2>
                    <p className="animation" style={{ "--i": 18, "--j": 1 }}>{userRegistered2}</p>
                </div>

            </div>
        </div>
    )
}

export default Authentication

