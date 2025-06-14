import React, { useState } from 'react'

import "./style.scss"

const OverviewRev = ({ overview }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className={`overviewmain23245  ${isExpanded
                ? "overviewsec536445"
                : "overviewthird65745"
                }`}>
                {overview}
            </div>
            <button
                onClick={handleExpand}
                className="buttonoverview3456745"
            >
                {isExpanded ? "Show less" : "Show more"}
            </button>
        </div>
    )
}

export default OverviewRev