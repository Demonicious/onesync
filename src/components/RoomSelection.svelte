<script>
    import user from "$stores/user.js";
    import room from "$stores/room.js";

    import Transition from "$layouts/Transition.svelte";

    import Card from "smelte/src/components/Card";
    import Button from "smelte/src/components/Button";
    import TextField from "smelte/src/components/TextField";

    import { logout } from "$services/auth.js";
    import { getDocument, queryWhereDocuments, writeDocument } from "$services/firestore.js";
    import { write } from "$services/realtime.js";

    let roomId  = '';
    let sending = false;
    let error   = false;

    const attemptJoin = async () => {
        if(!sending) {
            error   = false;
            sending = true;

            try {
                const doc = await getDocument([ 'rooms', roomId ]);

                if(doc.exists()) {
                    $room = {
                        id: doc.id,
                        operator: doc.get('operator'),
                        progress: false,
                    };
                } else {
                    error = "That room could not be found.";
                }
            } catch(e) {
                error = "There was an unexpected error.";
            }

            sending = false;
        }
    }

    const attemptNew = async () => {
        if(!sending) {
            error   = false;
            sending = true;

            try {
                const result = await queryWhereDocuments([ 'rooms' ], [ 'operator', '==', $user.details.uid ]);

                if(result.size) {
                    $room = {
                        id: result.docs[0].id,
                        operator: $user.details.uid,
                        progress: false
                    }
                } else {
                    const doc = await writeDocument(['rooms'], {
                        operator: $user.details.uid
                    });

                    if(doc) {
                        await write('rooms/' + doc.id, {
                            name: 'one-piece',
                            chapter: 1,
                            page: 1,
                            totalPages: 15,
                            operator: $user.details.uid
                        });

                        $room = {
                            id: doc.id,
                            operator: $user.details.uid,
                            progress: false
                        };
                    }
                }
            } catch(e) {
                error = "There was an unexpected error.";

                console.error(e);
            }

            sending = false;
        }
    }
</script>

<Transition>
    <Card.Card class="main-card bg-gray-50">
        <div slot="title">
            <Card.Title
                title="Room Selection"
                subheader="Join an existing room or create a new one"
                avatar={$user.details.photoURL}
            />
        </div>
        <div slot="text" class="p-5 pb-0 pt-3 text-gray-700 body-2">
            <TextField disabled={sending} {error} bind:value={roomId} outlined label="Room ID to Join" />
        </div>
        <div slot="actions">
            <div class="px-5 pb-5 flex">
                <div class="flex-1">
                    <Button on:click={logout} disabled={sending} text>Logout</Button>
                </div>
                <div class="flex-2 text-right">
                    <Button on:click={attemptNew} disabled={sending} text>+ My Room</Button>
                    <Button on:click={attemptJoin} class={ sending ? 'animate-pulse' : '' } disabled={!roomId || sending}>Join</Button>
                </div>
            </div>
        </div>
    </Card.Card>
</Transition>