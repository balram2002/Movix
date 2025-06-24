import React, { useState } from 'react'
import AccountDetails from './AccountDetails/AccountDetails';
import { Helmet } from 'react-helmet';

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

function AccountPage() {
   const { user } = UserAuth();

    const [likedList, setLikedList] = useState(true);
    const [likedMovie, setLikedMovie] = useState(true);
    const [likedPeople, setLikedPeople] = useState(false);
    const [watchList, setWatchList] = useState(false);
    const [AccountDetailsChange, setAccountDetailsChange] = useState(false);
    const [activeList, setActiveList] = useState(`Liked Lists`);
    const [activeLikedList, setActiveLikedList] = useState(`Liked Movies and TV Shows of ${user?.email}`);

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

    return (
        <div className='Account-Main'>
             <Helmet>
                <title>Account | MV</title>
                <meta name="description" content="Discover and stream your favorite Movies and TV Shows with our powerful MERN stack app using TMDB API. Features include Firebase authentication, dynamic recommendations, search and explore pages, global state with Redux, Watchlist/Likes, and seamless content streaming with full error handling." />
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