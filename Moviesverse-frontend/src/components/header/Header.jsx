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
        setMobileMenu(false);
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
        setShowSearch(!showSearch);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
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
                    <NavLink to={"/"} className="menuItem" onClick={() => {
                        setMobileMenu(false);
                    }}>
                        Home
                    </NavLink>
                    <NavLink
                        to={"/explore/movie"}
                        className="menuItem"
                        onClick={() => {
                            setMobileMenu(false);
                        }}
                    >
                        Explore
                    </NavLink>
                    {!user?.email ? <li className="menuItem">
                        <button class="buttonheadersvc" onClick={() => {
                            navigate(`/login`);
                            setMobileMenu(false);
                        }}>
                            <div class="button-outerheadersvc">
                                <div class="button-innerheadersvc">
                                    <span>Login</span>
                                </div>
                            </div>
                        </button>
                      
                    </li> : <NavLink to={"/account"} className="menuItem" id="person" >
                        <BsPersonCircle onClick={() => {
                            navigate('/account');
                            setMobileMenu(false);
                        }
                        } />
                    </NavLink>}
                    {user?.email && <li
                        className="menuItem" 
                    >
                         <button class="buttonheadersvc" onClick={handleLogout}>
                            <div class="button-outerheadersvc">
                                <div class="button-innerheadersvc logoutheader">
                                    <span>Logout</span>
                                </div>
                            </div>
                        </button>
                    </li>}
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
                                onSubmit={() => {
                                    setShowSearch(false);
                                    setchangeWord("");
                                    setQuery("");
                                }}
                            />
                            <VscChromeClose
                                onClick={() => {
                                    setShowSearch(false);
                                    setchangeWord("");
                                }}
                            />
                        </div>
                        {changeWord.length > 2 && <Autocomplete changeWord={changeWord} setchangeWord={setchangeWord} setShowSearch={setShowSearch} />}
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
