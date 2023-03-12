<script setup lang="ts">
import { pushNewTask } from "@/utils/firebaseUtils";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const taskLabel = ref("");

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

function createTask() {

    pushNewTask({ label: taskLabel.value, listId: getParamsListId(), completed: false }).then((ref) => { router.push(`/list/${getParamsListId()}`); });

}

</script>


<template>
    <!-- form to create new task -->

    <form @submit.prevent="createTask">
        <label for="task-label">Task name</label>
        <input type="text" id="task-label" v-model="taskLabel" />
        <button type="submit">Create task</button>
    </form>
</template>