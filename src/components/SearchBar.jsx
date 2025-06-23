import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-12 w-full max-w-2xl mx-auto relative font-retro">
            <div className="relative">
                {/* Main input */}
                <input
                    type="text"
                    placeholder="SEARCH DATABASE..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="retro-input w-full px-6 py-4 rounded-lg text-lg font-mono-retro uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal transition-all duration-300 shadow-retro"
                />
                
                {/* Search icon */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sw-yellow">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                
                {/* Terminal cursor */}
                {searchTerm === "" && (
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-sw-yellow animate-pulse font-mono-retro">
                        <span className="opacity-0">SEARCH DATABASE</span>
                        <span className="animate-pulse">_</span>
                    </div>
                )}
                
                {/* Active indicator */}
                {searchTerm && (
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-sw-green rounded-full animate-pulse shadow-glow-yellow"></div>
                )}
            </div>
            
            {/* Search status */}
            <div className="mt-3 flex justify-between items-center text-xs font-mono-retro">
                <div className="text-sw-blue/60 uppercase tracking-wider">
                    {searchTerm ? `SEARCHING: "${searchTerm}"` : "ENTER SEARCH PARAMETERS"}
                </div>
                <div className="text-sw-yellow/60">
                    {searchTerm.length}/50 CHARS
                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sw-yellow via-sw-orange to-sw-red rounded-lg opacity-20 blur-sm -z-10"></div>
        </div>
    );
};

export default SearchBar;