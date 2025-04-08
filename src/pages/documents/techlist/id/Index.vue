<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List :items="techList" to="/documents/techlist" keyPath="Code" />
    </template>
    <template #content>
      <p>{{ selectElement.name }}</p>
      {{ selectElement.description }}
      <hr />
      <iframe
        class="pdf-cert"
        :src="filesApi.getTechSheetFileUrl(selectElement.file)"
      ></iframe>
    </template>
  </SidebarLayout>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import { filesApi, documentsApi } from "../../../../config.js";
import { DocumentType } from "../../../../types";

const route = useRoute();
const techList = ref([]);
const selectElement = ref(null);

const fetchTechList = async () => {
  try {
    const response = await documentsApi.getDocuments(
      DocumentType.TypeDocTechSheets
    );

    techList.value = response.data.data;
  } catch {}
};

const fetchTechElement = async (id) => {
  if (id) {
    const response = await documentsApi.getDocument(
      DocumentType.TypeDocTechSheets,
      id
    );

    selectElement.value = response.data.data?.[0];
  } else {
    selectElement.value = null;
  }
};

fetchTechList();
fetchTechElement(route.params.id);

watch(
  () => route.params.id,
  () => {
    fetchTechElement(route.params.id);
  }
);

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/documents", title: "..." },
    { link: "/documents/techlist", title: "ТЕХЛИСТ" },
  ];

  if (route.params.id) {
    breadcrumbs.push({ title: route.params.id });
  }

  return breadcrumbs;
});
</script>

<style scoped>
p {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  background: radial-gradient(circle at left, #c7ced4, #f9f9fa00);
  padding: 5px;
  color: black;
}

.pdf-cert {
  width: 100%;
  height: 100vh;
}
</style>
