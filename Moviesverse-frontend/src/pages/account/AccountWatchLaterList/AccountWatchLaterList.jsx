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


import "./AccountWatchLaterList.css";
import { toast } from "react-toastify";

const AccountWatchLaterList = () => {

    const { user } = UserAuth()
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    const [movies, setMovies] = useState([])

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedWatchLater);
        })
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteLiked = async (passedID) => {
        try {
            const result = movies?.filter((item => item.id !== passedID))
            toast.success("Item Deleted From WatchLater Section");
            await updateDoc(movieRef, {
                savedWatchLater: result,
            });
        } catch (error) {
            console.log(error)
            toast.error("Some Error occured, try again");
        }
    }

    return (
        <div className="AccountLikedList">
            <ContentWrapper>
                {!movies?.length <= 0 ? undefined : <div className="noresultsaccount67"><span>Add any Movie or TV Show to Watchlater to Start Accesing Here!</span></div>}
            </ContentWrapper>
            <div className="AccountLikedList-list-wish">
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
                                <div className="medialikedlist6757">{item?.media_type}</div>
                                <div className="deleteiconlists5435">  <MdDeleteForever onClick={() => deleteLiked(item?.id)} className="AccountLikedList-delete" /></div>

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

export default AccountWatchLaterList;
