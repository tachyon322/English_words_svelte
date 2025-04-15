import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserWords, getUserStats } from '$lib/server/models/words';

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session;
  
  if (!session?.user) {
    throw redirect(303, '/auth/sign-in');
  }
  
  const userId = session.user.id;
  const words = await getUserWords(userId);
  const stats = await getUserStats(userId);
  
  return {
    session,
    words,
    stats
  };
};
