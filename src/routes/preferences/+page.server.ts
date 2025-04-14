import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session; // Берем сессию из locals

  if (session) {
    throw redirect(302, "/home");
  }

  // Возвращаем сессию для +page.svelte
  return {
    session,
  };
};
