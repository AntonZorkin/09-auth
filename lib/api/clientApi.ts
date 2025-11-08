// lib/api/clientApi.ts

import { nextClient as clientApi } from './api';
import type { NewNote, Note } from '@/types/note';
import { UpdateUserPayload, User } from '@/types/user';

interface UserCredentials {
  email: string;
  password: string;
}

export const register = async (credentials: UserCredentials): Promise<User> => {

  const { data } = await clientApi.post('/auth/register', credentials);
  return data;
};

export const login = async (credentials: UserCredentials): Promise<User> => {
  const { data } = await clientApi.post('/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await clientApi.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await clientApi.get('/auth/session');
    return data;
  } catch (error) {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await clientApi.get('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await clientApi.patch('/users/me', payload);
  return data;
};

export interface NotesHttpResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<NotesHttpResponse> => {
  const params: FetchNotesParams = {
    page,
    perPage,
    search,
  };
  if (tag && tag !== 'All') {
    params.tag = tag;
  }

  const response = await clientApi.get<NotesHttpResponse>(`/notes`, {
    params,
  });
  const data = response.data;

  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await clientApi.post<Note>(`/notes`, newNote);
  const data = response.data;

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await clientApi.delete<Note>(`/notes/${id}`);
  const data = response.data;

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await clientApi.get<Note>(`/notes/${id}`);
  const data = response.data;

  return data;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const getCategories = async () => {
  const res = await clientApi.get<Category[]>('/categories');
  return res.data;
};

export { clientApi };