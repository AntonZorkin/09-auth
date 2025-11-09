// lib/api/api.ts

import axios, { AxiosError } from 'axios';

const FALLBACK_URL = 'https://notehub-api.goit.study/api';

const FINAL_BASE_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK_URL;

export const nextClient = axios.create({
  baseURL: FINAL_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const nextServer = axios.create({
  baseURL: FINAL_BASE_URL,
  withCredentials: true,
});

export type ApiError = AxiosError<{
  error: string;
}>;
