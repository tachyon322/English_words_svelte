<script lang="ts">
    import Header from "$lib/components/base/Header.svelte";
    import { Button } from "flowbite-svelte";
    import SearchBar from "$lib/components/base/SearchBar.svelte";
    export let data; // Получаем данные из +page.server.js

    // Initialize displayed words with the data from the server
    let displayedWords = data.words;
    let searchQuery = '';
    let sortBy = 'difficulty'; // Default sort
    let offset = displayedWords.length; // Keep track of the current offset for pagination

    // Function to fetch words from the server
    async function fetchWords(limit: number, currentOffset: number, currentSortBy: string, currentSearchQuery: string) {
        const params = new URLSearchParams();
        params.append('limit', limit.toString());
        params.append('offset', currentOffset.toString());
        params.append('sortBy', currentSortBy);
        if (currentSearchQuery) {
            params.append('search', currentSearchQuery);
        }
        const response = await fetch(`/words?${params.toString()}`);
        if (!response.ok) {
            console.error('Failed to fetch words', response.statusText);
            return [];
        }
        return response.json();
    }

    // Function to load more words (for infinite scrolling or 'Load More' button)
    async function loadMoreWords() {
        const limit = 10; // Same limit as in +page.server.ts and +server.ts
        const newWords = await fetchWords(limit, offset, sortBy, searchQuery);
        displayedWords = [...displayedWords, ...newWords];
        offset += newWords.length;
    }

    // Function to handle search and sort changes
    async function handleFilterChange() {
        offset = 0; // Reset offset when filters change
        const limit = 10; // Load the first page with new filters
        const newWords = await fetchWords(limit, offset, sortBy, searchQuery);
        displayedWords = newWords; // Replace words with filtered/sorted results
        offset += newWords.length;
    }

    // Initial load might already be done by +page.server.ts, but this ensures filters are applied if they are changed after initial load.
    // We don't need to call handleFilterChange on mount because +page.server.ts already loads initial data.
    // We only call it when searchQuery or sortBy changes.
    $: if (searchQuery || sortBy !== 'difficulty') {
        handleFilterChange();
    }
</script>

<div class="bg-gradient-to-b from-orange-50 to-white min-h-screen relative overflow-hidden">
  <!-- Geometric Elements -->
  <div class="absolute top-0 right-0 h-96 w-96 bg-orange-400 rounded-bl-full opacity-10 transform rotate-12"></div>
  <div class="absolute bottom-0 left-0 h-80 w-80 bg-orange-500 rounded-tr-full opacity-10 transform -rotate-12"></div>
  <div class="absolute top-1/3 left-10 h-32 w-32 bg-orange-300 rounded-full opacity-15 animate-pulse"></div>
  <div class="absolute bottom-1/3 right-10 h-48 w-48 bg-orange-300 rounded-full opacity-10 animate-pulse" style="animation-delay: 1s;"></div>

  <div class="wide-wrap relative z-10">
    <Header session={data} />

    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center mt-8">
      <span class="text-orange-500">Список слов</span>
    </h1>

    <div class="max-w-2xl mx-auto mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-grow">
        <SearchBar bind:value={searchQuery} on:search={handleFilterChange} />
      </div>
      <div class="flex-shrink-0">
        <select
          bind:value={sortBy}
          on:change={handleFilterChange}
          class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
        >
          <option value="difficulty">Sort by Difficulty</option>
          <option value="createdAt">Sort by Date Added</option>
        </select>
      </div>
    </div>

    {#if displayedWords.length > 0}
      <ul class="max-w-2xl mx-auto mb-8 grid gap-4">
        {#each displayedWords as word (word.id)}
          <li class="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center justify-between border border-orange-100 hover:shadow-lg transition-all">
            <div>
              <span class="font-bold text-lg text-orange-600">{word.word}</span>
              <span class="text-gray-500 ml-2">— {word.translation}</span>
            </div>
            <span class="mt-2 md:mt-0 inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium border border-orange-100">{word.difficulty}</span>
          </li>
        {/each}
      </ul>

      <!-- Load More Button -->
      <div class="flex justify-center mb-12">
        <Button class="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all hover:shadow-lg transform hover:-translate-y-1" on:click={loadMoreWords}>
          Загрузить ещё
        </Button>
      </div>
    {:else}
      <p class="text-center text-gray-500 text-lg mt-16">Слова не найдены.</p>
    {/if}
  </div>
</div>

<style>
  @keyframes pulse {
    0%,
    100% {
      opacity: 0.15;
    }
    50% {
      opacity: 0.25;
    }
  }
  .animate-pulse {
    animation: pulse 3s infinite ease-in-out;
  }
</style>