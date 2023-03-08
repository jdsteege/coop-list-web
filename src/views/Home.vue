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
    <div>
      <p>Welcome {{ user.email }}</p>
    </div>
    <div><button><router-link to="/lists">View your lists</router-link></button></div>
    <div><button @click="signoutfromgoogle">Sign Out</button></div>
  </div>
  <div v-else>
    <p>Not signed in</p>
    <router-link to="/login?redirect=/lists">Login</router-link>
  </div>
</template>
