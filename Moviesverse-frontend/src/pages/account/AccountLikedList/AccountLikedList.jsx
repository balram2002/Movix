import React, { useState, useEffect } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import Img from "../../../components/lazyLoadImage/Img";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import PosterFallback from "../../../assets/no-poster.png";


import "./AccountLikedList.css";

const AccountLikedList = () => {

    const { user } = UserAuth()
    const navigate = useNavigate();
    const [movies, setMovies] = useState([])
    const { url } = useSelector((state) => state.home);


    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedLiked);
        })
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteLiked = async (passedID) => {
        try {
            const result = movies?.filter((item => item.id !== passedID))
            await updateDoc(movieRef, {
                savedLiked: result,
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="AccountLikedList">
            <ContentWrapper>

                {!movies?.length <= 0 ? undefined : <div className="noresultsaccount67"><span>Like a Movie or TV Show to Start Accesing Here!</span></div>}</ContentWrapper>
            <div className="AccountLikedList-list">
                {movies?.map(item => {
                    const posterurl = item.img
                        ? url.poster + item.img
                        : PosterFallback;
                    return (
                        <div
                            key={item.id}
                            className="AccountLikedList-item"
                        >
                            <div className="AccountLikedList-poster" >
                                <Img src={posterurl} />
                                <MdDeleteForever onClick={() => deleteLiked(item?.id)} className="AccountLikedList-delete" />

                            </div>
                            <div className="AccountLikedList-text" onClick={() =>
                                navigate(
                                    `/${item.media_type || endpoint}/${item.id
                                    }`
                                )
                            }>
                                <span className="AccountLikedList-texttitle">
                                    {item.title || item.name}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AccountLikedList;
