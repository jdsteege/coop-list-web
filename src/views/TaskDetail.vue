<script setup lang="ts">
import { useRoute } from "vue-router";

const taskId = useRoute().params.id;
</script>

<template>
  <p>The task id is {{ taskId }}</p>
</template>
