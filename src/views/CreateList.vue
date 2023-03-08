<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirebaseAuth, getCurrentUser } from "vuefire";
import { getDatabase, ref as dbRef, onValue, off, push, set } from "firebase/database";

// type for lists
interface List {
    id: string;
    name: string;
}

const isLoading = ref(true);

const listName = ref("");

function goToList(listId: string) {
    const router = useRouter();
    router.push(`/list/${listId}`);
}

async function createList() {
    // create a new list and send it to firebase rtdb
    let newList: List = {
        id: "",
        name: listName.value,
    };

    const db = getDatabase();
    const currentUser = await getCurrentUser();

    if (currentUser) {
        const listsRef = dbRef(db, `users/${currentUser.uid}/lists`);

        const newRef = await push(listsRef, newList);
        newList.id = newRef.key!;

        await set(newRef, newList);

        goToList(newList.id);
    }

}

</script>


<template>
    <!-- form to create new list -->

    <form @submit.prevent="createList">
        <label for="list-name">List name</label>
        <input type="text" id="list-name" v-model="listName" />
        <button type="submit">Create list</button>
    </form>
</template>