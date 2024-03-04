import React from 'react'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";


import { MdEmail } from "react-icons/md";
import { FaWhatsappSquare, FaTwitterSquare, FaTelegram } from "react-icons/fa";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";

import "./style.scss";




function ShareModal({ show, setShow, data }) {
    const hidePopup = () => {
        setShow(false);
    };

    const url = "www.themoviedb.org";
    return (
        <div className={`videoPopupshare ${show ? "visible" : ""}`}>
            <div className="opacityLayershare" onClick={hidePopup}></div>
            <div className="videoPlayesharer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <div className="sharemodalitems">

                    <WhatsappShareButton url={url} title={data} ><FaWhatsappSquare className='shareicon0' />
                    </WhatsappShareButton>

                    <TelegramShareButton url={url} title={data} ><FaTelegram className='shareicon0' />
                    </TelegramShareButton>

                    <FacebookShareButton url={url} quote="Moviesverse" hashtag="#MoviesVerse #Movie"><FaSquareFacebook className='shareicon0' />
                    </FacebookShareButton>

                    <LinkedinShareButton
                        url={url}
                        title={"Moviesverse"}
                        summary={data}

                    ><FaLinkedin className='shareicon0' />
                    </LinkedinShareButton>
                </div>
            </div>
        </div>
    )
}

export default ShareModal