<script setup lang="ts">
import { pushNewList } from "@/utils/firebaseUtils";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const listName = ref("");

function createList() {

    pushNewList({ name: listName.value }).then((ref) => { router.push(`/list/${ref.key}`); });

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