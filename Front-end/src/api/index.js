/**
 * API client helper to interact with Django Backend API.
 * Automatically falls back to relative /api or custom VITE_API_URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchRecitations() {
  try {
    const res = await fetch(`${API_BASE_URL}/recitations/`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend API connection offline/error, using static recitations fallback:', err.message);
    return null;
  }
}

export async function fetchCourseFiles(category = null) {
  try {
    const url = category ? `${API_BASE_URL}/files/?category=${category}` : `${API_BASE_URL}/files/`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend API connection offline/error, using static course files fallback:', err.message);
    return null;
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
