<script setup lang="ts">

// fetches all the user's lists from firebase rtdb
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirebaseAuth, getCurrentUser } from "vuefire";
import { getDatabase, ref as dbRef, onValue, off } from "firebase/database";

// type for lists
interface List {
  id: string;
  name: string;
}

const isLoading = ref(true);
const lists = ref<List[]>([]);

onMounted(async () => {
  const router = useRouter();
  const route = useRoute();

  const currentUser = await getCurrentUser();
  isLoading.value = false;

  if (currentUser) {
    const db = getDatabase();
    const listsRef = dbRef(db, `users/${currentUser.uid}/lists`);
    onValue(listsRef, (snapshot) => {
      lists.value = snapshot.val();
    });

    return () => {
      off(listsRef);
    };
  }
});

function goToList(listId: string) {
  const router = useRouter();
  router.push(`/list/${listId}`);
}

function createList() {
  const router = useRouter();
  router.push("/create-list");
}

</script>

<template>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div v-if="lists.length === 0">
      <p>You have no lists</p>
      <button @click="createList">Create a list</button>
    </div>
    <div v-else>
      <p>You have {{ lists.length }} lists</p>
      <ul>
        <li v-for="list in lists" :key="list.id">
          <button @click="goToList(list.id)">{{ list.name }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>
