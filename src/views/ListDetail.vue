<script setup lang="ts">
import { useList, useTasks } from "@/utils/firebaseUtils";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

function getParamsListId(): string {
    const listIdRaw = route.params.listid;

    if (listIdRaw === undefined) {
        return "";
    } else if (typeof listIdRaw === "string") {
        return listIdRaw;
    } else {
        return listIdRaw[0];
    }
}

const taskList = useList(getParamsListId());

const isLoading = computed(() => {
    return taskList.value === undefined;
});

const tasks = useTasks(getParamsListId());

console.log(tasks.value.length);

</script>

<template>
    <router-link to="/lists">Back to your lists</router-link>

    <p>listId: {{ getParamsListId() }}</p>
    <div v-if="isLoading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <div v-if="taskList">
            <p>List name: {{ taskList.name }}</p>
            <p>List id: {{ taskList.id }}</p>
            <ul>
                <li v-for="task in tasks" :key="task.id">
                    <router-link :to="'/task/' + task.id">{{ task.label }}</router-link>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Could not find list</p>
        </div>
    </div>

    <div><router-link :to="'/create-task/' + getParamsListId()"><button>Create New Task</button></router-link></div>
</template>
    