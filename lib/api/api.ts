// lib/api/api.ts

import axios from 'axios';

const finalBaseURL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const nextClient = axios.create({
  baseURL: finalBaseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const nextServer = axios.create({
  baseURL: finalBaseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
