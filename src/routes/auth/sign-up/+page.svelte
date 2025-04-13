<script lang="ts">
    import SocialsButtons from "$lib/components/auth/socialsButtons.svelte";
</script>

<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
    <!-- Geometric Elements -->
    <div class="absolute top-0 left-0 h-64 w-64 bg-orange-400 rounded-br-full opacity-20 transform -rotate-12"></div>
    <div class="absolute bottom-0 right-0 h-48 w-48 bg-orange-500 rounded-tl-full opacity-20 transform rotate-12"></div>
    <div class="absolute top-1/3 right-1/4 h-20 w-20 bg-orange-300 rounded-full opacity-20"></div>
    <div class="absolute bottom-1/3 left-1/4 h-32 w-32 bg-orange-300 rounded-full opacity-15"></div>
    
    <!-- Sign-up Container -->
    <div class="max-w-md w-full mx-4 bg-white p-8 rounded-xl shadow-lg z-10 relative">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Регистрация</h1>
            <p class="text-orange-600 font-medium">Создайте новый аккаунт</p>
            
            <!-- Orange decorative line -->
            <div class="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div class="space-y-4 flex flex-col w-max mx-auto">
            <SocialsButtons provider="github" />
            <SocialsButtons provider="google" />
            <SocialsButtons provider="discord" />
        </div>
        
        <!-- <div class="mt-8 text-center text-sm text-gray-500">
            <p>Already have an account? <a href="/auth/sign-in" class="text-orange-600 font-medium hover:text-orange-700">Sign in</a></p>
        </div> -->
    </div>
</div> 