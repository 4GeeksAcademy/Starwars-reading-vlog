export const initialStore = {
    people: [],
    planets: [],
    vehicles: [],
    starships: [],
    species: [],
    films: [],
    favorites: [],
    loading: true, // Start in a loading state
};

// Define action types for clarity and to avoid typos
export const actionTypes = {
    LOAD_DATA_START: "LOAD_DATA_START",
    LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
    LOAD_DATA_FAILURE: "LOAD_DATA_FAILURE",
    TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.LOAD_DATA_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.LOAD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                people: action.payload.people,
                planets: action.payload.planets,
                vehicles: action.payload.vehicles,
                starships: action.payload.starships,
                species: action.payload.species,
                films: action.payload.films,
            };
        
        case actionTypes.LOAD_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error, // Optionally store error state
            };

        case actionTypes.TOGGLE_FAVORITE:
            const item = action.payload;
            const isFavorite = state.favorites.some(fav => fav.uid === item.uid && fav.type === item.type);

            if (isFavorite) {
                // Remove from favorites
                const updatedFavorites = state.favorites.filter(fav => !(fav.uid === item.uid && fav.type === item.type));
                return {
                    ...state,
                    favorites: updatedFavorites,
                };
            } else {
                // Add to favorites
                return {
                    ...state,
                    favorites: [...state.favorites, item],
                };
            }

        default:
            return state;
    }
};

export default storeReducer;