<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List
        :items="filteredTechLists"
        to="/documents/ral"
        keyPath="code"
        namePath="name"
      />
    </template>
    <template #content>
      <p>{{ selectElement.name }}</p>
      {{ selectElement.description }}
      <hr />
      <img
        class="pdf-cert"
        :src="filesApi.getImageFileUrl(selectElement.file)"
      ></img>
    </template>
  </SidebarLayout>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import { filesApi, ralCatalogApi } from "../../../../config.js";
import { DocumentType } from "../../../../types";
import { useStore } from "vuex";
import { searchFilter } from "../../../../utils/search-filter";

const store = useStore();
const route = useRoute();
const techList = ref([]);
const selectElement = computed(() => techList.value.find(({code}) => code === route.params.id))

const filteredTechLists = computed(() =>
  searchFilter(techList.value, store.getters["selectSearchString"])
);

const fetchTechList = async () => {
  try {
    const response = await ralCatalogApi.getDocuments(DocumentType.TypeDocRal);

    techList.value = response.data.data;
  } catch {}
};

fetchTechList();

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/documents", title: "⟪⟪ |" },
    { link: "/documents/techlist", title: "КАТАЛОГ RAL" },
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
