<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth/auth-client";
  import { Dropdown, DropdownItem, Button } from "flowbite-svelte";

  export let session;

  // Normalize the session data structure
  $: userData = session?.session?.user || session?.user || null;

  // Функция для обработки ошибки загрузки изображения
  function handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src =
      "https://static.vecteezy.com/system/resources/previews/015/516/069/non_2x/fds-letter-logo-design-on-white-background-fds-creative-initials-circle-logo-concept-fds-letter-design-vector.jpg";
  }
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
        <img
          src={userData.image ||
            "https://static.vecteezy.com/system/resources/previews/015/516/069/non_2x/fds-letter-logo-design-on-white-background-fds-creative-initials-circle-logo-concept-fds-letter-design-vector.jpg"}
          alt="avatar"
          class="w-10 h-10 rounded-full"
          on:error={handleImageError}
        />
        <p class="text-black">
          {userData?.name || ""}
        </p>
      </div>
      <Dropdown>
        <DropdownItem href="/user">Профиль</DropdownItem>
        {#if userData.role == "Admin"}
          <DropdownItem href="/settings">Панель</DropdownItem>
        {/if}
        <DropdownItem href="/settings">Настройки</DropdownItem>
        <DropdownItem
          class="text-red-400 cursor-pointer"
          on:click={async () =>
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  goto("/auth/sign-in");
                },
              },
            })}
          >Выйти
        </DropdownItem>
      </Dropdown>
    {/if}
  </div>
</div>
