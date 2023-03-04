<script setup lang="ts">
import { signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';

const user = useCurrentUser();
const router = useRouter();

function signoutfromgoogle() {
  signOut(useFirebaseAuth()!);
  router.push("/");
}
</script>

<template>
  <div>This is the Home page</div>
  <div v-if="user">
    <p>Welcome {{ user.email }}</p>
    <button @click="signoutfromgoogle">Sign Out</button>
  </div>
  <div v-else>
    <p>Not signed in</p>
    <router-link to="/login">Login</router-link>
  </div>
</template>
