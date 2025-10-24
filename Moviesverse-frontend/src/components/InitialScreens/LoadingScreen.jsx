import React, { useState, useEffect } from 'react';
import { Film, Tv, PlayCircle, Star, TrendingUp, Sparkles } from 'lucide-react';

export const LoadingScreen = ({ progress = 0 }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [currentTip, setCurrentTip] = useState(0);
    const [particles, setParticles] = useState([]);

    const tips = [
        { icon: <Film size={16} />, text: "Did you know? We have over 10,000+ movies!" },
        { icon: <Tv size={16} />, text: "Binge-watch your favorite TV series" },
        { icon: <Star size={16} />, text: "Check out trending content daily" },
        { icon: <TrendingUp size={16} />, text: "New releases added every week" },
        { icon: <Sparkles size={16} />, text: "Create your personalized watchlist" }
    ];

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        const tipInterval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % tips.length);
        }, 3000);

        const particleArray = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2
        }));
        setParticles(particleArray);

        return () => {
            clearInterval(progressInterval);
            clearInterval(tipInterval);
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 10, 20, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            overflow: 'hidden',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`
                    }}
                />
            ))}

            <div className="animated-bg blob1"></div>
            <div className="animated-bg blob2"></div>
            <div className="animated-bg blob3"></div>

            <div style={{
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '500px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: '30px',
                padding: '45px 35px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                animation: 'fadeInScale 0.6s ease-out'
            }}>
                <div style={{
                    position: 'relative',
                    width: '140px',
                    height: '140px',
                    margin: '0 auto 35px'
                }}>
                    <svg className="progress-ring" width="140" height="140">
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="50%" stopColor="#da2f68" />
                                <stop offset="100%" stopColor="#f093fb" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="70"
                            cy="70"
                            r="60"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="70"
                            cy="70"
                            r="60"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 60}`}
                            strokeDashoffset={`${2 * Math.PI * 60 * (1 - Math.min(loadingProgress, 100) / 100)}`}
                            style={{
                                transition: 'stroke-dashoffset 0.3s ease',
                                transform: 'rotate(-90deg)',
                                transformOrigin: 'center'
                            }}
                        />
                    </svg>
                    <div className="central-icon">
                        <PlayCircle size={50} strokeWidth={1.5} />
                    </div>
                    <div className="percentage-text">
                        {Math.min(Math.round(loadingProgress), 100)}%
                    </div>
                </div>

                <div className="logo-container">
                    <h1 style={{
                        margin: '0 0 10px',
                        fontSize: '42px',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #667eea 0%, #da2f68 50%, #f093fb 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '2px',
                        animation: 'gradientShift 3s ease infinite'
                    }}>
                        MOVIX
                    </h1>
                </div>

                <p style={{
                    margin: '0 0 30px',
                    opacity: 0.7,
                    fontSize: '14px',
                    color: '#e0e8f0',
                    fontWeight: '400'
                }}>
                    Loading your entertainment experience...
                </p>

                <div className="tips-container">
                    {tips.map((tip, index) => (
                        <div
                            key={index}
                            className={`tip-item ${currentTip === index ? 'active' : ''}`}
                            style={{
                                display: currentTip === index ? 'flex' : 'none'
                            }}
                        >
                            <span className="tip-icon">{tip.icon}</span>
                            <span className="tip-text">{tip.text}</span>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '25px'
                }}>
                    {tips.map((_, index) => (
                        <div
                            key={index}
                            className={`dot-indicator ${currentTip === index ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <p style={{
                    margin: '30px 0 0',
                    opacity: 0.5,
                    fontSize: '11px',
                    color: '#b0b8c8',
                    fontWeight: '300'
                }}>
                    Created by Balram Dhakad
                </p>
            </div>

            <style>{`
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes gradientShift {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    33% {
                        transform: translate(30px, -30px) rotate(120deg);
                    }
                    66% {
                        transform: translate(-20px, 20px) rotate(240deg);
                    }
                }

                @keyframes particleFloat {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) scale(0);
                        opacity: 0;
                    }
                }

                @keyframes iconPulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.1);
                        opacity: 1;
                    }
                }

                @keyframes tipSlide {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    10%, 90% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                }

                .animated-bg {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    opacity: 0.3;
                    animation: float 20s infinite ease-in-out;
                }

                .blob1 {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%);
                    top: -100px;
                    left: -100px;
                    animation-delay: 0s;
                }

                .blob2 {
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(218, 47, 104, 0.6) 0%, transparent 70%);
                    bottom: -100px;
                    right: -100px;
                    animation-delay: -7s;
                }

                .blob3 {
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(240, 147, 251, 0.5) 0%, transparent 70%);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation-delay: -14s;
                }

                .particle {
                    position: absolute;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particleFloat infinite ease-in;
                }

                .central-icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    animation: iconPulse 2s ease-in-out infinite;
                    filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.8));
                }

                .percentage-text {
                    position: absolute;
                    bottom: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 16px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.9);
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                }

                .tips-container {
                    min-height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 15px;
                    padding: 12px 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .tip-item {
                    align-items: center;
                    gap: 10px;
                    animation: tipSlide 3s ease-in-out;
                }

                .tip-item.active {
                    display: flex;
                }

                .tip-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #667eea;
                    background: rgba(102, 126, 234, 0.15);
                    padding: 8px;
                    border-radius: 8px;
                }

                .tip-text {
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 400;
                }

                .dot-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .dot-indicator.active {
                    background: linear-gradient(135deg, #667eea, #da2f68);
                    width: 24px;
                    border-radius: 4px;
                    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
                }

                @media (max-width: 600px) {
                    div[style*="maxWidth: '500px'"] {
                        padding: 35px 25px;
                        border-radius: 25px;
                    }

                    div[style*="width: '140px'"] {
                        width: 110px;
                        height: 110px;
                        margin-bottom: 30px;
                    }

                    .progress-ring {
                        width: 110px;
                        height: 110px;
                    }

                    .progress-ring circle {
                        r: 48;
                        cx: 55;
                        cy: 55;
                    }

                    .central-icon svg {
                        width: 38px;
                        height: 38px;
                    }

                    h1[style*="fontSize: '42px'"] {
                        font-size: 32px;
                    }

                    .tip-text {
                        font-size: 12px;
                    }

                    .tips-container {
                        padding: 10px 15px;
                        min-height: 45px;
                    }
                }

                @media (max-width: 400px) {
                    div[style*="padding: 35px 25px"] {
                        padding: 25px 20px;
                        border-radius: 20px;
                    }

                    div[style*="width: 110px"] {
                        width: 90px;
                        height: 90px;
                        margin-bottom: 25px;
                    }

                    .progress-ring {
                        width: 90px;
                        height: 90px;
                    }

                    .progress-ring circle {
                        r: 38;
                        cx: 45;
                        cy: 45;
                        stroke-width: 6;
                    }

                    .central-icon svg {
                        width: 32px;
                        height: 32px;
                    }

                    .percentage-text {
                        font-size: 14px;
                        bottom: -25px;
                    }

                    h1[style*="fontSize: 32px"] {
                        font-size: 28px;
                    }

                    .tip-text {
                        font-size: 11px;
                    }

                    .blob1, .blob2, .blob3 {
                        filter: blur(80px);
                    }
                }
            `}</style>
        </div>
    );
};