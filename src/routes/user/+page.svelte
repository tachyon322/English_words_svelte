<script lang="ts">
  import Header from "$lib/components/base/Header.svelte";

  export let data;
  $: userData = data.session.user;
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
  <div class="wide-wrap relative z-10 pt-0">
    <!-- Header Section -->
    <Header session={data.session} />

    <!-- User Profile Section -->
    <div class="flex items-center gap-5 mt-12">
      <div
        class="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200"
      >
        <img
          src={userData.image}
          alt="User avatar"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="text-center sm:text-left">
        <h1 class="text-3xl font-bold text-gray-800">{userData.name}</h1>
        <p class="text-gray-600 mt-1">{userData.email}</p>
      </div>
    </div>

    <div class="">
      <h2>Слова:</h2>
    </div>
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
