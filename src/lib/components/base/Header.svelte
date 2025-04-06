<script>
  export let session;
</script>

<div class="flex items-center justify-between">
  <a href="/home">
    <h2>Название</h2>
  </a>
  <ul class="flex gap-3">
    <li>Главная</li>
    <li></li>
  </ul>

  <div class="flex items-center gap-2">
    <!-- Check if session and user image exists -->
    {#if session?.session?.user?.image}
      <img
        src={session.session.user.image}
        alt="User profile"
        class="rounded-full w-[40px] h-[40px] object-cover"
      />
    {:else}
      <!-- Placeholder if no image exists -->
      <div
        class="bg-gradient-to-r from-amber-500 to-blue-50 rounded-full w-[40px] h-[40px]"
      ></div>
    {/if}
    <!-- Display username if it exists -->
    <p>{session?.session?.user?.name || ""}</p>
  </div>
</div>
