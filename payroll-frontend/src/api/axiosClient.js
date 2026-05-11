import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── HATEOAS helpers ───────────────────────────────────────────
// Spring HATEOAS wraps collections in { _embedded: { employeeList: [...] } }
// and individual entities in { id, firstName, ..., _links: { self: { href } } }

/**
 * Extracts the actual data array from a Spring HATEOAS collection response.
 * @param {object} data  – The Axios response.data
 * @param {string} key   – The key inside _embedded (e.g. "employeeList", "orderList")
 * @returns {Array}
 */
export function extractCollection(data, key) {
    if (data?._embedded?.[key]) {
        return data._embedded[key];
    }
    // Fallback: if the response is already a plain array
    if (Array.isArray(data)) {
        return data;
    }
    return [];
}

/**
 * Extracts the entity data from a Spring HATEOAS EntityModel response.
 * Strips the _links property and returns the plain entity.
 */
export function extractEntity(data) {
    if (!data) return data;
    const { _links, ...entity } = data;
    return entity;
}

/**
 * Extracts a specific link href from a HATEOAS response.
 */
export function getLink(data, rel) {
    return data?._links?.[rel]?.href ?? null;
}

export default axiosClient;
