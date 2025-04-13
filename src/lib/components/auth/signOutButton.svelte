<script>
  import { authClient } from "$lib/auth/auth-client";
  import { goto } from "$app/navigation";
</script>

<!-- Кнопка Sign Out -->
<button
  class="bg-black text-white cursor-pointer"
  on:click={async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          goto("/auth/sign-in");
        },
      },
    })}
>
  Выйти
</button>
