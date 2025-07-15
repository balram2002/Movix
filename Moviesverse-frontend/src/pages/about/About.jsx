import React from 'react'
import "./about.css";
import { Helmet } from 'react-helmet-async';

function About() {
    return (
        <div className='aboutmaincontainer45z'>
            <Helmet>
                <title>About Moviesverse | Moviesverse</title>
                <meta name="description" content="About page of moviesverse where users can learn about the story behind moviesverse, its features, technical stack, and how it evolved from a side project to a daily streaming habit. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
                <meta property="og:title" content="About Moviesverse | Moviesverse" />
                <meta property="og:description" content="About page of moviesverse where users can learn about the story behind moviesverse, its features, technical stack, and how it evolved from a side project to a daily streaming habit. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
            </Helmet>
            <div className="about-hero">
                <div className="hero-background">
                    <div className="floating-elements">
                        <div className="floating-circle circle-1"></div>
                        <div className="floating-circle circle-2"></div>
                        <div className="floating-circle circle-3"></div>
                    </div>
                </div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-icon">🎬</span>
                        <span>Built with Passion</span>
                    </div>
                    <h1 className="hero-title">
                        From Side Project to <span className="gradient-text">Streaming Habit</span>
                    </h1>
                    <p className="hero-subtitle">
                        Meet Moviesverse — a full-fledged movie and TV streaming web app built with passion, 
                        powered by MERN Stack, TMDB API, and Firebase Auth.
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">30+</div>
                            <div className="stat-label">Weekly Users</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Daily Usage</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">MERN</div>
                            <div className="stat-label">Tech Stack</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-content">
                <section className="story-section">
                    <div className="section-header">
                        <div className="section-icon">
                            <span className="icon-emoji">💡</span>
                        </div>
                        <h2>The Story Behind Moviesverse</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="story-content">
                        <div className="story-visual">
                            <div className="code-window">
                                <div className="window-header">
                                    <div className="window-buttons">
                                        <span className="btn btn-close"></span>
                                        <span className="btn btn-minimize"></span>
                                        <span className="btn btn-maximize"></span>
                                    </div>
                                </div>
                                <div className="code-content">
                                    <div className="code-line">
                                        <span className="code-keyword">const</span>
                                        <span className="code-variable"> project</span>
                                        <span className="code-operator"> = </span>
                                        <span className="code-string">'portfolio'</span>
                                    </div>
                                    <div className="code-line">
                                        <span className="code-keyword">const</span>
                                        <span className="code-variable"> outcome</span>
                                        <span className="code-operator"> = </span>
                                        <span className="code-string">'daily-use-app'</span>
                                    </div>
                                    <div className="code-line">
                                        <span className="code-comment">// Magic happens here ✨</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="story-text-content">
                            <p className="story-text">
                                As developers, we build dozens of projects. But how many do we actually use ourselves every single day? 
                                For me, that project is Moviesverse. What started as just another portfolio project turned into my most 
                                practical and personal app — one that I use to stream my favorite content regularly, along with 30+ real 
                                users who stream weekly too!
                            </p>
                            <div className="story-highlight">
                                <div className="highlight-icon">🚀</div>
                                <div className="highlight-text">From concept to daily habit in just a few months</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="upgrade-section">
                    <div className="section-header">
                        <div className="section-icon">
                            <span className="icon-emoji">⚡</span>
                        </div>
                        <h2>Why It Matters</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="upgrade-intro-container">
                        <div className="upgrade-visual">
                            <div className="progress-circle">
                                <div className="circle-progress">
                                    <div className="progress-value">v2.0</div>
                                </div>
                                <div className="progress-label">Major Upgrade</div>
                            </div>
                        </div>
                        <p className="upgrade-intro">
                            Over time, Moviesverse became more than a MERN stack project — it became my go-to streaming platform. 
                            So I gave it a serious upgrade with enhanced features and improved user experience.
                        </p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <div className="feature-glow glow-blue"></div>
                            <h3>Improved Error Handling</h3>
                            <p>More robust on both client & server</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">✨</div>
                            <div className="feature-glow glow-purple"></div>
                            <h3>UI Enhancements</h3>
                            <p>Cleaner, faster, smoother interactions</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🧠</div>
                            <div className="feature-glow glow-green"></div>
                            <h3>Smarter Recommendations</h3>
                            <p>Powered by your likes, watchlist & favorite genres</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <div className="feature-glow glow-orange"></div>
                            <h3>More Engaging Interactions</h3>
                            <p>Making Moviesverse feel tailored to you</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📤</div>
                            <div className="feature-glow glow-pink"></div>
                            <h3>Shareable Content</h3>
                            <p>Because good content should be easy to spread</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <div className="feature-glow glow-yellow"></div>
                            <h3>Performance Boosts</h3>
                            <p>Bug fixes for a seamless streaming experience</p>
                        </div>
                    </div>
                </section>

                <section className="tech-section">
                    <div className="section-header">
                        <div className="section-icon">
                            <span className="icon-emoji">🔧</span>
                        </div>
                        <h2>Technical Features</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="tech-showcase">
                        <div className="tech-visual">
                            <div className="tech-stack-visual">
                                <div className="stack-layer layer-1">
                                    <span className="layer-label">React</span>
                                </div>
                                <div className="stack-layer layer-2">
                                    <span className="layer-label">Node.js</span>
                                </div>
                                <div className="stack-layer layer-3">
                                    <span className="layer-label">Express</span>
                                </div>
                                <div className="stack-layer layer-4">
                                    <span className="layer-label">MongoDB</span>
                                </div>
                            </div>
                            <div className="tech-connections">
                                <div className="connection-line line-1"></div>
                                <div className="connection-line line-2"></div>
                                <div className="connection-line line-3"></div>
                            </div>
                        </div>
                        <div className="tech-stack">
                            <div className="tech-item">
                                <span className="tech-icon">🌟</span>
                                <span>MERN Stack + TMDB API</span>
                                <div className="tech-pulse pulse-1"></div>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">🎃</span>
                                <span>Authentication & Authorization with Firebase</span>
                                <div className="tech-pulse pulse-2"></div>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">🚀</span>
                                <span>Movies, TV Shows, Explore, Home & Search Pages</span>
                                <div className="tech-pulse pulse-3"></div>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">👌</span>
                                <span>Global State Management with Redux-Toolkit</span>
                                <div className="tech-pulse pulse-4"></div>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">💖</span>
                                <span>Add/Remove to Liked & Watchlist</span>
                                <div className="tech-pulse pulse-5"></div>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">👾</span>
                                <span>Dynamic Recommendations based on preferences</span>
                                <div className="tech-pulse pulse-6"></div>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">🎬</span>
                                <span>Stream & Get Content Details</span>
                                <div className="tech-pulse pulse-7"></div>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">🐞</span>
                                <span>Comprehensive Error Handling</span>
                                <div className="tech-pulse pulse-8"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="cta-background">
                        <div className="cta-particles">
                            <div className="particle particle-1"></div>
                            <div className="particle particle-2"></div>
                            <div className="particle particle-3"></div>
                            <div className="particle particle-4"></div>
                            <div className="particle particle-5"></div>
                        </div>
                    </div>
                    <div className="cta-content">
                        <div className="cta-icon">
                            <span className="play-icon">▶️</span>
                        </div>
                        <h2>Ready to Experience Moviesverse?</h2>
                        <p>
                            Whether you're a developer, movie lover, or someone who appreciates good UX — 
                            I'd love your feedback. Let's keep building things that people actually use.
                        </p>
                        <div className="cta-buttons">
                            <a href="https://www.moviesverse.studio/" className="cta-button primary" target="_self" rel="noopener noreferrer">
                                <span className="button-text">Try Moviesverse</span>
                                <span className="button-icon">🚀</span>
                            </a>
                            <div className="feedback-text">
                                <div className="feedback-icons">
                                    <span className="feedback-icon">⭐</span>
                                    <span className="feedback-icon">📤</span>
                                    <span className="feedback-icon">💬</span>
                                </div>
                                <span>Whether it's a star, a share, or just a message — everything counts.</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="disclaimer-section">
                    <div className="disclaimer-content">
                        <h3>Important Note</h3>
                        <p>
                            The TMDB API may occasionally experience high traffic, which can result in temporary disruptions 
                            or a lack of response. If you encounter this issue, consider waiting a few moments, switching to 
                            a different network, or using a VPN to restore access.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default About