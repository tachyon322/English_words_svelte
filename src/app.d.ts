// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			session: {
				user: {
					id: string,
					name: string,
					email: string,
					image: string
				}
			 } | null; // Укажите тип вашей сессии
		  }
	}
}

export {};
