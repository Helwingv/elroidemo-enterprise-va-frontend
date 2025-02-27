export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
export const TENANT = import.meta.env.VITE_TENANT || 'NBA';
export const PORT = TENANT === 'NBA' ? 3000 : 3001;