import React, { useState } from 'react'
import AccountDetails from './AccountDetails/AccountDetails';

import "./account.scss";
import AccountLikedList from './AccountLikedList/AccountLikedList';
import AccountWatchLaterList from './AccountWatchLaterList/AccountWatchLaterList';
import AccountLikedPeople from './AccountLikedPeople/AccountLikedPeople';
import SwitchTabs from './../../components/switchTabs/SwitchTabs';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { UserAuth } from '../../context/AuthContext';
import EditDetails from './editdetails/EditDetails';
import { toast } from 'react-toastify';

function AccountPage() {
    const { user } = UserAuth();

    const [likedList, setLikedList] = useState(true);
    const [likedMovie, setLikedMovie] = useState(true);
    const [likedPeople, setLikedPeople] = useState(false);
    const [watchList, setWatchList] = useState(false);
    const [AccountDetailsChange, setAccountDetailsChange] = useState(false);
    const [activeList, setActiveList] = useState(`Liked Lists Of ${user?.email}`);
    const [activeLikedList, setActiveLikedList] = useState(`Liked Movies and TV Shows of ${user?.email}`);

    const onTabChange = (tab) => {
        if (tab === "Liked") {
            setLikedList(true);
            setWatchList(false);
            setAccountDetailsChange(false);
            setActiveList(`Liked Lists Of ${user?.email}`);
        } else if (tab === "Watch Later") {
            setWatchList(true);
            setLikedList(false);
            setAccountDetailsChange(false);
            setActiveList(`Watch Later List Of ${user?.email}`);
        } else if (tab === "Account") {
            setAccountDetailsChange(true);
            setWatchList(false);
            setLikedList(false);
            setActiveList(`Set and update profile Of ${user?.email}`);
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
        </div>
    )
}

export default AccountPage;