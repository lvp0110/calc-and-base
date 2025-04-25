<template>
  <input v-model="query" />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, watch, defineModel } from "vue";

const route = useRoute();
const router = useRouter();

const query = defineModel();

watch(query, (query) => {
  console.log("Search...", query);

  router.push({ path: "/search", query: { query } });
});

onMounted(() => {
  query.value = route.query.query;
});
</script>
