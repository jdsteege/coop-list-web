<script setup lang="ts">
import { getDatabase, push, ref as dbRef } from "firebase/database";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";
import type { TaskList } from '../customTypes';

const router = useRouter();
const currentUser = useCurrentUser();

const listName = ref("");

function goToList(listId: string) {
    router.push(`/list/${listId}`);
}

function createList() {
    // create a new list and send it to firebase rtdb
    let newList: TaskList = {
        id: "",
        name: listName.value,
    };

    if (currentUser) {
        const listsRef = dbRef(getDatabase(), `users/${currentUser.value?.uid}/lists`);

        push(listsRef, newList).then((ref) => { goToList(ref.key!) });
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