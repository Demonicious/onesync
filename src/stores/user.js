import auth from "$services/auth.js";
import { writable } from "svelte/store";
import { onAuthStateChanged } from "@firebase/auth";

const store = writable({
    loaded: false,
    details: null
});

onAuthStateChanged(auth, (user) => {
    store.set({
        loaded: true,
        details: user
    });
})

export default store;