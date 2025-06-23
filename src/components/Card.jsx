import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Card = ({ item, resource }) => {
    const { store, actions } = useContext(Context);

    // Updated image handling for local images in images folder
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

    const initialImageUrl = getLocalImageUrl(resource, item.uid);
    const [imgSrc, setImgSrc] = useState(initialImageUrl);

    useEffect(() => {
        setImgSrc(getLocalImageUrl(resource, item.uid));
    }, [resource, item.uid]);

    const handleImageError = () => {
        if (imgSrc !== placeholderUrl) {
            setImgSrc(placeholderUrl);
        } else {
            // Retro-styled fallback SVG
            setImgSrc(`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffd700;stop-opacity:0.2'/%3E%3Cstop offset='100%25' style='stop-color:%23ff8c42;stop-opacity:0.2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161636'/%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffd700' font-family='monospace' font-size='14' font-weight='bold'%3E${encodeURIComponent(item.name)}%3C/text%3E%3C/svg%3E`);
        }
    };

    if (!item || !item.uid) {
        return null;
    }

    const itemWithResourceType = { ...item, type: resource };
    const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === resource);

    return (
        <div className="retro-card w-72 m-2 flex-shrink-0 transition-all duration-300 hover:scale-105 hover:animate-pulse-glow rounded-lg overflow-hidden font-retro">
            <figure className="relative overflow-hidden">
                <img 
                    src={imgSrc}
                    alt={item.name} 
                    onError={handleImageError}
                    className="retro-image pixelated h-48 w-full object-cover transition-all duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sw-dark/80 via-transparent to-transparent opacity-60"></div>
            </figure>
            <div className="card-body p-4 relative">
                <h2 className="card-title text-lg font-bold text-sw-yellow retro-text-glow uppercase tracking-wider font-mono-retro">
                    {item.name}
                </h2>
                <div className="absolute top-2 right-2 w-2 h-2 bg-sw-yellow rounded-full animate-pulse shadow-glow-yellow"></div>
                
                <div className="card-actions justify-between items-center mt-6">
                    <Link 
                        to={`/${resource}/${item.uid}`} 
                        className="retro-button px-4 py-2 rounded-md font-mono-retro text-sm transition-all duration-200 hover:animate-retro-bounce"
                    >
                        &gt; LEARN MORE_
                    </Link>
                    
                    <button 
                        onClick={() => actions.toggleFavorite(itemWithResourceType)} 
                        className="text-2xl transition-all duration-300 hover:scale-125 hover:animate-pulse"
                    >
                        <FontAwesomeIcon 
                            icon={isFavorite ? fasHeart : farHeart} 
                            className={`${isFavorite ? "text-sw-red animate-pulse" : "text-gray-400 hover:text-sw-red"} drop-shadow-lg`}
                            style={isFavorite ? { filter: 'drop-shadow(0 0 8px #ff6b6b)' } : {}}
                        />
                    </button>
                </div>
                
                {/* Retro corner details */}
                <div className="absolute bottom-1 left-1 text-xs text-sw-yellow/60 font-mono-retro">
                    #{item.uid.toString().padStart(3, '0')}
                </div>
                <div className="absolute top-1 left-1 text-xs text-sw-blue/60 font-mono-retro uppercase">
                    {resource}
                </div>
            </div>
        </div>
    );
};

export default Card;