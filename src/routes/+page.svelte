<script lang="ts">
  import Header from "$lib/components/base/Header.svelte";
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth/auth-client.js";

  export let data; // Получаем данные из +page.server.js
</script>

<div class="bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
  <div class="wide-wrap">
    <Header session={data} />

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16 text-center relative">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Изучайте английский <span class="text-orange-500">каждый день</span>
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Эффективная платформа для расширения словарного запаса
      </p>
      <button
        class="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
      >
        <a href="/auth/sign-in"> Начать обучение</a>
      </button>
    </div>

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
      Sign out
    </button>

    <!-- Features Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div class="text-orange-500 text-4xl mb-4">📚</div>
          <h3 class="text-xl font-semibold mb-3">Большая база слов</h3>
          <p class="text-gray-600">
            Тысячи тщательно отобранных слов с подробными объяснениями и
            примерами
          </p>
        </div>
        <div
          class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div class="text-orange-500 text-4xl mb-4">🎯</div>
          <h3 class="text-xl font-semibold mb-3">Умная система обучения</h3>
          <p class="text-gray-600">
            Персонализированный путь обучения, адаптирующийся под ваш прогресс
          </p>
        </div>
        <div
          class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
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
        <h2 class="text-3xl font-bold mb-4">
          Готовы расширить свой словарный запас?
        </h2>
        <p class="text-xl mb-8">Присоединяйтесь к тысячам успешных учеников</p>
        <button
          class="bg-white text-orange-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          <a href="/auth/login"> Начать бесплатно </a>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
</style>