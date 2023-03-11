<script setup lang="ts">
import { useList } from "@/utils/firebaseUtils";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

function getParamsListId(): string {
    const listIdRaw = route.params.listid;
    if (typeof listIdRaw === "string") {
        return listIdRaw;
    } else {
        return listIdRaw[0];
    }
}

const taskList = useList(getParamsListId());

const isLoading = computed(() => {
    return taskList.value === undefined;
});

</script>

<template>
    <router-link to="/lists">Back to lists</router-link>

    <p>listId: {{ getParamsListId() }}</p>
    <div v-if="isLoading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <div v-if="taskList">
            <p>List name: {{ taskList.name }}</p>
            <p>List id: {{ taskList.id }}</p>
        </div>
        <div v-else>
            <p>Could not find list</p>
        </div>
    </div>
</template>
    