/**
 * API client helper to interact with Django Backend API.
 * Automatically falls back to relative /api or custom VITE_API_URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/** GET `path` and parse JSON. Resolves to null when the request was aborted. */
async function request(path, { signal } = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { signal });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    // Navigation cancellation is expected, not a backend error.
    if (signal?.aborted || err.name === 'AbortError') return null;
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
