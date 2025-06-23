import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

const NotesPage = async () => {
  const { notes, totalPages } = await fetchNotes({ page: 1 });

  return (
    <NotesClient initialNotes={notes} initialPage={1} totalPages={totalPages} />
  );
};

export default NotesPage;
