<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <iframe class="frame" src="https://vibro.constrtodo.ru"></iframe>
</template>

<script setup>
import MainPageLayout from "../../components/Layouts/MainPageLayout.vue";
import { computed } from "vue";

const breadcrumbs = computed(() => {
  const breadcrumbs = [{ link: "/", title: "⟪⟪ | СРАВНЕНИЕ МАТЕРИАЛОВ" }];

  return breadcrumbs;
});
</script>

<style scoped>
.frame {
  height: 100vh;
}
</style>
