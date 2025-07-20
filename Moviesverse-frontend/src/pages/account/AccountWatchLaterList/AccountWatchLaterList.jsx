import React, { useState, useEffect } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import Img from "../../../components/lazyLoadImage/Img";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import PosterFallback from "../../../assets/no-poster.png";
import "./AccountWatchLaterList.css";
import { toast } from "react-toastify";

const AccountWatchLaterList = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (user?.email) {
            const unsubscribe = onSnapshot(doc(db, 'users', user.email), (doc) => {
                setMovies(doc.data()?.savedWatchLater || []);
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
                savedWatchLater: result,
            });
            toast.success("Item removed from Watch Later");
        } catch (error) {
            console.error(error);
            toast.error("Error removing item, please try again");
        }
    };

    const handleItemClick = (item) => {
        navigate(`/${item.media_type || 'movie'}/${item.id}`);
    };

    return (
        <div className="AccountLikedList">
            <ContentWrapper>
                {movies?.length === 0 ? (
                    <div className="noresultsaccount67">
                        <span>Add Movies or TV Shows to Watch Later to View Here!</span>
                    </div>
                ) : (
                    <div className="AccountLikedList-list-wish">
                        {movies?.map((item) => {
                            const posterUrl = item.img
                                ? url.poster + item.img
                                : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                    className="AccountLikedList-item"
                                    onClick={() => handleItemClick(item)}
                                >
                                    <div className="AccountLikedList-poster">
                                        <Img
                                            src={posterUrl}
                                            className="poster-img"
                                        />
                                        <span className="medialikedlist6757">{item.media_type?.toUpperCase()}</span>
                                        <button
                                            onClick={(e) => deleteLiked(item.id, e)}
                                            className="deleteiconlists5435"
                                            aria-label="Remove from Watch Later"
                                        >
                                            <MdDeleteForever className="AccountLikedList-delete" />
                                        </button>
                                    </div>
                                    <div className="AccountLikedList-text">
                                        <span className="AccountLikedList-texttitle">
                                            {item.title || item.name}
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

export default AccountWatchLaterList;