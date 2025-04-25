import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { getAllWords } from "$lib/server/models/words";

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session; // Берем сессию из locals

  const limit = 10; // Initial number of words to load
  const offset = 0; // Start from the beginning
  const sortBy = 'difficulty'; // Sort by difficulty by default

  const words = await getAllWords(limit, offset, sortBy);

  // Возвращаем сессию и слова для +page.svelte
  return {
    session,
    words,
  };
};
