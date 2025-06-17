import React from 'react';
import styled from 'styled-components';

const TopScrollButton = ({ targetRef }) => {
    const handleScroll = () => {
        if (targetRef && targetRef.current) {
            // Scroll the container's content to the top smoothly
            targetRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };


    return (
        <StyledWrapper>
            <button className="button" onClick={handleScroll}>
                <svg className="svgIcon" viewBox="0 0 384 512">
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 4px rgba(180, 160, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }

  .svgIcon {
    width: 10px;
    transition: transform 0.3s, opacity 0.3s;
  }

  .svgIcon path {
    fill: white;
  }

  .button:hover {
    width: 80px;
    border-radius: 50px;
    background-color: #000000;
    align-items: center;
      border: 0.5px solid white;
  }

  .button:hover .svgIcon {
    opacity: 0;
    transform: translateY(-50%);
  }

  .button::before {
    position: absolute;
    bottom: -20px;
    content: "Go to Top";
    color: white;
    font-size: 0px;
    transition: font-size 0.3s, bottom 0.3s;
    white-space: nowrap;
  }

  .button:hover::before {
    font-size: 12px;
    opacity: 1;
    bottom: 50%;
    transform: translateY(50%);
  }
`;
export default TopScrollButton;
