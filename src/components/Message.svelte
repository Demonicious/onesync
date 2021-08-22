<script>
    import user from "$stores/user.js";

    import Tooltip from "smelte/src/components/Tooltip";

    export let id;
    export let photoURL;
    export let displayName;
    export let message;
    export let uid;

    let isMine = (uid == $user.details.uid);

    console.log(isMine, uid, $user.details.uid);
</script>

<div id={id} class="message m-3 flex mb-3 { isMine ? 'justify-end' : '' }">
    <div class={ isMine ? 'order-2 ml-2' : 'mr-2' }>
        <Tooltip>
            <img slot="activator" src={photoURL} alt={displayName} class="inline-block w-12 h-12 rounded-full">
    
            {displayName}
        </Tooltip>
    </div>
    <span class="inline-bloc  rounded-full py-3 px-5 { isMine ? 'order-1 bg-blue-500 text-white' : 'bg-gray-300' }">{message}</span>
</div>