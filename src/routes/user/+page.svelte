<script lang="ts">
  import Header from "$lib/components/base/Header.svelte";
  import { Image } from "@unpic/svelte/base";
  import { formatDistance } from 'date-fns';
  import type { PageData } from "./$types";

  export let data: PageData;
  $: userData = data.session.user;

  // Функция для обработки ошибки загрузки изображения
  function handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = "https://static.vecteezy.com/system/resources/previews/015/516/069/non_2x/fds-letter-logo-design-on-white-background-fds-creative-initials-circle-logo-concept-fds-letter-design-vector.jpg";
  }

  // Get flame image based on streak count
  function getFlameImage(streak: number): string {
    if (streak >= 60) return "/images/flame-3.png";
    if (streak >= 20) return "/images/flame-2.png";
    if (streak >= 1)  return "/images/flame-1.png"
    return "/images/flame-0.png";
  }

  function formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (e) {
      return "Unknown date";
    }
  }

  // Get appropriate classes for difficulty badge
  function getDifficultyClasses(difficulty: string): string {
    switch(difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="bg-gradient-to-b from-orange-50 to-white min-h-screen pb-8">
  <!-- Geometric elements as background with pointer-events-none -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <div
      class="absolute top-0 right-0 h-96 w-96 bg-orange-400 rounded-bl-full opacity-10 transform rotate-12"
    ></div>
    <div
      class="absolute bottom-0 left-0 h-80 w-80 bg-orange-500 rounded-tr-full opacity-10 transform -rotate-12"
    ></div>
    <div
      class="absolute top-1/3 left-10 h-32 w-32 bg-orange-300 rounded-full opacity-15"
    ></div>
    <div
      class="absolute bottom-1/3 right-10 h-48 w-48 bg-orange-300 rounded-full opacity-10"
    ></div>
  </div>

  <!-- Main content with proper z-index -->
  <div class="wide-wrap relative z-10 pt-0 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <Header session={data.session} />

    <!-- User Profile Section -->
    <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mt-12">
      <div class="flex flex-col items-center">
        <div class="w-40 h-40 rounded-full overflow-hidden border-4 border-orange-200 relative">
          <Image
            src={userData.image || "https://static.vecteezy.com/system/resources/previews/015/516/069/non_2x/fds-letter-logo-design-on-white-background-fds-creative-initials-circle-logo-concept-fds-letter-design-vector.jpg"}
            alt="User avatar"
            class="w-full h-full object-cover"
            on:error={handleImageError}
          />
        </div>
        <div class="mt-4 bg-white rounded-full px-3 py-1.5 shadow-lg flex items-center justify-center gap-1.5 border border-orange-100">
          <img src={getFlameImage(userData.currentStreak)} alt="Streak flame" class="h-5" />
          <span class="font-medium text-orange-600">{userData.currentStreak} дней подряд</span>
        </div>
      </div>

      <div class="flex-1">
        <div class="bg-white rounded-xl p-6 shadow-md border border-orange-100">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">{userData.name}</h1>
              <p class="text-gray-600 mt-1">{userData.email}</p>
            </div>
            <div class="mt-4 sm:mt-0 bg-orange-50 px-4 py-2 rounded-lg">
              <p class="text-orange-600 font-medium">{userData.points} очков</p>
            </div>
          </div>

          <!-- Learning Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
              <p class="text-2xl font-bold text-orange-600">{data.stats.totalWords}</p>
              <p class="text-gray-600">Всего добавленных слов</p>
            </div>
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
              <p class="text-2xl font-bold text-orange-600">{data.stats.learnedWords}</p>
              <p class="text-gray-600">Выученные слова</p>
            </div>
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
              <p class="text-2xl font-bold text-orange-600">{data.stats.progress}%</p>
              <p class="text-gray-600">Прогрес</p>
            </div>
          </div>

          <!-- Difficulty Breakdown -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-800 mb-3">Слова по сложности</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="bg-green-50 p-3 rounded-lg text-center">
                <p class="text-xl font-semibold text-green-600">{data.stats.difficultyCounts['Easy'] || 0}</p>
                <p class="text-gray-600 text-sm">Легкие</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg text-center">
                <p class="text-xl font-semibold text-yellow-600">{data.stats.difficultyCounts['Medium'] || 0}</p>
                <p class="text-gray-600 text-sm">Средние</p>
              </div>
              <div class="bg-red-50 p-3 rounded-lg text-center">
                <p class="text-xl font-semibold text-red-600">{data.stats.difficultyCounts['Hard'] || 0}</p>
                <p class="text-gray-600 text-sm">Сложные</p>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg text-center">
                <p class="text-xl font-semibold text-gray-600">{data.stats.difficultyCounts['Unknown'] || 0}</p>
                <p class="text-gray-600 text-sm">Не определено</p>
              </div>
            </div>
          </div>

          <!-- Guide Completion Status -->
          <div class="flex items-center mb-8">
            <div class={`w-4 h-4 rounded-full ${userData.guideCompleted ? 'bg-green-400' : 'bg-gray-300'} mr-2`}></div>
            <p class="text-gray-700">{userData.guideCompleted ? 'Guide completed' : 'Guide not completed'}</p>
          </div>

          <!-- Last active date -->
          {#if userData.lastActiveDate}
            <p class="text-sm text-gray-500 mb-4">Последняя активность {formatDate(userData.lastActiveDate)}</p>
          {/if}
        </div>
      </div>
    </div>

    <!-- Word List Section -->
    <div class="mt-8">
      <div class="bg-white rounded-xl p-6 shadow-md border border-orange-100">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Ваши слова</h2>
        
        {#if data.words && data.words.length === 0}
          <div class="text-center py-8">
            <p class="text-gray-500">Вы не добавили ни одного слова</p>
            <a href="/words" class="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">Add Your First Word</a>
          </div>
        {:else}
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-orange-50">
                  <th class="py-2 px-4 text-left text-gray-700 font-medium rounded-tl-lg">Word</th>
                  <th class="py-2 px-4 text-left text-gray-700 font-medium">Added</th>
                  <th class="py-2 px-4 text-center text-gray-700 font-medium rounded-tr-lg">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {#each data.words || [] as word: UserWordData, i}
                  <tr class={i % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}>
                    <td class="py-3 px-4 border-t border-orange-100">{word.word}</td>
                    <td class="py-3 px-4 border-t border-orange-100">{formatDate(typeof word.added_at === 'string' ? word.added_at : word.added_at.toISOString())}</td>
                    <td class="py-3 px-4 border-t border-orange-100 text-center">
                      <span class={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClasses(word.difficulty || 'Unknown')}`}>
                        {word.difficulty || 'Unknown'}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          
          <div class="mt-6 text-center">
            <a href="/words" class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">View All Words</a>
          </div>
        {/if}
      </div>
    </div>

    <!-- Recently Added Words Section -->
    {#if data.stats.lastAddedWords && data.stats.lastAddedWords.length > 0}
      <div class="mt-8">
        <div class="bg-white rounded-xl p-6 shadow-md border border-orange-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Recently Added Words</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {#each data.stats.lastAddedWords || [] as word: UserWordData}
              <div class="bg-orange-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 class="font-medium text-gray-900">{word.word}</h3>
                <div class="flex justify-between items-center mt-2">
                  <span class={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClasses(word.difficulty || 'Unknown')}`}>
                    {word.difficulty || 'Unknown'}
                  </span>
                  <p class="text-xs text-gray-500">{formatDate(typeof word.added_at === 'string' ? word.added_at : word.added_at.toISOString())}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.badge) {
    font-weight: 500;
  }

  :global(.wide-wrap) {
    margin-top: 0 !important;
  }
</style>
