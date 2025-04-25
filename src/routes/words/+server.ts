import { json } from "@sveltejs/kit";
import { getAllWords } from "$lib/server/models/words";

export async function GET({ url }) {
  const limit = Number(url.searchParams.get('limit') ?? 10);
  const offset = Number(url.searchParams.get('offset') ?? 0);
  const sortBy = (url.searchParams.get('sortBy') as 'difficulty' | 'createdAt') ?? 'difficulty';
  const searchQuery = url.searchParams.get('search') ?? undefined;

  try {
    const words = await getAllWords(limit, offset, sortBy, searchQuery);
    return json(words);
  } catch (error) {
    console.error('Error fetching words:', error);
    return json({ error: 'Failed to fetch words' }, { status: 500 });
  }
} 