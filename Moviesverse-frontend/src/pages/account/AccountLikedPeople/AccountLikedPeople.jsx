import React, { useState, useEffect } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import Img from "../../../components/lazyLoadImage/Img";
import { MdDeleteForever } from "react-icons/md";
import PosterFallback from "../../../assets/no-poster.png";
import "./AccountLikedPeople.css";
import { toast } from "react-toastify";

const AccountLikedPeople = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        if (user?.email) {
            const unsubscribe = onSnapshot(doc(db, 'users', user.email), (doc) => {
                setMovies(doc.data()?.savedLikedPeople || []);
            });
            return () => unsubscribe();
        }
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`);
    const deleteLiked = async (passedID, e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete
        try {
            const result = movies.filter((item) => item.id !== passedID);
            await updateDoc(movieRef, {
                savedLikedPeople: result,
            });
            toast.success("Item removed from Liked People");
        } catch (error) {
            console.error(error);
            toast.error("Error removing item, please try again");
        }
    };

    const handleItemClick = (item) => {
        navigate(`/${item.media_type || 'person'}/${item.id}`);
    };

    return (
        <div className="AccountLikedList">
            <ContentWrapper>
                {movies?.length === 0 ? (
                    <div className="noresultsaccount67">
                        <span>Like a Person or Individual to Start Accessing Here!</span>
                    </div>
                ) : (
                    <div className="AccountLikedList-list-main">
                        {movies?.map((item) => {
                            const posterUrl = item.img
                                ? url.profile + item.img
                                : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                    className="AccountLikedList-item"
                                    onClick={() => handleItemClick(item)}
                                >
                                    <div className="AccountLikedList-poster people456">
                                        <Img
                                            src={posterUrl}
                                            className="poster-img"
                                        />
                                        <span className="medialikedlist6757">{item.media_type?.toUpperCase() || 'PERSON'}</span>
                                        <button
                                            onClick={(e) => deleteLiked(item.id, e)}
                                            className="deleteiconlists5435"
                                            aria-label="Remove from Liked People"
                                        >
                                            <MdDeleteForever className="AccountLikedList-delete" />
                                        </button>
                                    </div>
                                    <div className="AccountLikedList-text">
                                        <span className="AccountLikedList-texttitle">
                                            {item.title || item.name}
                                        </span>
                                        <span className="AccountLikedList-textsubtitle">
                                            {item.birth_date || 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default AccountLikedPeople;