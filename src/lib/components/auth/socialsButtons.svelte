<script lang="ts">
    import { authClient } from "$lib/auth/auth-client";
    import Icon from "@iconify/svelte";

    // Определяем тип для провайдеров
    type AuthProvider = 'github' | 'discord' | 'google';

    // Пропс для получения провайдера
    export let provider: AuthProvider;

    // Состояние загрузки
    let isLoading = false;

    // Функция входа с явной типизацией
    async function handleSignIn(provider: AuthProvider) {
        if (isLoading) return;
        
        isLoading = true;
        try {
            await authClient.signIn.social({
                provider
            });
            console.log("Вход через: ", provider);
        } catch (error) {
            console.error("Ошибка входа: ", error);
        }
    }

    // Стили и названия для разных провайдеров
    const providerStyles = {
        github: 'bg-gray-800 hover:bg-gray-700',
        discord: 'bg-indigo-600 hover:bg-indigo-500',
        google: 'bg-white border border-gray-300 hover:bg-gray-100'
    };

    const providerNames = {
        github: 'GitHub',
        discord: 'Discord',
        google: 'Google'
    };
    
    // Иконки для разных провайдеров
    const providerIcons = {
        github: 'mdi:github',
        discord: 'ic:baseline-discord',
        google: 'flat-color-icons:google'
    };
    
    // Цвет текста для Google (так как фон белый)
    const textColor = provider === 'google' ? 'text-gray-800' : 'text-white';

</script>

<button 
    class="px-4 py-2 rounded-md {textColor} font-medium transition-colors {providerStyles[provider]} flex items-center gap-2 {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
    on:click={() => handleSignIn(provider)}
    disabled={isLoading}
>
    {#if isLoading}
        <div class="animate-spin mr-2">
            <Icon icon="mdi:loading" width="24" height="24" />
        </div>
    {:else}
        <Icon icon={providerIcons[provider]} width="24" height="24" />
    {/if}
    <p>Войти через {providerNames[provider]}</p>
</button>