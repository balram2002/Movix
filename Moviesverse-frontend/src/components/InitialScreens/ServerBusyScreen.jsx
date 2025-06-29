export const ServerBusyScreen = () => {
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
                maxWidth: '800px',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{
                    position: 'relative',
                    margin: '0 auto 50px',
                    width: '200px',
                    height: '120px'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '160px',
                        height: '90px',
                        background: 'linear-gradient(45deg, #1f2937, #374151)',
                        borderRadius: '12px',
                        border: '3px solid #ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'shake 2s ease-in-out infinite'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '45px',
                            background: '#000',
                            borderRadius: '4px',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                fontSize: '24px',
                                color: '#ef4444',
                                animation: 'blink 1s infinite'
                            }}>
                                503
                            </div>
                        </div>
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px',
                        height: '25px',
                        background: '#ef4444',
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        animation: 'pulse-warning 1.5s ease-in-out infinite'
                    }}></div>
                </div>
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '50px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}>
                    <h1 style={{ 
                        fontSize: '48px', 
                        margin: '0 0 20px', 
                        fontWeight: '800',
                        background: 'linear-gradient(45deg, #ef4444, #f97316, #eab308)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
                    }}>
                        Server Overload
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        lineHeight: '1.6', 
                        margin: '0 0 40px',
                        color: '#d1d5db',
                        fontWeight: '400'
                    }}>
                        Our streaming servers are experiencing high demand.<br/>
                        Choose your next move:
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '25px',
                        margin: '40px 0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            padding: '30px',
                            borderRadius: '16px',
                            textAlign: 'center',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}>
                            <div style={{ 
                                fontSize: '40px', 
                                marginBottom: '15px',
                                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))'
                            }}>⏱️</div>
                            <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '600' }}>Wait & Retry</h3>
                            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: '1.4' }}>
                                Peak hours detected. Try again in a few minutes when traffic decreases.
                            </p>
                        </div>
                        <div style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                            padding: '30px',
                            borderRadius: '16px',
                            textAlign: 'center',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}>
                            <div style={{ 
                                fontSize: '40px', 
                                marginBottom: '15px',
                                filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))'
                            }}>🛡️</div>
                            <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '600' }}>Use VPN</h3>
                            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: '1.4' }}>
                                Connect through a different region to bypass server congestion.
                            </p>
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '20px',
                        margin: '30px 0',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <p style={{
                            margin: 0,
                            fontSize: '14px',
                            color: '#9ca3af',
                            fontStyle: 'italic'
                        }}>
                            🎭 "The show must go on" - but sometimes the servers need a coffee break ☕
                        </p>
                    </div>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '16px 32px',
                            fontSize: '16px',
                            fontWeight: '600',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 15px 35px rgba(139, 92, 246, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.3)';
                        }}
                    >
                        🔄 Retry Connection
                    </button>
                </div>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    div[style*="max-width: 800px"] {
                        max-width: 100%;
                        padding: 0 10px;
                    }
                    div[style*="width: 200px; height: 120px"] {
                        width: 160px;
                        height: 96px;
                    }
                    div[style*="width: 160px; height: 90px"] {
                        width: 128px;
                        height: 72px;
                    }
                    div[style*="width: 80px; height: 45px"] {
                        width: 64px;
                        height: 36px;
                    }
                    div[style*="font-size: 24px"] {
                        font-size: 20px;
                    }
                    div[style*="width: 20px; height: 25px"] {
                        width: 16px;
                        height: 20px;
                    }
                    div[style*="padding: 50px"] {
                        padding: 30px;
                    }
                    h1[style*="font-size: 48px"] {
                        font-size: 32px;
                    }
                    p[style*="font-size: 20px"] {
                        font-size: 16px;
                    }
                    div[style*="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))"] {
                        grid-template-columns: 1fr;
                    }
                    div[style*="padding: 30px"][style*="border-radius: 16px"] {
                        padding: 20px;
                    }
                    div[style*="font-size: 40px"][style*="margin-bottom: 15px"] {
                        font-size: 32px;
                        margin-bottom: 10px;
                    }
                    h3[style*="font-size: 20px"] {
                        font-size: 18px;
                    }
                    p[style*="font-size: 14px"] {
                        font-size: 12px;
                    }
                    div[style*="padding: 20px"][style*="border-radius: 12px"] {
                        padding: 15px;
                    }
                    button[style*="padding: 16px 32px"] {
                        padding: 12px 24px;
                        font-size: 14px;
                    }
                }
                @media (max-width: 400px) {
                    div[style*="width: 200px; height: 120px"] {
                        width: 140px;
                        height: 84px;
                    }
                    div[style*="width: 160px; height: 90px"] {
                        width: 112px;
                        height: 63px;
                    }
                    div[style*="width: 80px; height: 45px"] {
                        width: 56px;
                        height: 32px;
                    }
                    div[style*="font-size: 24px"] {
                        font-size: 18px;
                    }
                    div[style*="width: 20px; height: 25px"] {
                        width: 14px;
                        height: 17px;
                    }
                    div[style*="padding: 50px"] {
                        padding: 20px;
                    }
                    h1[style*="font-size: 48px"] {
                        font-size: 24px;
                    }
                    p[style*="font-size: 20px"] {
                        font-size: 14px;
                    }
                    div[style*="padding: 30px"][style*="border-radius: 16px"] {
                        padding: 15px;
                    }
                    div[style*="font-size: 40px"][style*="margin-bottom: 15px"] {
                        font-size: 28px;
                    }
                    h3[style*="font-size: 20px"] {
                        font-size: 16px;
                    }
                    button[style*="padding: 16px 32px"] {
                        padding: 10px 20px;
                        font-size: 12px;
                    }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(-50%) rotate(0deg); }
                    25% { transform: translateX(-50%) rotate(-1deg); }
                    75% { transform: translateX(-50%) rotate(1deg); }
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0.3; }
                }
                @keyframes pulse-warning {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
};