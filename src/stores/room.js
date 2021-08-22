import { writable } from "svelte/store";

const store = writable({
    id: null,
    operator: null,
    progress: false
});

export default store;