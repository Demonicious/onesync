<main class="grid grid-cols-4 gap-4 p-4">
    <section class="col-span-3">
        <slot name="viewer" />
    </section>
    <section>
        <slot name="chat" />
    </section>
</main>

<style>
    main {
        height: 100vh;
        width: 100vw;
    }
</style>