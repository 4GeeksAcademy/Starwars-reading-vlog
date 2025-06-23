import React, { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/useGlobalReducer";
import Card from "../components/Card.jsx";
import Spinner from "../components/Spinner.jsx";
import SearchBar from "../components/SearchBar.jsx";

const Home = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Load data only if it's not already loaded
        if (store.people.length === 0 && store.planets.length === 0 && 
            store.vehicles.length === 0 && store.starships.length === 0 && 
            store.species.length === 0 && store.films.length === 0) {
            actions.loadData();
        }
    }, []);

    const filterItems = (items) => {
        if (!searchTerm || !items) return items || [];
        return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const sectionConfig = [
        { title: "Characters", data: store.people || [], resource: "people", icon: "👤", color: "sw-yellow" },
        { title: "Planets", data: store.planets || [], resource: "planets", icon: "🌍", color: "sw-blue" },
        { title: "Starships", data: store.starships || [], resource: "starships", icon: "🚀", color: "sw-red" },
        { title: "Vehicles", data: store.vehicles || [], resource: "vehicles", icon: "🚗", color: "sw-orange" },
        { title: "Species", data: store.species || [], resource: "species", icon: "👽", color: "sw-green" },
        { title: "Films", data: store.films || [], resource: "films", icon: "🎬", color: "sw-purple" }
    ];

    const renderCarousel = (title, items, resource, icon, color) => {
        // Ensure items is always an array
        const safeItems = items || [];
        const filteredItems = filterItems(safeItems);
        
        return (
            <div className="mb-16 relative" key={resource}>
                {/* Enhanced Section Header */}
                <div className="relative mb-6 p-4 bg-gradient-to-r from-sw-dark via-sw-darker to-sw-dark rounded-lg border-2 border-sw-yellow/30">
                    <div className="flex items-center justify-between">
                        <h1 className={`text-4xl font-bold text-${color} retro-text-glow uppercase tracking-wider font-mono-retro flex items-center gap-4`}>
                            <span className="text-2xl">{icon}</span>
                            <span className="text-sw-red">[</span>
                            {title.toUpperCase()}
                            <span className="text-sw-red">]</span>
                            <span className="text-sm text-sw-blue/60 ml-2">
                                {filteredItems.length.toString().padStart(2, '0')} ENTRIES
                            </span>
                        </h1>
                        
                        {/* Status indicator */}
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-sw-green rounded-full animate-pulse shadow-glow-yellow"></div>
                            <span className="text-xs text-sw-green font-mono-retro uppercase tracking-wider">
                                ONLINE
                            </span>
                        </div>
                    </div>
                    
                    {/* Decorative scanning line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sw-yellow to-transparent animate-scan-line"></div>
                </div>

                {/* Cards Container with enhanced styling */}
                <div className="relative">
                    <div className="flex overflow-x-auto p-4 space-x-6 scrollbar-thin scrollbar-thumb-sw-yellow/80 scrollbar-track-sw-dark/50 pb-6">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <div key={item.uid} className="relative">
                                    <Card item={item} resource={resource} />
                                    {/* Item number indicator */}
                                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-sw-yellow text-black rounded-full flex items-center justify-center text-xs font-bold font-mono-retro">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex-1 text-center p-8">
                                <div className="text-sw-red text-2xl font-mono-retro mb-2">[ NO DATA FOUND ]</div>
                                <p className="text-sw-yellow/60 font-mono-retro uppercase tracking-wider">
                                    {searchTerm ? `No ${title.toLowerCase()} match "${searchTerm}"` : `No ${title.toLowerCase()} available`}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {/* Gradient fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-sw-dark to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-sw-dark to-transparent pointer-events-none z-10"></div>
                </div>
            </div>
        );
    };

    if (store.loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-retro">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-sw-yellow retro-text-glow uppercase tracking-wider font-mono-retro mb-4">
                        <span className="text-sw-red">[</span>
                        ACCESSING DATABASE
                        <span className="text-sw-red">]</span>
                    </h2>
                    <div className="text-sw-blue/80 text-lg font-mono-retro">
                        Connecting to SWAPI mainframe...
                    </div>
                </div>
                <Spinner />
                <div className="mt-4 text-sw-yellow/60 text-sm font-mono-retro animate-pulse">
                    LOADING: {Math.floor(Math.random() * 100)}% COMPLETE
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 font-retro">
            {/* Hero Section */}
            <div className="text-center mb-12 relative">
                <div className="relative p-8 bg-gradient-to-br from-sw-dark/80 via-sw-darker/80 to-sw-dark/80 rounded-lg border-2 border-sw-yellow/30 backdrop-blur-sm">
                    <h1 className="text-6xl font-bold text-sw-yellow retro-text-glow uppercase tracking-wider font-mono-retro mb-4">
                        <span className="text-sw-red">&gt;</span>
                        STAR WARS
                        <span className="text-sw-blue">_</span>
                        DATABASE
                        <span className="text-sw-red">&lt;</span>
                    </h1>
                    <p className="text-xl text-sw-blue/80 font-mono-retro uppercase tracking-wider">
                        Explore the galaxy far, far away...
                    </p>
                    
                    {/* Status bar */}
                    <div className="mt-6 flex justify-center items-center gap-4 text-sm font-mono-retro">
                        <span className="text-sw-green">STATUS: ONLINE</span>
                        <span className="text-sw-yellow">•</span>
                        <span className="text-sw-blue">
                            ENTRIES: {(store.people?.length || 0) + (store.planets?.length || 0) + (store.starships?.length || 0) + (store.vehicles?.length || 0) + (store.species?.length || 0) + (store.films?.length || 0)}
                        </span>
                        <span className="text-sw-yellow">•</span>
                        <span className="text-sw-orange">FAVORITES: {store.favorites?.length || 0}</span>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Data Sections using your existing structure */}
            {sectionConfig.map(({ title, data, resource, icon, color }) => 
                renderCarousel(title, data, resource, icon, color)
            )}
        </div>
    );
};

export default Home;