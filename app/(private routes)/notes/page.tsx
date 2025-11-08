// app/(private routes)/notes/page.tsx

import { getServerNotes } from '@/lib/api/serverApi';
import { NotesHttpResponse } from '@/lib/api/clientApi';
import { SearchParams } from '@/types/searchParams';
import NotesList from '@/components/NoteList/NoteList';
import SearchBar from '@/components/SearchBar/SearchBar';

interface NotesPageProps {
  searchParams: SearchParams;
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {

  const page = searchParams.page || 1;
  const perPage = searchParams.perPage || 10;
  const search = searchParams.search || '';
  const tag = searchParams.tag || '';
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    ...(search && { search }),
    ...(tag && { tag }),
  });
  const queryString = `?${params.toString()}`;

  let notesData: NotesHttpResponse | null = null;
  let error: string | null = null;

  try {

    notesData = await getServerNotes(queryString);
  } catch (err: unknown) {

    let errorMessage = 'Failed to fetch notes.';


    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof err.response === 'object' &&
      err.response !== null &&
      'data' in err.response &&
      typeof err.response.data === 'object' &&
      err.response.data !== null &&
      'message' in err.response.data &&
      typeof err.response.data.message === 'string'
    ) {
      errorMessage = err.response.data.message;
    }

    error = errorMessage;
  }

  return (
    <main>
     <h1>My Notes</h1>{' '}

      <SearchBar />{' '}
      {error ? (
        <p style={{ color: 'red' }}>Error loading notes: {error}</p>
      ) : notesData && notesData.notes.length > 0 ? (

        <NotesList
          initialNotes={notesData.notes}
          totalPages={notesData.totalPages}
          currentPage={notesData.page}
        />
      ) : (
        <p>You have no notes yet.</p>
      )}
      {' '}
    </main>
  );
};

export default NotesPage;
