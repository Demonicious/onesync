<script>
    import Transition from "$layouts/Transition.svelte";

    import { login } from "$services/auth.js";

    import Card from "smelte/src/components/Card";
    import Button from "smelte/src/components/Button";
</script>

<Transition>
    <Card.Card class="main-card bg-gray-50">
        <div slot="title">
            <Card.Title
                title="Authenticate"
                subheader="Sign in with your Google Account"
            />
        </div>
        <div slot="actions">
            <div class="px-5 pb-5">
                <Button text on:click={login}>Login</Button>
            </div>
        </div>
    </Card.Card>
</Transition>