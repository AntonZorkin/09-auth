// lib/api/api.ts

import axios, { AxiosError } from "axios";

export type ApiError = AxiosError;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set.');
}
const baseURL = `${API_URL}/api`;

export const nextClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});