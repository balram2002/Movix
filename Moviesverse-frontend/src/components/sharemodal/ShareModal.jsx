import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TelegramShareButton, WhatsappShareButton, } from "react-share";

import { MdEmail } from "react-icons/md";
import { FaWhatsappSquare, FaTelegram, FaRegCopy } from "react-icons/fa";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
import { toast } from 'react-toastify';

import "./style.scss";

function ShareModal({ show, setShow, data, media }) {
    const hidePopup = () => {
        setShow(false);
    };

    const url = `https://moviesverse.vercel.app/${data?.media_type || media}/${data?.id}`;
    const title = data?.title || data?.name;
    const date = data?.release_date;
    const des = data?.overview;
    const dataa = title + "\n " + date + "\n " + des;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        toast.success("Text copied to clipboard successfully.");
    };
    return (
        <div className={`videoPopupshare ${show ? "visible" : ""}`}>
            <div className="opacityLayershare" onClick={hidePopup}></div>
            <div className="videoPlayesharer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <div className="sharemodalitems">
                    <FaRegCopy className='shareicon0' onClick={handleCopy} />

                    <WhatsappShareButton url={url} title={dataa} ><FaWhatsappSquare className='shareicon0' />
                    </WhatsappShareButton>

                    <TelegramShareButton url={url} title={dataa} ><FaTelegram className='shareicon0' />
                    </TelegramShareButton>

                    <FacebookShareButton url={url} quote="Moviesverse" hashtag="#MoviesVerse #Movie"><FaSquareFacebook className='shareicon0' />
                    </FacebookShareButton>

                    <LinkedinShareButton
                        url={url}
                        title={"Moviesverse"}
                        summary={dataa}

                    ><FaLinkedin className='shareicon0' />
                    </LinkedinShareButton>
                </div >
            </div >
        </div >
    )
}

export default ShareModal