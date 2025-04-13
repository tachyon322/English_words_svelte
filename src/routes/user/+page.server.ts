import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session; // Берем сессию из locals

  // Если сессии нет, перенаправляем на страницу входа
  if (!session) {
    throw redirect(302, "/auth/sign-in");
  }

  // Возвращаем сессию для +page.svelte
  return {
    session,
  };
};
