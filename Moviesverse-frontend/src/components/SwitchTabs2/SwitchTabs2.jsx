import React, { useState } from "react";

import "./Style.scss";

const SwitchTabs2 = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs-newstr">
            <div className="tabItems-newstr">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem-newstr ${
                            selectedTab === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg-newstr" style={{ left }} />
            </div>
        </div>
    );
};

export default SwitchTabs2;
