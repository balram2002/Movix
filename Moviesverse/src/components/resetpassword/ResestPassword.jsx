import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import movieposter from "../../assets/posterbannermovie.jpg";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import Img from "../../components/lazyLoadImage/Img";

export default function ResestPassword() {
    const emailRef = useRef()
    const [error, setError] = useState("")
    const [background, setBackground] = useState("");
    const { url } = useSelector((state) => state.home);
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { data, loading: load } = useFetch(`/trending/all/day`);

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        const bgg = url.backdrop ? bg : movieposter;
        setBackground(bgg);
    }, [data]);

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await sendPasswordResetEmail(auth, emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch (err) {
            setError("Failed to reset password")
            console.log(err)
        }

        setLoading(false)
    }

    return (
        <>
            <Img src={background} className="imgforgotreset" />
            <div className="resetforgotpage" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="forgotpassword09">
                    <div className="forgotpasswordcontainer">
                        <h1 className="resetforgotheading">Reset Password</h1>
                        {message && <h1 className="emailsendforgot"> Check Your Email For further instructions.</h1>}
                        {error && <h1 className="emailsendforgot">Failed to reset password.</h1>}
                        <label htmlFor="email" className="labelforgotpass">Email</label>
                        <input type="text" className="inputforgotreet" ref={emailRef} placeholder="Enter Your Email" required />
                        <button className="buttonforgotreset" onClick={(e) => handleSubmit(e)} type="submit">Reset Password</button>
                        <h5 onClick={() => navigate('/login')} className="h4forgotreset">Login</h5>
                    </div>
                    <h4 className="h4h5forgotreset">Need an account? <a href="" onClick={() => navigate('/login')}>Sign Up</a></h4>
                </div>
            </div>
        </>

    )
}
