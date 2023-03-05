<script setup lang="ts">
import { GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentUser, useFirebaseAuth } from "vuefire";

const isLoading = ref(true);

onMounted(async () => {
    const router = useRouter();
    const route = useRoute();

    const currentUser = await getCurrentUser();
    isLoading.value = false;

    if (currentUser) {

        const queryRedirect = route.query.redirect;
        const to =
            (queryRedirect && typeof queryRedirect === "string" && !queryRedirect.startsWith("/login"))
                ? queryRedirect
                : "/";

        router.push(to);

    }
});

function googleLoginRedirect() {

    // https://firebase.google.com/docs/auth/web/google-signin
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithRedirect(useFirebaseAuth()!, provider);
}


</script>

<template>
    <div>Here is the Login page</div>
    <div v-if="isLoading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <button @click="googleLoginRedirect">Login with Google</button>

    </div>
</template>
