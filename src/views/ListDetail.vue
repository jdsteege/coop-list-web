<script setup lang="ts">
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

const requestedListId = ref<string | string[]>("");

// fetch the requested list from firebase rtdb
const list = ref<List | null>(null);

onMounted(async () => {
    const router = useRouter();
    const route = useRoute();

    requestedListId.value = route.params.listid;

    const currentUser = await getCurrentUser();
    isLoading.value = false;

    if (currentUser) {
        const db = getDatabase();
        const listRef = dbRef(db, `users/${currentUser.uid}/lists/${route.params.listid}`);
        onValue(listRef, (snapshot) => {
            list.value = snapshot.val();
        });

        return () => {
            off(listRef);
        };
    }
});

</script>

<template>
    <p>listId: {{ requestedListId }}</p>
    <div v-if="isLoading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <div v-if="list">
            <p>List name: {{ list.name }}</p>
            <p>List id: {{ list.id }}</p>
        </div>
        <div v-else>
            <p>Could not find list</p>
        </div>
    </div>
</template>
    