// app/(private routes)/notes/[id]/NoteDetails.client.tsx

'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Link from 'next/link';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  noteId: string;
}

const NoteDetailsClient = ({ noteId }: NoteDetailsClientProps) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
  });

  if (isLoading) {
    return <p>Loading note details...</p>;
  }

  if (isError || !note) {
    return (
      <p style={{ color: 'red' }}>Error: Note not found or failed to load.</p>
    );
  }

  return (
    <main>
      <h1 className={css.header}>{note.title}</h1>
      <div className={css.metadata}>
        <span className={css.tag}>Tag: {note.tag}</span>
        <Link href={`/notes/edit/${note.id}`}>Edit</Link>
      </div>
      <p className={css.content}>{note.content}</p>
    </main>
  );
};

export default NoteDetailsClient;
