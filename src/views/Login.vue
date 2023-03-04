<script setup lang="ts">
import { GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentUser, useFirebaseAuth } from "vuefire";

// const username = ref("");
// const password = ref("");

onMounted(async () => {
    const router = useRouter();
    const route = useRoute();

    const currentUser = await getCurrentUser();
    if (currentUser) {
        const queryRedirect = route.query.redirect;
        const to =
            (queryRedirect && typeof queryRedirect === "string" && !queryRedirect.startsWith("/login"))
                ? queryRedirect
                : "/";

        router.push(to);

    } else {
        // https://firebase.google.com/docs/auth/web/google-signin
        signInWithRedirect(useFirebaseAuth()!, new GoogleAuthProvider());


    }
});

</script>

<template>
    <div>Here is the Login page</div>
    <!-- <form> -->
    <!-- <div><input v-model="username" placeholder="username" /></div> -->
    <!-- <div><input v-model="password" placeholder="password" type="password" /></div> -->
    <!-- <button type="submit">Login</button> -->
    <!-- </form> -->
</template>
