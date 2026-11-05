/**
 * API client helper to interact with Django Backend API.
 * Automatically falls back to relative /api or custom VITE_API_URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const CACHE_TTL = 60_000;
const cache = new Map();

/** Shared by every caller, so it is never tied to one component's abort signal. */
function fetchJson(path) {
  const cached = cache.get(path);
  if (cached && Date.now() - cached.time < CACHE_TTL) return cached.promise;

  const promise = fetch(`${API_BASE_URL}${path}`).then((res) => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  });
  const entry = { promise, time: Date.now() };
  cache.set(path, entry);
  // Failed requests must not be cached.
  promise.catch(() => {
    if (cache.get(path) === entry) cache.delete(path);
  });
  return promise;
}

/**
 * GET `path` and parse JSON. Responses are reused for a minute, so moving
 * between pages doesn't refetch the same data. Resolves to null when aborted.
 */
async function request(path, { signal } = {}) {
  if (signal?.aborted) return null;

  const aborted = new Promise((resolve) => {
    signal?.addEventListener('abort', () => resolve(null), { once: true });
  });

  try {
    return await Promise.race([fetchJson(path), aborted]);
  } catch (err) {
    // Navigation cancellation is expected, not a backend error.
    if (signal?.aborted) return null;
    throw err;
  }
}

export const fetchAnnouncement = (options) => request('/announcement/', options);

export const fetchRecitations = (options) => request('/recitations/', options);

export function fetchCourseFiles({ category = null, signal } = {}) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/files/${query}`, { signal });
}

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health/`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}
