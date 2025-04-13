import { createAuthClient } from "better-auth/svelte"; // make sure to import from better-auth/svelte

export const authClient = createAuthClient({
  baseURL: "http://localhost:5173",
  fetchOptions: {},
  apiBasePath: "/api/auth", // Add this line to specify the API base path
});