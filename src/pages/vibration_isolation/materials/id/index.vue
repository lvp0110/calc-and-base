<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List :items="selectMaterials" to="/vibration_isolation/materials" />
    </template>
    <template #content>
      <Sections :sections="sections" />
    </template>
  </SidebarLayout>
</template>

<script setup>
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import List from "../../../../components/List/List.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import Sections from "../../../../components/Sections/index.vue";
import { computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { materialsApi } from "../../../../config";

const store = useStore();
const route = useRoute();

store.dispatch("getMaterialsVi");

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

const selectMaterials = computed(() => store.getters["selectMaterialsVi"]);
const selectElement = computed(() =>
  store.getters["selectMaterialsVi"].find(
    ({ Code }) => Code === route.params.id
  )
);
const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/vibration_isolation", title: "..." },
    { link: "/vibration_isolation/materials", title: "МАТЕРИАЛЫ" },
  ];

  if (route.params.id) {
    breadcrumbs.push({ title: route.params.id });
  }

  return breadcrumbs;
});

onMounted(fetchSections);
watch(() => route.params.id, fetchSections);
</script>

