import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { BsPersonCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

import "./style.scss";
// import "./header.css";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import Toggle from "../toggled/Toggle";
import Autocomplete from './../autocomplete/Autocomplete';


const Header = () => {

    const { user, logout } = UserAuth()

    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [changeWord, setchangeWord] = useState("");
    const [showProfile, setShowProfile] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        setShowProfile(false);
        try {
            await logout();
            navigate('/login');
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/multi/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "explore") {
            navigate("/explore/movie");
        } else if (type === "home") {
            navigate("/");
        } else if (type === "about") {
            navigate("/about");
        }
        setMobileMenu(false);
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <div className="logo">
                    <Toggle />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("home")}>
                        Home
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("explore")}
                    >
                        Explore
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("about")}
                    >
                        About
                    </li>
                    {user?.email && <li
                        className="menuItem"
                        onClick={handleLogout}
                    >
                        <button className="logbutton">Logout</button>
                    </li>}
                    {!user?.email ? <li className="menuItem">
                        <button className="loginbutton" onClick={() => {
                            navigate(`/login`);
                        }}>
                            Login
                        </button>
                    </li> : <li className="menuItem" id="person" >
                        <BsPersonCircle onClick={() =>
                            // setShowProfile(true)
                            navigate('./account')
                        } />
                    </li>}
                    {/* <div className={`profileuser ${showProfile ? "active" : ""} `}>
                        <ul>
                            <li id="useremail">User Email : {user?.email}</li>
                            <button id="userprofile" onClick={() => navigate('/account')}>Profile</button>
                            <button id="userlogout" onClick={handleLogout}>Logout</button>
                            <RxCross2 id="crossuser" onClick={() => setShowProfile(false)} />
                        </ul>
                    </div> */}
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie, tv show and people...."
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setchangeWord(e.target.value);
                                }}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => {
                                    setShowSearch(false);
                                    setchangeWord("");
                                }}
                            />
                        </div>
                        {changeWord.length > 2 && <Autocomplete changeWord={changeWord} />}
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
