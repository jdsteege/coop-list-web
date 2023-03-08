<script setup lang="ts">

import { useRouter } from "vue-router";
import { useCurrentUser, useDatabaseList } from 'vuefire'
import { getDatabase, ref as dbRef } from 'firebase/database'
import type { TaskList } from '../customTypes';

const currentUser = useCurrentUser();
const listArray = useDatabaseList<TaskList>(dbRef(getDatabase(), `users/${currentUser.value?.uid}/lists`));


</script>

<template>
  <p>You have {{ listArray.length }} lists</p>

  <ul>
    <li v-for="list in listArray" :key="list.id">
      <router-link :to="'/list/' + list.id">{{ list.name }}</router-link>
    </li>
  </ul>

  <div><router-link to="/create-list"><button>Create New List</button></router-link></div>
</template>
