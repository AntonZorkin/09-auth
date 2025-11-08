// components/NoteList/NoteList.tsx 

"use client"
import toast from "react-hot-toast";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi"; 
import Link from "next/link";

interface NoteListProps {
  initialNotes: Note[]; 
  totalPages: number;    
  currentPage: number;   
}

const NoteList = ({ initialNotes, totalPages, currentPage }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
  
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted")
    },
    onError() {
      toast.error("Something wrong.", { id: "delete-fail" });
    }
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  if (initialNotes.length === 0) {
    return null;
  }
  
  return (
    <div>

      <p>Page {currentPage} of {totalPages}</p> 

      <ul className={css.list}>
        {initialNotes.map((note: Note) => { 
          return (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <Link href={`/notes/${note.id}`}>View details</Link>
                <button
                  className={css.button}
                  onClick={() => handleDelete(note.id)}
                  disabled={isPending}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoteList;