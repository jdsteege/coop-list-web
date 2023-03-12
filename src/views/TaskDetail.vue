<script setup lang="ts">
import { useTask } from "@/utils/firebaseUtils";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

function getParamsTaskId(): string {
  const taskIdRaw = route.params.taskid;

  if (taskIdRaw === undefined) {
    return "";
  } else if (typeof taskIdRaw === "string") {

    return taskIdRaw;
  } else {

    return taskIdRaw[0];
  }
}

const task = useTask(getParamsTaskId());

const isLoading = computed(() => {
  return task.value === undefined;
});

</script>

<template>
  <router-link :to="'/list/' + task?.listId">Back to list</router-link>

  <p>taskId: {{ getParamsTaskId() }}</p>

  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div v-if="task">
      <p>Task name: {{ task.label }}</p>
      <p>Task id: {{ task.id }}</p>
    </div>
    <div v-else>
      <p>Could not find task</p>
    </div>
  </div>
</template>
    