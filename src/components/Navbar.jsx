import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="retro-nav sticky top-0 z-50 p-4 relative font-retro">
            <div className="container mx-auto flex justify-between items-center">
                <Link 
                    to="/" 
                    className="text-3xl font-bold text-sw-yellow retro-text-glow tracking-wider uppercase font-mono-retro hover:animate-text-flicker transition-all duration-300"
                >
                    <span className="text-sw-red">[</span>
                    SWAPI
                    <span className="text-sw-blue">_</span>
                    VLOG
                    <span className="text-sw-red">]</span>
                </Link>
                
                <div className="dropdown dropdown-end relative">
                    <button 
                        tabIndex={0} 
                        className="retro-button px-6 py-3 rounded-md font-mono-retro text-sm uppercase tracking-wider flex items-center gap-3 hover:animate-retro-bounce transition-all duration-300"
                    >
                        <span className="text-xs">&gt;</span>
                        FAVORITES
                        <span className="bg-sw-red text-white rounded-full px-2 py-1 text-xs font-bold animate-pulse shadow-glow-red">
                            {store.favorites.length.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs">&lt;</span>
                    </button>
                    
                    <ul 
                        tabIndex={0} 
                        className="retro-dropdown dropdown-content menu p-2 shadow-retro rounded-lg w-80 mt-2 max-h-96 overflow-y-auto font-mono-retro"
                    >
                        {store.favorites.length > 0 ? (
                            <>
                                <li className="mb-2">
                                    <div className="text-sw-yellow text-center font-bold uppercase tracking-wider text-sm border-b border-sw-yellow/30 pb-2">
                                        &gt; FAVORITES DATABASE &lt;
                                    </div>
                                </li>
                                {store.favorites.map((fav, index) => (
                                    <li key={`${fav.type}-${fav.uid}`} className="mb-1">
                                        <div className="flex justify-between items-center w-full p-2 rounded hover:bg-sw-yellow/10 transition-all duration-200 group">
                                            <Link 
                                                to={`/${fav.type}/${fav.uid}`}
                                                className="flex-1 text-left text-sw-blue hover:text-sw-yellow transition-colors duration-200"
                                            >
                                                <span className="text-xs text-sw-yellow/60">#{(index + 1).toString().padStart(2, '0')}</span>
                                                <span className="ml-2 uppercase">{fav.name}</span>
                                                <div className="text-xs text-sw-orange/70 mt-1">TYPE: {fav.type.toUpperCase()}</div>
                                            </Link>
                                            <button 
                                                onClick={() => actions.toggleFavorite(fav)} 
                                                className="text-sw-red hover:text-white transition-all duration-200 hover:scale-125 hover:animate-pulse ml-2 p-1"
                                                title="Remove from favorites"
                                            >
                                                <i className="fas fa-times text-sm"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                                <li className="mt-2 pt-2 border-t border-sw-yellow/30">
                                    <div className="text-center text-xs text-sw-yellow/60 uppercase tracking-wider">
                                        TOTAL: {store.favorites.length} ENTRIES
                                    </div>
                                </li>
                            </>
                        ) : (
                            <li>
                                <div className="text-center p-4">
                                    <div className="text-sw-red text-lg mb-2">[ EMPTY ]</div>
                                    <div className="text-sw-yellow/60 text-sm uppercase tracking-wider">
                                        No favorites in database
                                    </div>
                                    <div className="text-xs text-sw-blue/60 mt-2">
                                        Click ♥ to add items
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            
            {/* Scanning line effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sw-yellow to-transparent animate-scan-line"></div>
        </nav>
    );
};