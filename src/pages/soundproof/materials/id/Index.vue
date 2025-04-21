<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List :items="selectMaterials" to="/soundproof/materials" />
    </template>
    <template #content>
      <Sections :sections="sections" />
    </template>
  </SidebarLayout>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import { materialsApi } from "../../../../config";
import Sections from '../../../../components/Sections/index.vue'

const store = useStore();
const route = useRoute();

store.dispatch("getMaterials");

const sections = ref([]);

const fetchSections = async () => {
  try {
    if (!route.params.id) {
      return;
    }

    const response = await materialsApi.getSections(route.params.id);

    sections.value = response.data.data;
  } catch {}
};

onMounted(fetchSections);
watch(() => route.params.id, fetchSections);

const selectMaterials = computed(() => store.getters["selectMaterials"]);
const selectElement = computed(() =>
  store.getters["selectMaterials"].find(({ Code }) => Code === route.params.id)
);
const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/soundproof", title: "⟪⟪ |" },
    { link: "/soundproof/materials", title: "МАТЕРИАЛЫ" },
  ];

  if (route.params.id) {
    breadcrumbs.push({ title: route.params.id });
  }

  return breadcrumbs;
});
</script>

<style scoped>
</style>
