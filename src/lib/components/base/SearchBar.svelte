<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let value = '';

  let timeoutId: NodeJS.Timeout | undefined;
  const searchDelay = 800; // milliseconds

  function handleInput() {
    dispatch('input', value);

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch('debouncedSearch', value);
    }, searchDelay);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      clearTimeout(timeoutId); // Clear timeout on Enter to prevent duplicate search
      dispatch('search', value);
    }
  }
</script>

<div class="relative">
  <input
    type="text"
    class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
    placeholder="Search word..."
    bind:value={value}
    on:input={handleInput}
    on:keydown={handleKeydown}
  />
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg
      class="w-5 h-5 text-gray-500 dark:text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  </div>
</div>
