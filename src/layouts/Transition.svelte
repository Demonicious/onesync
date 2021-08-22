<script>
    import { fly } from "svelte/transition";
</script>

<div in:fly={{ duration: 200, y: 200, delay: 200 }}>
    <slot />
</div>