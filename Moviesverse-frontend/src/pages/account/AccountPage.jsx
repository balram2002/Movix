import React, { useEffect, useState } from 'react'
import AccountDetails from './AccountDetails/AccountDetails';
import { Helmet } from 'react-helmet-async';

import "./account.scss";
import AccountLikedList from './AccountLikedList/AccountLikedList';
import AccountWatchLaterList from './AccountWatchLaterList/AccountWatchLaterList';
import AccountLikedPeople from './AccountLikedPeople/AccountLikedPeople';
import SwitchTabs from './../../components/switchTabs/SwitchTabs';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { UserAuth } from '../../context/AuthContext';
import EditDetails from './editdetails/EditDetails';
import { toast } from 'react-toastify';
import Line from './../../components/line/Line';
import Axios from "axios";

function AccountPage() {
   const { user } = UserAuth();

    const [likedList, setLikedList] = useState(true);
    const [likedMovie, setLikedMovie] = useState(true);
    const [likedPeople, setLikedPeople] = useState(false);
    const [watchList, setWatchList] = useState(false);
    const [AccountDetailsChange, setAccountDetailsChange] = useState(false);
    const [activeList, setActiveList] = useState(`Liked Lists`);
    const [activeLikedList, setActiveLikedList] = useState(`Liked Movies and TV Shows of ${user?.email}`);
    const [details, setDetails] = useState({});

    const onTabChange = (tab) => {
        if (tab === "Liked") {
            setLikedList(true);
            setWatchList(false);
            setAccountDetailsChange(false);
            setActiveList(`Liked Lists`);
        } else if (tab === "Watch Later") {
            setWatchList(true);
            setLikedList(false);
            setAccountDetailsChange(false);
            setActiveList(`Watch Later List`);
        } else if (tab === "Account") {
            setAccountDetailsChange(true);
            setWatchList(false);
            setLikedList(false);
            setActiveList(`Set and update profile`);
        }
    };
    const onTabChangeLiked = (tab) => {
        if (tab === "Movie/TV") {
            setLikedMovie(true);
            setLikedPeople(false);
            setActiveLikedList(`Liked Movies and TV Shows of ${user?.email}`);
        } else {
            setLikedPeople(true);
            setLikedMovie(false);
            setActiveLikedList(`Liked People from Movies/TV of ${user?.email}`);
        }
    };

      useEffect(() => {
            Axios.post(`https://movix-api.vercel.app/api/user/getDetails`, {
                email: user?.email,
            }).then(response => {
                setDetails(response.data);
            }).catch(err => {
                console.log(err);
            })
            console.log(details);
        }, [user?.email]);

    return (
        <div className='Account-Main'>
             <Helmet>
                <title>{`${details?.name || 'Account'} | Moviesverse`}</title>
                <meta name="description" content="User account page containing user details, liked lists, Watchlists, and edit profile modules. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
                <meta property="og:title" content={`${details?.name || 'Account'} | Moviesverse`} />
                <meta property="og:description" content="User account page containing user details, liked lists, Watchlists, and edit profile modules. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
                <link rel="canonical" href={`https://moviesverse.studio/account`} />
                <meta property="og:url" content={`https://moviesverse.studio/account`} />
                <meta property="og:type" content="website" />
            </Helmet>
            <AccountDetails />
            <div className="switchAccountLists">
                <ContentWrapper >
                    <h1 className="AccountListTittle">{activeList}</h1>
                    <SwitchTabs data={["Liked", "Watch Later", "Account"]} onTabChange={onTabChange} />
                </ContentWrapper>
            </div>
            {likedList && (
                <div className="switchAccountLists">
                    <ContentWrapper >
                        <h1 className="AccountListTittle">{activeLikedList}</h1>
                        <SwitchTabs data={["Movie/TV", "People"]} onTabChange={onTabChangeLiked} />
                    </ContentWrapper>
                    {likedMovie && <AccountLikedList />}
                    {likedPeople && <AccountLikedPeople />}
                </div>
            )}
            {watchList && <AccountWatchLaterList />
            }
            {AccountDetailsChange && <EditDetails />}
            <Line />
            <div className="alternateswipergfhf6677">
                <span className='fhfhfhyf67576'>Use Desktop to experience more features.</span>
                <span className='fhfhfhyf67576'>Make an account to like and add to watchlist content and get recommendations accordingly..</span>
            </div>
        </div>
    )
}

export default AccountPage;