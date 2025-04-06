import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Получаем сессию из auth.api.getSession
  const session = await auth.api.getSession({
    headers: event.request.headers
  });

  // Сохраняем сессию в event.locals
  event.locals.session = session || null;

  // Передаем управление svelteKitHandler (если он нужен для других задач)
  return svelteKitHandler({ event, resolve, auth });
};