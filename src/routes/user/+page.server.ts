import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserWords } from '$lib/server/models/words';

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session;
  
  if (!session?.user) {
    throw redirect(303, '/auth/sign-in');
  }
  
  const userId = session.user.id;
  
  try {
    const words = await getUserWords(userId);
    
    // Calculate statistics
    const totalWords = words ? words.length : 0;
    const difficultyCounts = words ? words.reduce((acc, word) => {
      const difficulty = word.difficulty || 'Unknown';
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) : {};

    // Sort words by added_at descending to get recently added first
    const sortedWords = words ? [...words].sort((a, b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime()) : [];
    const lastAddedWords = sortedWords.slice(0, 5); // Get the 5 most recent words

    const stats = {
      totalWords,
      difficultyCounts,
      lastAddedWords,
      // Placeholder for learned words and progress - data needed
      learnedWords: 0,
      progress: 0,
    };

    return {
      session,
      words,
      stats
    };
  } catch (error) {
    console.error('Error loading user data:', error);
    return {
      session,
      words: [],
      stats: { totalWords: 0, difficultyCounts: {}, lastAddedWords: [], learnedWords: 0, progress: 0 }
    };
  }
};
