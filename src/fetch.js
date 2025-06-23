const BASE_URL = "https://www.swapi.tech/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }
    const data = await response.json();
    return data;
};

// Fetches the main lists (people, planets, vehicles, starships, species, films)
export const getCollection = async (resource) => {
    const response = await fetch(`${BASE_URL}/${resource}`);
    const data = await handleResponse(response);
    return data.results;
};

// Fetches the detailed information for a single item
export const getDetails = async (resource, uid) => {
    const response = await fetch(`${BASE_URL}/${resource}/${uid}`);
    const data = await handleResponse(response);
    return data.result;
};