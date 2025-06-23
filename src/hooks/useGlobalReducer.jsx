// Import necessary hooks and functions from React.
import { useReducer, createContext, useMemo } from "react";
import storeReducer, { initialStore, actionTypes } from "../store"; // Import our new reducer
import { getCollection } from "../fetch.js"; // Import fetch logic

// Re-name the context to be more generic, as in your boilerplate
export const Context = createContext();

// Define a provider component that encapsulates the store
export function StoreWrapper({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore);

    // Create action creators. These are functions our components will call.
    // useMemo prevents them from being recreated on every render.
    const actions = useMemo(() => ({
        loadData: async () => {
            dispatch({ type: actionTypes.LOAD_DATA_START });
            try {
                // Fetch all data in parallel
                const [people, planets, vehicles, starships, species, films] = await Promise.all([
                    getCollection("people"),
                    getCollection("planets"),
                    getCollection("vehicles"),
                    getCollection("starships"),
                    getCollection("species"),
                    getCollection("films"),
                ]);
                
                // Dispatch success action with the fetched data
                dispatch({ 
                    type: actionTypes.LOAD_DATA_SUCCESS, 
                    payload: { people, planets, vehicles, starships, species, films } 
                });

            } catch (error) {
                console.error("Error loading data:", error);
                dispatch({ 
                    type: actionTypes.LOAD_DATA_FAILURE, 
                    payload: { error: error.message }
                });
            }
        },

        toggleFavorite: (item) => {
            // This is a synchronous action, just dispatch it.
            dispatch({ type: actionTypes.TOGGLE_FAVORITE, payload: item });
        },
    }), []); // Empty dependency array means `actions` is created only once.

    // Provide the store AND our new actions to all child components.
    return (
        <Context.Provider value={{ store, actions }}>
            {children}
        </Context.Provider>
    );
}