import React, { useState, useEffect, useRef } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, PlayCircle, Tv, Film, XCircle } from 'lucide-react'; // Import XCircle
import Img from '../lazyLoadImage/Img';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './WatchHistory.css';
import Line from '../line/Line'; // Assuming Line is correctly imported

dayjs.extend(relativeTime);

const WatchHistory = ({ notShowLine }) => {
    const { user } = UserAuth();
    const [history, setHistory] = useState([]);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
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
         handleScroll(); // Recalculate button visibility after setting minItems
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
        const timer = setTimeout(() => handleScroll(), 0);
        return () => clearTimeout(timer);
    }, [history]);

    const handleScroll = () => {
        const container = carouselContainer.current;
        if (container) {
            const tolerance = 5;
            const isAtStart = container.scrollLeft <= tolerance;
            // Check if scrollWidth is significantly larger than clientWidth before enabling 'next'
            const canScrollFurther = container.scrollWidth > container.clientWidth + tolerance;
            const isAtEnd = !canScrollFurther || (container.scrollWidth - container.scrollLeft - container.clientWidth <= tolerance);

            setShowPrev(!isAtStart);
            // Only show 'next' if there's actually more content to scroll to and not at the end
            setShowNext(canScrollFurther && !isAtEnd);

            // Override if not enough items
            if (history.length < minItemsToShowButtons.current) {
                setShowNext(false);
                setShowPrev(false);
            }

        } else {
            setShowPrev(false);
            setShowNext(history.length >= minItemsToShowButtons.current);
        }
    };


    const navigation = (dir) => {
        const container = carouselContainer.current;
        if (!container) return;

        const itemWidth = container.querySelector('.historyCarouselItem')?.offsetWidth || 150;
        const gap = parseInt(getComputedStyle(container).gap) || 15;
        // Scroll by the width of visible items minus one, for smoother paging
        const visibleItems = Math.max(1, Math.floor(container.offsetWidth / (itemWidth + gap)));
        const scrollDistance = visibleItems * (itemWidth + gap);


        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - scrollDistance
                : container.scrollLeft + scrollDistance;

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
         // Manually trigger scroll handler shortly after scroll starts
         // to update buttons during smooth scroll
         setTimeout(handleScroll, 350);
    };

    const handleItemClick = (item) => {
        const targetUrl = item.mediaType === 'tv'
            ? `/stream/${item.mediaType}/${item.id}/${item.season}/${item.episode}`
            : `/stream/${item.mediaType}/${item.id}/1/1`;
        navigate(`${targetUrl}`);
    };

    // --- New Function to Remove Item ---
    const handleRemoveItem = (itemToRemove, event) => {
        event.stopPropagation(); // Prevent triggering handleItemClick

        if (!user || !user.uid) return;

        try {
            const historyKey = "watchHistory";
            const rawHistory = localStorage.getItem(historyKey);
            const allHistory = rawHistory ? JSON.parse(rawHistory) : {};
            let userHistory = allHistory[user.uid] || [];

            // Filter out the item based on timestamp (simplest unique identifier here)
            const updatedUserHistory = userHistory.filter(
                item => item.timestamp !== itemToRemove.timestamp
            );

            // Update state
            setHistory(updatedUserHistory);

            // Update localStorage
            allHistory[user.uid] = updatedUserHistory;
            localStorage.setItem(historyKey, JSON.stringify(allHistory));

        } catch (error) {
            console.error("Failed to remove item from watch history:", error);
        }
    };
    // --- End of New Function ---


    if (!user || history.length === 0) {
        return null;
    }

    const showButtons = history.length >= minItemsToShowButtons.current;


    return (
        <>
            <div className="watchHistorySection">
                <div className="historyContentWrapper">
                    <h2 className="historyTitle">Continue Watching</h2>
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
                        {history.map((item, index) => {
                            const posterUrl = item.poster
                                ? url.poster + item.poster
                                : '/placeholder-image.jpg';
                            const isTV = item.mediaType === 'tv';

                            return (
                                <div
                                    key={`${item.id}-${item.timestamp}-${index}`} // Use timestamp for key uniqueness
                                    className={`historyCarouselItem ${isTV ? 'tv' : 'movie'}`}
                                    onClick={() => handleItemClick(item)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Continue watching ${item.name}`}
                                >
                                    <div className="historyPosterBlock">
                                        <Img src={posterUrl} />
                                        <div className="historyItemOverlay">
                                            <PlayCircle size={40} className="playIcon" />
                                        </div>
                                        <span className="mediaTypeBadge">
                                            {isTV ? <Tv size={12} /> : <Film size={12} />}
                                            <span>{isTV ? 'TV' : 'Movie'}</span>
                                        </span>
                                        {/* --- Remove Button --- */}
                                        <button
                                            className="removeItemButton"
                                            onClick={(e) => handleRemoveItem(item, e)}
                                            aria-label={`Remove ${item.name} from history`}
                                            title="Remove from history"
                                        >
                                            <XCircle size={18} />
                                        </button>
                                        {/* --- End Remove Button --- */}
                                    </div>
                                    <div className="historyTextBlk">
                                        <span className="historyItemTitle" title={item.name}>{item.name}</span>
                                        {isTV && (
                                            <span className="historyEpisodeDetails" title={item.episodeName}>
                                                S{item.season} E{item.episode}: {item.episodeName || `Episode ${item.episode}`}
                                            </span>
                                        )}
                                        <span className="historyDate">
                                            Watched {dayjs(item.timestamp).fromNow()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {history.length > 0 && !notShowLine && <Line />}
        </>
    );
};

export default WatchHistory;