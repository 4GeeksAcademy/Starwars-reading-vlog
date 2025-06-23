import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDetails } from "../fetch.js";
import Spinner from "../components/Spinner.jsx";

const Single = () => {
    const { resource, uid } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Updated image handling for local images
    const placeholderUrl = "/images/placeholder.jpg";
    
    const getLocalImageUrl = (resource, uid) => {
        const folderMap = {
            'people': 'characters',
            'planets': 'planets',
            'vehicles': 'vehicles',
            'starships': 'starships',
            'species': 'species',
            'films': 'films'
        };
        
        const folder = folderMap[resource] || resource;
        return `/images/${folder}/${uid}.jpg`;
    };

    const initialImageUrl = getLocalImageUrl(resource, uid);
    const [imgSrc, setImgSrc] = useState(initialImageUrl);

    useEffect(() => {
        setImgSrc(getLocalImageUrl(resource, uid));
    }, [resource, uid]);

    const handleImageError = () => {
        if (imgSrc !== placeholderUrl) {
            setImgSrc(placeholderUrl);
        } else {
            // Retro-styled fallback SVG
            setImgSrc(`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffd700;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%23ff8c42;stop-opacity:0.3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161636'/%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffd700' font-family='monospace' font-size='18' font-weight='bold'%3EIMAGE NOT FOUND%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%23ff6b6b' font-family='monospace' font-size='12'%3E[ ERROR 404 ]%3C/text%3E%3C/svg%3E`);
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getDetails(resource, uid);
                setDetails(data); 
            } catch (err) {
                console.error("Failed to fetch details:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [resource, uid]);

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Spinner />
        </div>
    );
    
    if (error) return (
        <div className="min-h-[60vh] flex items-center justify-center font-retro">
            <div className="text-center p-8 bg-sw-dark/50 rounded-lg border-2 border-sw-red">
                <div className="text-sw-red text-4xl font-mono-retro mb-4">[ ERROR ]</div>
                <div className="text-sw-yellow text-xl font-mono-retro uppercase tracking-wider">{error}</div>
            </div>
        </div>
    );
    
    if (!details || !details.properties) return (
        <div className="min-h-[60vh] flex items-center justify-center font-retro">
            <div className="text-center p-8 bg-sw-dark/50 rounded-lg border-2 border-sw-yellow/30">
                <div className="text-sw-yellow text-2xl font-mono-retro">[ NO DATA FOUND ]</div>
            </div>
        </div>
    );
    
    const renderDetails = () => {
        const props = details.properties;
        const commonKeys = ['name', 'height', 'mass', 'birth_year', 'gender', 'eye_color', 'hair_color', 'skin_color'];
        const planetKeys = ['diameter', 'rotation_period', 'orbital_period', 'gravity', 'population', 'climate', 'terrain', 'surface_water'];
        const vehicleKeys = ['model', 'manufacturer', 'cost_in_credits', 'length', 'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity'];
        
        let keysToShow;
        if (resource === 'people') {
            keysToShow = commonKeys;
        } else if (resource === 'planets') {
            keysToShow = ['name', ...planetKeys];
        } else if (resource === 'vehicles' || resource === 'starships') {
            keysToShow = ['name', ...vehicleKeys];
        } else {
            keysToShow = Object.keys(props).filter(key => props[key] && props[key] !== 'unknown' && props[key] !== 'n/a');
        }

        return keysToShow.map((key, index) => {
            if (props[key] && props[key] !== 'unknown' && props[key] !== 'n/a') {
                return (
                    <div key={key} className="mb-4 p-4 bg-gradient-to-r from-sw-dark/60 to-sw-darker/60 rounded-lg border border-sw-yellow/20 hover:border-sw-yellow/40 transition-all duration-300 group">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <span className="font-bold text-sw-yellow font-mono-retro uppercase tracking-wider text-sm block mb-1">
                                    <span className="text-sw-blue/60">#{(index + 1).toString().padStart(2, '0')}</span> {key.replace(/_/g, ' ')}:
                                </span>
                                <span className="text-gray-200 text-lg font-retro group-hover:text-sw-blue transition-colors duration-200">
                                    {props[key]}
                                </span>
                            </div>
                            <div className="w-2 h-2 bg-sw-green rounded-full animate-pulse opacity-60"></div>
                        </div>
                    </div>
                );
            }
            return null;
        });
    };

    const resourceIcons = {
        people: '👤',
        planets: '🌍',
        starships: '🚀',
        vehicles: '🚗',
        species: '👽',
        films: '🎬'
    };

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen font-retro">
            {/* Back button */}
            <div className="mb-6">
                <Link 
                    to="/" 
                    className="retro-button inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono-retro text-sm transition-all duration-200"
                >
                    <span>&lt;</span> BACK TO DATABASE
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 bg-gradient-to-br from-sw-dark/80 via-sw-darker/80 to-sw-dark/80 backdrop-blur-xl border-2 border-sw-yellow/30 rounded-lg p-8 shadow-retro relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-4 right-4 text-6xl opacity-10 text-sw-yellow">
                    {resourceIcons[resource] || '📊'}
                </div>
                
                {/* Image section */}
                <div className="lg:w-1/3 relative">
                    <div className="relative group">
                        <img 
                            src={imgSrc}
                            alt={details.properties.name} 
                            onError={handleImageError}
                            className="retro-image pixelated w-full h-auto object-cover rounded-lg shadow-retro border-2 border-sw-yellow/30 transition-all duration-300 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sw-dark/60 via-transparent to-transparent rounded-lg"></div>
                        
                        {/* Image overlay info - FIXED SYNTAX ERROR */}
                        <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-sw-dark/80 backdrop-blur-sm rounded p-2 border border-sw-yellow/30">
                                <div className="text-xs font-mono-retro text-sw-yellow uppercase tracking-wider">
                                    ID: #{uid.toString().padStart(3, '0')} | TYPE: {resource.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Details section */}
                <div className="lg:w-2/3 relative">
                    {/* Header */}
                    <div className="mb-8 pb-4 border-b-2 border-sw-yellow/30">
                        <h1 className="text-5xl font-bold text-sw-yellow retro-text-glow uppercase tracking-wider font-mono-retro mb-2">
                            <span className="text-sw-red">[</span>
                            {details.properties.name}
                            <span className="text-sw-red">]</span>
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-mono-retro">
                            <span className="text-sw-blue uppercase tracking-wider">
                                Category: {resource}
                            </span>
                            <span className="text-sw-yellow">•</span>
                            <span className="text-sw-green">Status: Active</span>
                            <span className="text-sw-yellow">•</span>
                            <span className="text-sw-orange">Database ID: {uid}</span>
                        </div>
                    </div>
                    
                    {/* Properties */}
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-sw-yellow/60 scrollbar-track-sw-dark/50">
                        {renderDetails()}
                    </div>
                    
                    {/* Status indicators */}
                    <div className="absolute top-0 right-0 flex gap-2">
                        <div className="w-2 h-2 bg-sw-green rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-sw-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-2 h-2 bg-sw-blue rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
                
                {/* Scanning line effect */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sw-yellow to-transparent animate-scan-line"></div>
            </div>
        </div>
    );
};

export default Single;