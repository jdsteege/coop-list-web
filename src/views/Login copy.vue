<script setup lang="ts">
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentUser } from "vuefire";

// onMounted(async () => {
//   const router = useRouter();
//   const route = useRoute();

//   const currentUser = await getCurrentUser();
//   if (currentUser) {
//     const to =
//       route.query.redirect && typeof route.query.redirect === "string"
//         ? route.query.redirect
//         : "/";

//     router.push(to);
//   }
// });

//TODO: may need to switch away from firebaseui to https://firebase.google.com/docs/auth/web/google-signin

onMounted(() => {
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (
        authResult: any,
        redirectUrl: string
      ) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        //   document.getElementById("loader").style.display = "none";
        console.log("auth ui should now be shown");
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: useRoute().query.redirect?.toString(),
    signInOptions: [
      // List of OAuth providers supported.
      GoogleAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: "/about",
    // Privacy policy url.
    privacyPolicyUrl: "/about",
  };

  // Initialize the FirebaseUI Widget
  const ui = new firebaseui.auth.AuthUI(getAuth());
  ui.start("#firebaseui-auth-container", uiConfig);
});
</script>

<template>
  <div>Here is the Login page</div>
  <div id="firebaseui-auth-container"></div>
</template>
