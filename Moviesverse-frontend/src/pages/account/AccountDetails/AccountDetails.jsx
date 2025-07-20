import React, { useState, useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { UserAuth } from "../../../context/AuthContext";
import Axios from "axios";

import "./AccountDetails.css";

const AccountDetails = () => {

    const [get, setGet] = useState(false);
    const [came, setCame] = useState("Load Details");
    const [details, setDetails] = useState({});
    const [load, setLoad] = useState(false);

    const { user } = UserAuth();
    const emailuser = user?.email;
    const [userProfile, setUserProfile] = useState(false)
    const [currentUser, setCurrentUser] = useState(false);
    //   const [isUserUpdated, setisUserUpdated] = useState(false);

    useEffect(() => {
        setCame("Loading...");
        Axios.post(`https://movix-api.vercel.app/api/user/getDetails`, {
            email: emailuser,
        }).then(response => {
            console.log(response);
            if (response.data.msg === "success") {
                setGet(true);
                  setCame("Load Details");
            }
            setDetails(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [emailuser]);

    const handleLoadDetails = async () => {
        setCame("Loading...");
        await Axios.post(`https://movix-api.vercel.app/api/user/getDetails`, {
            email: emailuser,
        }).then(response => {
            console.log(response);
            if (response.data.msg === "success") {
                setGet(true);
            }
            setDetails(response.data);
        }).catch(err => {
            console.log(err);
        })
        setCame("Load Details");
    }


    return (
        <div className="AccountArea">
            <div className="AccountArea-avatar">
                <div className="AccountArea-avatar-wrapper">
                    {details.profile ? <img
                        src={details.profile}
                        alt=""
                    /> : <IoPersonCircleOutline />}
                </div>
            </div>
            <div className="AccountArea-body">
                <p>Name: <b>{details.name}</b> </p>
                <p>UserName: <b>{details.username}</b></p>
                <p>Nationality: <b>{details.country}</b></p>
                <p>
                    Date Of Birth:<b>  {details.dob}</b>
                </p>
                <p>Spoken Language: <b> {details.language}</b></p>
                <p>Occupation: <b>{details.job}</b></p>
                <p>Favourate Genre: <b>{details.genre}</b></p>
                <p>Email: <b>{user?.email}</b></p>
                <p>            <button className="button-load" onClick={() => handleLoadDetails()}>{came}</button>
                </p>
            </div>
        </div>
    );
};

export default AccountDetails;