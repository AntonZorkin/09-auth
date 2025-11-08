// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { NotesHttpResponse } from './clientApi';

const getCookieHeader = () => {
  const cookieStore = cookies();
  return cookieStore.toString();
};

export const getServerMe = async (): Promise<User> => {
  const cookieHeader = getCookieHeader();

  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const getServerNotes = async (
  query: string,
): Promise<NotesHttpResponse> => {
  const cookieHeader = getCookieHeader();

  const { data } = await nextServer.get(`/notes${query}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = getCookieHeader();

  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};
