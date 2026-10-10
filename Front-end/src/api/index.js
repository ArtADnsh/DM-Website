/**
 * API client helper to interact with Django Backend API.
 * Automatically falls back to relative /api or custom VITE_API_URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchAnnouncement({ signal } = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}/announcement/`, { signal });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    // Navigation cancellation is expected, not a backend error.
    if (signal?.aborted || err.name === 'AbortError') return null;
    throw err;
  }
}

export async function fetchRecitations({ signal } = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}/recitations/`, { signal });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    // Navigation cancellation is expected, not a backend error.
    if (signal?.aborted || err.name === 'AbortError') return null;
    throw err;
  }
}

export async function fetchCourseFiles(category = null, { signal } = {}) {
  try {
    const url = category ? `${API_BASE_URL}/files/?category=${category}` : `${API_BASE_URL}/files/`;
    const res = await fetch(url, { signal });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    // Navigation cancellation is expected, not a backend error.
    if (signal?.aborted || err.name === 'AbortError') return null;
    throw err;
  }
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
