export const LoadingScreen = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            overflow: 'hidden',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
            }}></div>
            <div style={{
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '600px'
            }}>
                <div style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    margin: '0 auto 40px'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '160px',
                        height: '160px',
                        border: '3px solid transparent',
                        borderTop: '3px solid #ff6b6b',
                        borderRadius: '50%',
                        animation: 'spin 2s linear infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        width: '120px',
                        height: '120px',
                        border: '3px solid transparent',
                        borderRight: '3px solid #4ecdc4',
                        borderRadius: '50%',
                        animation: 'spin-reverse 1.5s linear infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>
                        🎬
                    </div>
                </div>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '30px 40px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}>
                    <h2 style={{ 
                        margin: '0 0 15px', 
                        fontSize: '32px', 
                        fontWeight: '700',
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Movix
                    </h2>
                    <p style={{ 
                        margin: '0 0 20px', 
                        opacity: 0.9, 
                        fontSize: '16px',
                        color: '#e0e6ed'
                    }}>
                        Preparing your entertainment experience
                    </p>
                    <p style={{ 
                        margin: '0 0 20px', 
                        opacity: 0.9, 
                        fontSize: '12px',
                        color: '#e0e6ed'
                    }}>
                        By - Balram Dhakad
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#ff6b6b',
                            animation: 'bounce 1.4s infinite ease-in-out both'
                        }}></div>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#4ecdc4',
                            animation: 'bounce 1.4s infinite ease-in-out both',
                            animationDelay: '0.16s'
                        }}></div>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#45b7d1',
                            animation: 'bounce 1.4s infinite ease-in-out both',
                            animationDelay: '0.32s'
                        }}></div>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    div[style*="width: 160px; height: 160px"] {
                        width: 120px;
                        height: 120px;
                    }
                    div[style*="top: 20px; left: 20px"] {
                        top: 15px;
                        left: 15px;
                        width: 90px;
                        height: 90px;
                    }
                    div[style*="width: 60px; height: 60px"] {
                        width: 45px;
                        height: 45px;
                        font-size: 18px;
                    }
                    div[style*="padding: 30px 40px"] {
                        padding: 20px;
                    }
                    h2[style*="font-size: 32px"] {
                        font-size: 24px;
                    }
                    p[style*="font-size: 16px"] {
                        font-size: 14px;
                    }
                    p[style*="font-size: 12px"] {
                        font-size: 10px;
                    }
                }
                @media (max-width: 400px) {
                    div[style*="width: 160px; height: 160px"] {
                        width: 100px;
                        height: 100px;
                    }
                    div[style*="top: 20px; left: 20px"] {
                        top: 12px;
                        left: 12px;
                        width: 76px;
                        height: 76px;
                    }
                    div[style*="width: 60px; height: 60px"] {
                        width: 38px;
                        height: 38px;
                        font-size: 16px;
                    }
                    div[style*="padding: 30px 40px"] {
                        padding: 15px;
                    }
                    h2[style*="font-size: 32px"] {
                        font-size: 20px;
                    }
                    p[style*="font-size: 16px"] {
                        font-size: 12px;
                    }
                    p[style*="font-size: 12px"] {
                        font-size: 9px;
                    }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                    0% { transform: rotate(360deg); }
                    100% { transform: rotate(0deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.05); }
                }
                @keyframes bounce {
                    0%, 80%, 100% { 
                        transform: scale(0);
                    } 40% { 
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};