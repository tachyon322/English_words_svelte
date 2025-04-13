<script>
    import Header from "$lib/components/base/Header.svelte";

    export let data; // Получаем данные из +page.server.js
</script>

<div class="wide-wrap">
    <Header session={data} />
</div>