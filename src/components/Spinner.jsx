import React from 'react';

const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full my-10 font-retro">
            <div className="relative mb-6">
                {/* Main spinner */}
                <div className="w-16 h-16 rounded-full border-4 border-sw-yellow/30"></div>
                <div className="w-16 h-16 rounded-full animate-spin border-4 border-sw-yellow border-t-transparent absolute top-0 left-0 shadow-glow-yellow"></div>
                
                {/* Inner spinner */}
                <div className="w-8 h-8 rounded-full border-2 border-sw-blue/50 absolute top-4 left-4"></div>
                <div className="w-8 h-8 rounded-full animate-spin border-2 border-sw-blue border-t-transparent absolute top-4 left-4 shadow-glow-blue" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                
                {/* Center dot */}
                <div className="w-2 h-2 bg-sw-red rounded-full absolute top-7 left-7 animate-pulse shadow-glow-red"></div>
            </div>
            
            {/* Loading text */}
            <div className="text-center">
                <div className="text-sw-yellow font-mono-retro text-lg uppercase tracking-wider mb-2 animate-pulse">
                    [ LOADING ]
                </div>
                <div className="text-sw-blue/80 font-mono-retro text-sm">
                    Accessing Imperial Database...
                </div>
            </div>
            
            {/* Progress indicators */}
            <div className="mt-4 flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div 
                        key={i}
                        className="w-2 h-2 bg-sw-yellow rounded-full animate-pulse"
                        style={{ 
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '1s'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Spinner;