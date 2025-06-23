import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import toast from "react-hot-toast";
import { deleteNote } from "../../lib/api";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      toast.success("Note deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button
              className={css.button}
              onClick={() => mutate(note.id)}
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
