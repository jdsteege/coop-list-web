<script setup lang="ts">

import { useCurrentUser, useDatabaseList } from 'vuefire'
import { getDatabase, ref as dbRef } from 'firebase/database'
import type { TaskList } from '../utils/interfaces';
import { useLists } from '@/utils/firebaseUtils';

const listArray = useLists();

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
