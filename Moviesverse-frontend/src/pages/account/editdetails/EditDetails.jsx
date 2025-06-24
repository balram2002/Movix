import React, { useState } from 'react'
import { UserAuth } from '../../../context/AuthContext';
import Axios from "axios"

import "./style.css";
import { toast } from 'react-toastify';
function EditDetails() {

    const [username, setUsername] = useState('');
    const [came, setCame] = useState("Update Profile");
    const [fullname, setFullname] = useState('');
    const [profile, setProfile] = useState();
    const [date, setDate] = useState('');
    const [language, setlanguage] = useState('');
    const [genre, setGenre] = useState('');
    const [job, setJob] = useState('');
    const [country, setCountry] = useState('');
    const [registered, setRegistered] = useState();

    const { user } = UserAuth();
    const email = user?.email;

    const details = {
        username: username,
        name: fullname,
        date: date,
        language: language,
        genre: genre,
        profile: profile,
    }

    const handleProfile = (e) => {
        e.preventDefault();
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setProfile(reader.result);
        };
        reader.onerror = error => {
            console.log("Error : " + error);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.info("Updating, Please Wait...");
        setCame("Updating On Progress...");
        Axios.post(`https://movix-api.vercel.app/api/user/addUserDetails`, {
            email,
            username,
            name: fullname,
            dob: date,
            language,
            genre,
            job,
            country,
            profile,
        }).then(response => {
            console.log(response);
            if (response.data.msg === "Record Registered....") {
                setRegistered(true);
                setCame("Update Profile");
                toast.success("Account Details Updated Successfully!");
            }
        }).catch(err => {
            console.log(err);
            toast.error("Some Error Occured During Updating!");
        })

    };


    return (
        <>
            <h1 id='hfhsdfjsj'>Update Profile of '{email}'</h1>
            <div className='editdetailspage00'>
                <section class="update-profile-container">

                    <form onSubmit={(e) => handleSubmit(e)}>
                        {/* <img src="" alt="" /> */}
                        <div class="flex">
                            <div class="inputBox">
                                <span>UserName : </span>
                                <input type="text" name="username" required class="box" placeholder="enter your username" onChange={(e) => setUsername(e.target.value)} />
                                <span>Full Name : </span>
                                <input type="text" name="fullname" required class="box" placeholder="enter your fullname" onChange={(e) => setFullname(e.target.value)} />
                                <span>Occupation : </span>
                                <input type="text" name="ocupation" required class="box" placeholder="enter your occupation" onChange={(e) => setJob(e.target.value)} />
                                <span>Profile pic : </span>
                                {/* <input type="hidden" name="old_image" /> */}
                                <input type="file" name="image" class="box" accept="image/jpg, image/jpeg, image/png" onChange={(e) => handleProfile(e)} />
                            </div>
                            <div class="inputBox">
                                <input type="hidden" name="old_pass" />
                                <span>Date Of Birth :</span>
                                <input type="date" class="box" name="dob" placeholder="Select birthdate" onChange={(e) => setDate(e.target.value)} />
                                <span>Spoken Language :</span>
                                <input type="text" class="box" name="language" placeholder="enter your language" onChange={(e) => setlanguage(e.target.value)} />
                                <span>Nationality :</span>
                                <input type="text" class="box" name="notinality" placeholder="enter your country" onChange={(e) => setCountry(e.target.value)} />
                                <span>Favourate Genre :</span>
                                <input type="text" class="box" name="genre" placeholder="enter favourate genre" onChange={(e) => setGenre(e.target.value)} />
                            </div>
                        </div>
                        <div class="flex-btn">
                            <input className='subtxt' type="submit" placeholder={came} name="update" class="btn" />
                            {registered && <h1 className='recordr'>Record Registered Successfully...</h1>}
                        </div>
                    </form>

                </section>
            </div>
        </>
    )
}

export default EditDetails
