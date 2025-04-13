<script>
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth/auth-client";
  import { Dropdown, DropdownItem, Button } from "flowbite-svelte";

  export let session;
  
  // Normalize the session data structure
  $: userData = session?.session?.user || session?.user || null;
</script>

<div class="flex items-center justify-between z-10">
  <a href="/home">
    <h2>Название</h2>
  </a>

  <ul class="flex items-center gap-10">
    <li>Изучение</li>
    <li>Подписка</li>
    <li>О нас</li>
  </ul>

  <div class="flex items-center gap-2">
    {#if !userData}
      <Button tag={"a"} href="/auth/sign-in">Войти</Button>
    {:else}
      <div class="flex items-center gap-2 cursor-pointer">
        {#if userData?.image}
          <img src={userData.image} alt="avatar" class="w-10 h-10 rounded-full">
        {/if}
        <p class="text-black">
          {userData?.name || ""}
        </p>
      </div>
      <Dropdown>
        <DropdownItem href="/user">Профиль</DropdownItem>
        <DropdownItem href="/settings">Настройки</DropdownItem>
        <DropdownItem class="text-red-400 cursor-pointer"
          on:click={async () =>
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    goto("/auth/sign-in");
                  },
                },
              })}>Выйти
        </DropdownItem>
      </Dropdown>
    {/if}
  </div>
</div>

