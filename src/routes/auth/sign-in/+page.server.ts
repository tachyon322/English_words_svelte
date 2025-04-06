import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session; // Берем сессию из locals

  // Если сессия есть, перенаправляем на страницу входа
  if (session) {
    throw redirect(302, "/user");
  }

  return {
    session
  };
};
