<script>
    import user from "$stores/user.js";
    import room from "$stores/room.js";
    import repo from "$stores/repo.js";

    import Card from "smelte/src/components/Card";
    import ProgressCircular from "smelte/src/components/ProgressCircular";
    import Chip from "smelte/src/components/Chip";
    import Snackbar from "smelte/src/components/Snackbar";
    import TextField from "smelte/src/components/TextField";
    import Slider from "smelte/src/components/Slider";
    import Button from "smelte/src/components/Button";

    import { subscribe } from "$services/realtime.js";
import Page from "./Page.svelte";

    let roomData = {
        loading: true,

        name: '',
        chapter: 0,
        page: 0,
        totalPages: 0,

        operator: $user.details.uid,
    };

    let showCopiedSnackbar = false;

    const copyRoomId = () => {
        navigator.clipboard.writeText($room.id);

        showCopiedSnackbar = true;
    }

    $: link = `${$repo}/series/${roomData.name}/${roomData.chapter}/${('0' + roomData.page).slice(-2)}.jpg`;

    subscribe('rooms/' + $room.id, (snapshot) => {
        const {
            name = '',
            chapter = 0,
            page = 0,
            totalPages = 0,

            operator = $user.details.uid
        } = snapshot.val()

        roomData = {
            loading: false,
            name,
            chapter,
            page,
            totalPages,
            operator
        };
    })
</script>

{#if roomData.loading}
    <main class="rounded w-full bg-gray-50 flex justify-center items-center">
        <ProgressCircular />
    </main>
{:else}
    <Snackbar noAction timeout={2500} bind:value={ showCopiedSnackbar }>
        Copied Room ID
    </Snackbar>

    <Card.Card class="w-full bg-gray-50">
        <div slot="title" class="p-4">
            <Chip color="primary" on:click={ copyRoomId } outlined>
                {$room.id}
            </Chip>
        </div>

        <div slot="text" class="mx-5 mb-1 border rounded-md bg-gray-100 flex justify-center items-center">
            {#if link}
                <Page {link} />
            {/if}
        </div>

        <div slot="actions" class="p-4 grid grid-cols-6 gap-4">
            <div>
                <TextField disabled outlined label="Chapter Number" type="number" bind:value={roomData.chapter} />
            </div>
            <div>
                <TextField disabled outlined label="Page Number" type="number" bind:value={roomData.page} />
            </div>
            <div class="col-span-4 flex items-center">
                <div class="pr-4">
                    <Button disabled>Previous</Button>
                </div>

                <Slider
                    min={1} max={roomData.totalPages} bind:value={ roomData.page } disabled
                />

                <div class="pl-4">
                    <Button disabled>Next</Button>
                </div>
            </div>
        </div>
    </Card.Card>
{/if}

<style>
    div[slot=text] {
        height: calc(100vh - 14em);
    }

    main {
        height: calc(100vh - 2em);
    }
</style>