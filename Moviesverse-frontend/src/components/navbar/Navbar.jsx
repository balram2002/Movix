import { React, useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { RiSlideshow3Line } from "react-icons/ri";
import { MdOutlineExplore, MdExplore, MdOutlineManageSearch, MdOpacity } from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./style.css";
import "./nav.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { toast } from "react-toastify";

const Navbar = () => {
    const location = useLocation();


    const navigate = useNavigate();
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [shows, setShows] = useState(false);


    const controlNavbar = () => {
        setShows(true);
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) {
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <ContentWrapper>
            <center>
                <div className={`navbar ${shows ? "mobileView" : ""} ${show}`}>
                    <ul>
                        <NavLink className="list" to='/movie' onClick={() => toast.info("Movies Page")}>
                            <a href="">
                                <span className="icon"><BiMoviePlay /></span>
                                <span className="text" id="one">Movies</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/tv' onClick={() => toast.info("TV Shows Page")}>
                            <a href="">
                                <span className="icon"><RiSlideshow3Line /></span>
                                <span className="text" id="two">TV</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/'>
                            <a href="">
                                <span className="icon"><FaHome /></span>
                                <span className="text" id="zero">Home</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/explore/movie' onClick={() => toast.info("Explore Movies Page")}>
                            <a href="">
                                <span className="icon"><MdOutlineExplore /></span>
                                <span className="text" id="three">Find M</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/explore/tv' onClick={() => toast.info("Explore TV Page")}>
                            <a href="">
                                <span className="icon"><MdExplore /></span>
                                <span className="text" id="four">Find T</span>
                            </a>
                        </NavLink>
                        <div className="indicator"></div>
                    </ul>
                </div >
            </center>
        </ContentWrapper>
    );
};

export default Navbar;
