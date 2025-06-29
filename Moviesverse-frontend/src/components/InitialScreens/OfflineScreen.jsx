import { useState } from "react";

export const OfflineScreen = () => {
    const [isRetrying, setIsRetrying] = useState(false);
    const handleRetry = () => {
        setIsRetrying(true);
        setTimeout(() => {
            setIsRetrying(false);
            window.location.reload();
        }, 2000);
    };
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
            }}></div>
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '4px',
                height: '4px',
                background: '#ff6b6b',
                borderRadius: '50%',
                animation: 'twinkle 3s infinite'
            }}></div>
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '15%',
                width: '3px',
                height: '3px',
                background: '#4ecdc4',
                borderRadius: '50%',
                animation: 'twinkle 2s infinite 1s'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '20%',
                width: '5px',
                height: '5px',
                background: '#45b7d1',
                borderRadius: '50%',
                animation: 'twinkle 2.5s infinite 0.5s'
            }}></div>
            <div style={{
                maxWidth: '900px',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{
                    position: 'relative',
                    margin: '0 auto 60px',
                    width: '240px',
                    height: '160px'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '180px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                        borderRadius: '20px',
                        border: '4px solid #e53e3e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 40px rgba(229, 62, 62, 0.3)',
                        animation: 'float-disconnect 3s ease-in-out infinite'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                animation: 'pulse-error 2s infinite'
                            }}>
                                📶
                            </div>
                            <div style={{
                                fontSize: '40px',
                                color: '#e53e3e',
                                animation: 'disconnect-slash 2s infinite linear'
                            }}>
                                ❌
                            </div>
                        </div>
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100px',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent 0%, #e53e3e 50%, transparent 100%)',
                        borderRadius: '2px',
                        animation: 'pulse-line 2s ease-in-out infinite'
                    }}></div>
                </div>
                <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: '30px',
                    padding: '60px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.4)',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        right: '-2px',
                        bottom: '-2px',
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b)',
                        borderRadius: '30px',
                        zIndex: -1,
                        animation: 'border-rotate 4s linear infinite',
                        opacity: 0.7
                    }}></div>
                    <h1 style={{
                        fontSize: '56px',
                        margin: '0 0 25px',
                        fontWeight: '800',
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 40px rgba(255, 107, 107, 0.5)',
                        letterSpacing: '-2px'
                    }}>
                        Connection Lost
                    </h1>
                    <p style={{
                        fontSize: '22px',
                        lineHeight: '1.6',
                        margin: '0 auto 50px',
                        color: '#e2e8f0',
                        fontWeight: '400',
                        maxWidth: '600px'
                    }}>
                        Your device is offline. Check your internet connection to continue streaming your favorite movies and shows.
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                        margin: '50px 0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '35px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                animation: 'shimmer 3s infinite'
                            }}></div>
                            <div style={{
                                fontSize: '50px',
                                marginBottom: '20px',
                                filter: 'drop-shadow(0 0 15px rgba(102, 126, 234, 0.6))'
                            }}>📶</div>
                            <h3 style={{ margin: '0 0 15px', fontSize: '22px', fontWeight: '700' }}>Check Connection</h3>
                            <p style={{ margin: 0, fontSize: '15px', opacity: 0.9, lineHeight: '1.5' }}>
                                Verify your WiFi or mobile data is active and working properly.
                            </p>
                        </div>
                        <div style={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            padding: '35px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            border: '1px solid rgba(240, 147, 251, 0.3)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                animation: 'shimmer 3s infinite 1s'
                            }}></div>
                            <div style={{
                                fontSize: '50px',
                                marginBottom: '20px',
                                filter: 'drop-shadow(0 0 15px rgba(240, 147, 251, 0.6))'
                            }}>🔄</div>
                            <h3 style={{ margin: '0 0 15px', fontSize: '22px', fontWeight: '700' }}>Router Reset</h3>
                            <p style={{ margin: 0, fontSize: '15px', opacity: 0.9, lineHeight: '1.5' }}>
                                Try restarting your router or switching to mobile data temporarily.
                            </p>
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '15px',
                        padding: '25px',
                        margin: '40px 0',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '25px',
                            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                            color: 'white',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Pro Tip
                        </div>
                        <p style={{
                            margin: 0,
                            fontSize: '16px',
                            color: '#cbd5e0',
                            fontStyle: 'italic',
                            textAlign: 'center',
                            paddingTop: '10px'
                        }}>
                            🎭 "Even the best streaming experiences need a good connection" - Stay tuned! 📡
                        </p>
                    </div>
                    <button
                        onClick={handleRetry}
                        disabled={isRetrying}
                        style={{
                            background: isRetrying
                                ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
                                : 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '18px 40px',
                            fontSize: '18px',
                            fontWeight: '700',
                            borderRadius: '50px',
                            cursor: isRetrying ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isRetrying
                                ? '0 5px 15px rgba(107, 114, 128, 0.3)'
                                : '0 15px 35px rgba(6, 214, 160, 0.4)',
                            position: 'relative',
                            overflow: 'hidden',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            minWidth: '200px'
                        }}
                        onMouseOver={(e) => {
                            if (!isRetrying) {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 20px 40px rgba(6, 214, 160, 0.5)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isRetrying) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 15px 35px rgba(6, 214, 160, 0.4)';
                            }
                        }}
                    >
                        {isRetrying ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }}></div>
                                Reconnecting...
                            </span>
                        ) : (
                            '🔄 Try Again'
                        )}
                    </button>
                </div>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    div[style*="max-width: 900px"] {
                        max-width: 100%;
                        padding: 0 10px;
                    }
                    div[style*="width: 240px; height: 160px"] {
                        width: 180px;
                        height: 120px;
                    }
                    div[style*="width: 180px; height: 100px"] {
                        width: 135px;
                        height: 75px;
                    }
                    div[style*="width: 40px; height: 40px"] {
                        width: 30px;
                        height: 30px;
                        font-size: 16px;
                    }
                    div[style*="font-size: 40px"][style*="animation: disconnect-slash"] {
                        font-size: 30px;
                    }
                    div[style*="width: 100px; height: 3px"] {
                        width: 75px;
                    }
                    div[style*="font-size: 30px"][style*="animation: warning-bounce"] {
                        font-size: 24px;
                    }
                    div[style*="padding: 60px"] {
                        padding: 30px;
                    }
                    h1[style*="font-size: 56px"] {
                        font-size: 36px;
                    }
                    p[style*="font-size: 22px"] {
                        font-size: 16px;
                        max-width: 100%;
                    }
                    div[style*="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"] {
                        grid-template-columns: 1fr;
                    }
                    div[style*="padding: 35px"][style*="border-radius: 20px"] {
                        padding: 20px;
                    }
                    div[style*="font-size: 50px"][style*="margin-bottom: 20px"] {
                        font-size: 40px;
                        margin-bottom: 15px;
                    }
                    h3[style*="font-size: 22px"] {
                        font-size: 18px;
                    }
                    p[style*="font-size: 15px"] {
                        font-size: 12px;
                    }
                    div[style*="padding: 25px"][style*="border-radius: 15px"] {
                        padding: 15px;
                    }
                    div[style*="font-size: 12px"][style*="padding: 5px 15px"] {
                        font-size: 10px;
                        padding: 4px 12px;
                    }
                    p[style*="font-size: 16px"][style*="padding-top: 10px"] {
                        font-size: 12px;
                    }
                    button[style*="padding: 18px 40px"] {
                        padding: 12px 24px;
                        font-size: 14px;
                        min-width: 160px;
                    }
                    span[style*="gap: 10px"] {
                        gap: 8px;
                    }
                    div[style*="width: 16px; height: 16px"] {
                        width: 12px;
                        height: 12px;
                    }
                }
                @media (max-width: 400px) {
                    div[style*="width: 240px; height: 160px"] {
                        width: 160px;
                        height: 106px;
                    }
                    div[style*="width: 180px; height: 100px"] {
                        width: 120px;
                        height: 67px;
                    }
                    div[style*="width: 40px; height: 40px"] {
                        width: 24px;
                        height: 24px;
                        font-size: 14px;
                    }
                    div[style*="font-size: 40px"][style*="animation: disconnect-slash"] {
                        font-size: 24px;
                    }
                    div[style*="width: 100px; height: 3px"] {
                        width: 60px;
                    }
                    div[style*="font-size: 30px"][style*="animation: warning-bounce"] {
                        font-size: 20px;
                    }
                    div[style*="padding: 60px"] {
                        padding: 20px;
                    }
                    h1[style*="font-size: 56px"] {
                        font-size: 28px;
                    }
                    p[style*="font-size: 22px"] {
                        font-size: 14px;
                    }
                    div[style*="padding: 35px"][style*="border-radius: 20px"] {
                        padding: 15px;
                    }
                    div[style*="font-size: 50px"][style*="margin-bottom: 20px"] {
                        font-size: 32px;
                    }
                    h3[style*="font-size: 22px"] {
                        font-size: 16px;
                    }
                    p[style*="font-size: 15px"] {
                        font-size: 11px;
                    }
                    div[style*="padding: 25px"][style*="border-radius: 15px"] {
                        padding: 12px;
                    }
                    div[style*="font-size: 12px"][style*="padding: 5px 15px"] {
                        font-size: 9px;
                        padding: 3px 10px;
                    }
                    p[style*="font-size: 16px"][style*="padding-top: 10px"] {
                        font-size: 11px;
                    }
                    button[style*="padding: 18px 40px"] {
                        padding: 10px 20px;
                        font-size: 12px;
                        min-width: 140px;
                    }
                }
                @keyframes float-disconnect {
                    0%, 100% { transform: translateX(-50%) translateY(0px); }
                    50% { transform: translateX(-50%) translateY(-10px); }
                }
                @keyframes pulse-error {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                @keyframes disconnect-slash {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-5deg); }
                    75% { transform: rotate(5deg); }
                }
                @keyframes warning-bounce {
                    0%, 100% { transform: translateX(-50%) translateY(0px); }
                    50% { transform: translateX(-50%) translateY(-8px); }
                }
                @keyframes pulse-line {
                    0%, 100% { opacity: 0.3; width: 60px; }
                    50% { opacity: 1; width: 120px; }
                }
                @keyframes border-rotate {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};