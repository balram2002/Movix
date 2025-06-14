import React, { useState } from 'react'

import "./style.scss"

const Overview = ({ overview }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className={`overviewmain232  ${isExpanded
                ? "overviewsec5364"
                : "overviewthird657"
                }`}>
                {overview}
            </div>
            <button
                onClick={handleExpand}
                className="buttonoverview34567"
            >
                {isExpanded ? "Show less" : "Show more"}
            </button>
        </div>
    )
}

export default Overview