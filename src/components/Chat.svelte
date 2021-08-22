<script>
    import user from "$stores/user.js";
    import room from "$stores/room.js";

    import Message from "./Message.svelte";

    import TextField from "smelte/src/components/TextField";
    import Button from "smelte/src/components/Button";
    import Dialog from "smelte/src/components/Dialog";
    import Card from "smelte/src/components/Card";

    import { subscribeCollection, writeDocument } from "$services/firestore.js";
    import { logout } from "$services/auth.js";

    let messages    = [];
    let message     = '';
    let displayName = $user.details.displayName;
    let error       = false;
    let showDialog  = false;

    subscribeCollection([ 'rooms', $room.id, 'messages' ], (snapshot) => {
        const changes = snapshot.docChanges();

        messages = [...messages, ...changes.filter(f => f.type == 'added').map(change => ({
            id: change.doc.id,
            uid: change.doc.get('uid'),
            message: change.doc.get('message'),
            displayName: change.doc.get('displayName'),
            photoURL: change.doc.get('photoURL')
        }))];
    })

    const attemptSend = async() => {
        if(message) {
            error = false;

            const document = {
                message,
                displayName,
                photoURL: $user.details.photoURL,
                uid: $user.details.uid
            }

            message = '';

            try {
                writeDocument([ 'rooms', $room.id, 'messages' ], document);
            } catch(e) {
                console.error(e);
                error = "There was an unexpected error.";
            }
        } else
            error = "Invalid Message Content.";
    }
</script>

<Dialog bind:value={ showDialog }>
    <h5 slot="title">Change Name</h5>
    <div>
        <TextField label="Your Display Name" outlined bind:value={displayName} />
    </div>
    <div slot="actions">
        <Button on:click={ () => showDialog = false }>OK</Button>
    </div>
</Dialog>

<Card.Card class="w-full h-full bg-gray-50">
    <div slot="title">
        <Card.Title
            title={displayName}
            subheader="You will communicate under this name"
            avatar={$user.details.photoURL}
        />
    </div>

    <div slot="text" class="mx-5 mb-1 border rounded-md bg-gray-100">
        {#each messages as item (item.id)}
            <Message {...item} />
        {/each}
    </div>

    <div slot="actions" class="px-5 pb-5">
        <TextField outlined {error} bind:value={message} label="Your Message" />
        <div class="flex">
            <div class="flex-2">
                <Button on:click={attemptSend}>Send</Button>
                <Button text on:click={() => showDialog = true}>Change Name</Button>
            </div>
            <div class="flex-1 text-right">
                <Button text on:click={logout}>Logout</Button>
            </div>
        </div>
    </div>
</Card.Card>

<svelte:window on:keypress={ e => e.code == 'Enter' && attemptSend() } />

<style>
    div[slot=text] {
        height: calc(100vh - 17em);
        overflow-y: auto;
    }

    div[slot=text]::-webkit-scrollbar {
        width: 5px;
    }

    div[slot=text]::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    div[slot=text]::-webkit-scrollbar-thumb {
        background: #a83131;
        border-radius: 0 50px 50px 0;
    }
</style>