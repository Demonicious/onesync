<script>
	import "smelte/src/tailwind.css";

	import user from "$stores/user.js";
	import room from "$stores/room.js";

	import Home from "$layouts/Home.svelte";
	import Dashboard from "$layouts/Dashboard.svelte";

	import UserAuth from "$components/UserAuth.svelte";
	import RoomSelection from "$components/RoomSelection.svelte";
	import Operator from "$components/Operator.svelte";
	import Reader from "$components/Reader.svelte";
	import Chat from "$components/Chat.svelte";

    import ProgressCircular from "smelte/src/components/ProgressCircular";
</script>

{#if !$room.id}
	<Home>
		{#if $user.loaded && !$room.progress}
			{#if !$user.details}
				<UserAuth />
			{:else}
				<RoomSelection />
			{/if}
		{:else}
			<ProgressCircular />
		{/if}
	</Home>
{:else}
	<Dashboard>
		<div slot="viewer">
			{#if $room.operator == $user.details.uid}
				<Operator />
			{:else}
				<Reader />
			{/if}
		</div>
		<div slot="chat">
			<Chat />
		</div>
	</Dashboard>
{/if}

<style>
	div[slot=chat] {
		height: 100%;
	}
</style>