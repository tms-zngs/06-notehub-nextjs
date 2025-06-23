import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
type Props = {
  params: { id: string };
};

const NoteDetails = async ({ params }: Props) => {
  const id = Number(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
