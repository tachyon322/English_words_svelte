<script lang="ts">
  import Header from "$lib/components/base/Header.svelte";
  import { fly, fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { Button } from "flowbite-svelte";

  export let data; // Получаем данные из +page.server.js

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<div
  class="bg-gradient-to-b from-orange-50 to-white min-h-screen relative overflow-hidden"
>
  <!-- Geometric Elements -->
  <div
    class="absolute top-0 right-0 h-96 w-96 bg-orange-400 rounded-bl-full opacity-10 transform rotate-12"
  ></div>
  <div
    class="absolute bottom-0 left-0 h-80 w-80 bg-orange-500 rounded-tr-full opacity-10 transform -rotate-12"
  ></div>
  <div
    class="absolute top-1/3 left-10 h-32 w-32 bg-orange-300 rounded-full opacity-15 animate-pulse"
  ></div>
  <div
    class="absolute bottom-1/3 right-10 h-48 w-48 bg-orange-300 rounded-full opacity-10 animate-pulse"
    style="animation-delay: 1s;"
  ></div>

  <div class="wide-wrap relative z-10">
    <Header session={data} />

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16 text-center relative">
      {#if mounted}
        <h1
          in:fly={{ y: -50, duration: 800 }}
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Изучайте английский <span class="text-orange-500">каждый день</span>
        </h1>
        <p
          in:fly={{ y: -30, duration: 800, delay: 200 }}
          class="text-xl text-gray-600 mb-8"
        >
          Эффективная платформа для расширения словарного запаса
        </p>
        <div in:fade={{ duration: 800, delay: 400 }}>
          <Button
            class="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all hover:shadow-lg transform hover:-translate-y-1"
            tag={"a"}
            href="/auth/sign-in"
          >
            Начать обучение</Button
          >
        </div>
      {/if}
    </div>

    <!-- Features Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 h-16 w-16 bg-orange-100 rounded-bl-full opacity-50"
          ></div>
          <div class="text-orange-500 text-4xl mb-4">📚</div>
          <h3 class="text-xl font-semibold mb-3">Большая база слов</h3>
          <p class="text-gray-600">
            Тысячи тщательно отобранных слов с подробными объяснениями и
            примерами
          </p>
        </div>
        <div
          class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 h-16 w-16 bg-orange-100 rounded-bl-full opacity-50"
          ></div>
          <div class="text-orange-500 text-4xl mb-4">🎯</div>
          <h3 class="text-xl font-semibold mb-3">Умная система обучения</h3>
          <p class="text-gray-600">
            Персонализированный путь обучения, адаптирующийся под ваш прогресс
          </p>
        </div>
        <div
          class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 h-16 w-16 bg-orange-100 rounded-bl-full opacity-50"
          ></div>
          <div class="text-orange-500 text-4xl mb-4">🔄</div>
          <h3 class="text-xl font-semibold mb-3">Ежедневная практика</h3>
          <p class="text-gray-600">
            Регулярные упражнения и тесты для закрепления изученного материала
          </p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="container mx-auto px-4 py-16 text-center">
      <div
        class="bg-orange-500 text-white rounded-2xl p-12 relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 h-32 w-32 bg-orange-400 rounded-br-full opacity-30"
        ></div>
        <div
          class="absolute bottom-0 right-0 h-24 w-24 bg-orange-600 rounded-tl-full opacity-30"
        ></div>

        <div class="relative z-10">
          <h2 class="text-3xl font-bold mb-4">
            Готовы расширить свой словарный запас?
          </h2>
          <p class="text-xl mb-8">
            Присоединяйтесь к тысячам успешных учеников
          </p>
          <Button
            class="bg-white text-orange-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-lg transform hover:-translate-y-1"
            tag={"a"}
            href="/auth/sign-in"
          >
            Начать бесплатно
          </Button>
        </div>
      </div>
    </div>
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
