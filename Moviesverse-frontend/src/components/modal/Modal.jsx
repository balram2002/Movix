import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title-modal">
                    <h1>Are You Sure You Want to Continue?</h1>
                </div>
                <div className="body-modal">
                    <p>The next page looks amazing. Hope you want to go there!</p>
                    <div className="modal-items">
                        {data?.map((item) => {
                            return (
                                <div className="modal-item">
                                    <div className="poster-modal">
                                        img
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Modal;