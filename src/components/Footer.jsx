import React from 'react';

const AppFooter = () => {
    const handleGitHubClick = () => {
        window.open("https://github.com/sippinwindex", "_blank", "noopener,noreferrer");
    };

    return (
        <footer className="retro-footer">
            <div className="footer-content">
                <span className="font-mono-retro tracking-wider">
                    Crafted with{" "}
                    <button 
                        onClick={handleGitHubClick}
                        className="retro-heart clickable-heart"
                        aria-label="Visit SippinWindex GitHub Profile"
                        title="Click to visit my GitHub!"
                    >
                        ❤
                    </button>
                    {" "}by{" "}
                    <button 
                        onClick={handleGitHubClick}
                        className="clickable-name"
                        aria-label="Visit SippinWindex GitHub Profile"
                        title="Click to visit my GitHub!"
                    >
                        Jandry Fernandez
                    </button>
                </span>
                <span className="github-link-container">
                    <a
                        href="https://github.com/sippinwindex"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="SippinWindex GitHub Profile"
                        className="github-icon-link"
                        onClick={(e) => {
                            e.preventDefault();
                            handleGitHubClick();
                        }}
                        title="Visit my GitHub profile!"
                    >
                        <i className="fab fa-github"></i>
                    </a>
                </span>
            </div>
            <div className="footer-c64-line font-mono-retro">
                <span className="text-sw-blue">&gt;</span> READY <span className="text-sw-blue">&lt;</span>
                <span className="ml-4 text-sw-yellow/60">SYSTEM STATUS: OPERATIONAL</span>
            </div>
        </footer>
    );
};

// Export as both Footer and AppFooter for compatibility
export const Footer = AppFooter;
export default AppFooter;