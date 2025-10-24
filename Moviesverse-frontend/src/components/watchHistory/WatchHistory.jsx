import React, { useState, useEffect, useRef } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, PlayCircle, Tv, Film, XCircle, Clock, Trash2, Eye, EyeOff } from 'lucide-react';
import Img from '../lazyLoadImage/Img';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './WatchHistory.css';
import Line from '../line/Line';

dayjs.extend(relativeTime);

const WatchHistory = ({ notShowLine }) => {
    const { user } = UserAuth();
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [filter, setFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(true);
    const [showClearModal, setShowClearModal] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const minItemsToShowButtons = useRef(0);

    const calculateMinItems = () => {
        if (carouselContainer.current) {
            const containerWidth = carouselContainer.current.offsetWidth;
            const itemWidth = 150 + 15;
            minItemsToShowButtons.current = Math.floor(containerWidth / itemWidth) + 1;
        } else {
            minItemsToShowButtons.current = 4;
        }
        handleScroll();
    };

    useEffect(() => {
        calculateMinItems();
        window.addEventListener('resize', calculateMinItems);
        return () => window.removeEventListener('resize', calculateMinItems);
    }, []);

    useEffect(() => {
        if (user && user.uid) {
            try {
                const historyKey = "watchHistory";
                const rawHistory = localStorage.getItem(historyKey);
                const allHistory = rawHistory ? JSON.parse(rawHistory) : {};
                const userHistory = allHistory[user.uid] || [];

                const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
                const recentHistory = userHistory.filter(item => item.timestamp > sevenDaysAgo);

                setHistory(recentHistory);

                if (userHistory.length !== recentHistory.length) {
                    allHistory[user.uid] = recentHistory;
                    localStorage.setItem(historyKey, JSON.stringify(allHistory));
                }
            } catch (error) {
                console.error("Failed to load watch history:", error);
                setHistory([]);
            }
        } else {
            setHistory([]);
        }
    }, [user]);

    useEffect(() => {
        let filtered = history;
        if (filter === 'tv') {
            filtered = history.filter(item => item.mediaType === 'tv');
        } else if (filter === 'movie') {
            filtered = history.filter(item => item.mediaType === 'movie');
        }
        setFilteredHistory(filtered);
    }, [history, filter]);

    useEffect(() => {
        const timer = setTimeout(() => handleScroll(), 0);
        return () => clearTimeout(timer);
    }, [filteredHistory]);

    const handleScroll = () => {
        const container = carouselContainer.current;
        if (container) {
            const tolerance = 5;
            const isAtStart = container.scrollLeft <= tolerance;
            const canScrollFurther = container.scrollWidth > container.clientWidth + tolerance;
            const isAtEnd = !canScrollFurther || (container.scrollWidth - container.scrollLeft - container.clientWidth <= tolerance);

            setShowPrev(!isAtStart);
            setShowNext(canScrollFurther && !isAtEnd);

            if (filteredHistory.length < minItemsToShowButtons.current) {
                setShowNext(false);
                setShowPrev(false);
            }
        } else {
            setShowPrev(false);
            setShowNext(filteredHistory.length >= minItemsToShowButtons.current);
        }
    };

    const navigation = (dir) => {
        const container = carouselContainer.current;
        if (!container) return;

        const itemWidth = container.querySelector('.historyCarouselItem')?.offsetWidth || 150;
        const gap = parseInt(getComputedStyle(container).gap) || 15;
        const visibleItems = Math.max(1, Math.floor(container.offsetWidth / (itemWidth + gap)));
        const scrollDistance = visibleItems * (itemWidth + gap);

        const scrollAmount = dir === "left"
            ? container.scrollLeft - scrollDistance
            : container.scrollLeft + scrollDistance;

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
        setTimeout(handleScroll, 350);
    };

    const handleItemClick = (item) => {
        const targetUrl = item.mediaType === 'tv'
            ? `/stream/${item.mediaType}/${item.id}/${item.season}/${item.episode}`
            : `/stream/${item.mediaType}/${item.id}/1/1`;
        navigate(`${targetUrl}`);
    };

    const handleRemoveItem = (itemToRemove, event) => {
        event.stopPropagation();
        if (!user || !user.uid) return;

        try {
            const historyKey = "watchHistory";
            const rawHistory = localStorage.getItem(historyKey);
            const allHistory = rawHistory ? JSON.parse(rawHistory) : {};
            let userHistory = allHistory[user.uid] || [];

            const updatedUserHistory = userHistory.filter(
                item => item.timestamp !== itemToRemove.timestamp
            );

            setHistory(updatedUserHistory);

            allHistory[user.uid] = updatedUserHistory;
            localStorage.setItem(historyKey, JSON.stringify(allHistory));
        } catch (error) {
            console.error("Failed to remove item from watch history:", error);
        }
    };

    const handleClearAll = () => {
        if (!user || !user.uid) return;

        try {
            const historyKey = "watchHistory";
            const rawHistory = localStorage.getItem(historyKey);
            const allHistory = rawHistory ? JSON.parse(rawHistory) : {};

            allHistory[user.uid] = [];
            localStorage.setItem(historyKey, JSON.stringify(allHistory));
            setHistory([]);
            setShowClearModal(false);
        } catch (error) {
            console.error("Failed to clear watch history:", error);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    if (!user || history.length === 0) {
        return null;
    }

    const showButtons = filteredHistory.length >= minItemsToShowButtons.current;

    return (
        <>
            <div className={`watchHistorySection ${!isVisible ? 'collapsed' : ''}`}>
                <div className="historyContentWrapper">
                    <div className="historyHeader">
                        <div className="historyHeaderLeft">
                            <h2 className="historyTitle">
                                <Clock className="titleIcon" size={24} />
                                Continue Watching
                                <span className="historyCount">{history.length}</span>
                            </h2>
                        </div>
                        <div className="historyControls">
                            <div className="filterButtons">
                                <button
                                    className={`filterBtn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`filterBtn ${filter === 'tv' ? 'active' : ''}`}
                                    onClick={() => setFilter('tv')}
                                >
                                    <Tv size={14} />
                                    TV Shows
                                </button>
                                <button
                                    className={`filterBtn ${filter === 'movie' ? 'active' : ''}`}
                                    onClick={() => setFilter('movie')}
                                >
                                    <Film size={14} />
                                    Movies
                                </button>
                            </div>
                            <button
                                className="controlBtn visibilityBtn"
                                onClick={toggleVisibility}
                                title={isVisible ? "Hide history" : "Show history"}
                            >
                                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <button
                                className="controlBtn clearBtn"
                                onClick={() => setShowClearModal(true)}
                                title="Clear all history"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    {isVisible && (
                        <>
                            {showButtons && (
                                <ChevronLeft
                                    className={`carouselLeftNav arrow ${!showPrev ? 'hidden' : ''}`}
                                    onClick={() => navigation("left")}
                                    aria-label="Scroll left"
                                />
                            )}
                            {showButtons && (
                                <ChevronRight
                                    className={`carouselRightNav arrow ${!showNext ? 'hidden' : ''}`}
                                    onClick={() => navigation("right")}
                                    aria-label="Scroll right"
                                />
                            )}
                            <div
                                className="historyCarousel"
                                ref={carouselContainer}
                                onScroll={handleScroll}
                            >
                                {filteredHistory.map((item, index) => {
                                    const posterUrl = item.poster
                                        ? url.poster + item.poster
                                        : '/placeholder-image.jpg';
                                    const isTV = item.mediaType === 'tv';

                                    return (
                                        <div
                                            key={`${item.id}-${item.timestamp}-${index}`}
                                            className={`historyCarouselItem ${isTV ? 'tv' : 'movie'} ${hoveredItem === item.timestamp ? 'hovered' : ''}`}
                                            onClick={() => handleItemClick(item)}
                                            onMouseEnter={() => setHoveredItem(item.timestamp)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Continue watching ${item.name}`}
                                        >
                                            <div className="historyPosterBlock">
                                                <Img src={posterUrl} />
                                                <div className="historyItemOverlay">
                                                    <PlayCircle size={48} className="playIcon" />
                                                    <div className="progressBarContainer">
                                                        <div 
                                                            className="progressBar" 
                                                            style={{ width: `${item.progress || 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <span className={`mediaTypeBadge ${isTV ? 'tv' : 'movie'}`}>
                                                    {isTV ? <Tv size={12} /> : <Film size={12} />}
                                                    <span>{isTV ? 'TV' : 'Movie'}</span>
                                                </span>
                                                <button
                                                    className="removeItemButton"
                                                    onClick={(e) => handleRemoveItem(item, e)}
                                                    aria-label={`Remove ${item.name} from history`}
                                                    title="Remove from history"
                                                >
                                                    <XCircle size={20} />
                                                </button>
                                                <div className="shimmerEffect" />
                                            </div>
                                            <div className="historyTextBlk">
                                                <span className="historyItemTitle" title={item.name}>
                                                    {item.name}
                                                </span>
                                                {isTV && (
                                                    <span className="historyEpisodeDetails" title={item.episodeName}>
                                                        S{item.season} E{item.episode}: {item.episodeName || `Episode ${item.episode}`}
                                                    </span>
                                                )}
                                                <span className="historyDate">
                                                    {dayjs(item.timestamp).fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                {filteredHistory.length === 0 && (
                                    <div className="flex items-center justify-center w-full h-48 text-gray-500">
                                        No items to display in this category.
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showClearModal && (
                <div className="modalOverlay" onClick={() => setShowClearModal(false)}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <h3>Clear Watch History?</h3>
                        <p>This will remove all items from your watch history. This action cannot be undone.</p>
                        <div className="modalActions">
                            <button className="modalBtn cancelBtn" onClick={() => setShowClearModal(false)}>
                                Cancel
                            </button>
                            <button className="modalBtn confirmBtn" onClick={handleClearAll}>
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {history.length > 0 && !notShowLine && <Line />}
        </>
    );
};

export default WatchHistory;