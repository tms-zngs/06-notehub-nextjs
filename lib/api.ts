import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";

type FetchNotesParams = {
  page: number;
  searchQuery?: string;
};

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async ({
  page = 1,
  searchQuery,
}: FetchNotesParams): Promise<ApiResponse> => {
  const perPage = 12;

  try {
    const response = await axios.get<ApiResponse>(`/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        perPage,
        search: searchQuery,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`/notes`, newNote, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
