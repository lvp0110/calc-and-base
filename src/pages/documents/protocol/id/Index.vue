<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="route.params.id">
    <template #sidebar>
      <List :items="filteredProtocols" to="/documents/protocol" />
    </template>
    <template #content>
      <div v-if="protocolDocuments?.length > 0">
        <Slider
          :pdfs="protocolDocuments"
          :getFileApi="filesApi.getTestProtocolFileUrl"
        />
      </div>
      <div v-else>
        <h4 style="color: gray">Протокол не найден</h4>
      </div>
    </template>
  </SidebarLayout>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import Slider from "../../../../components/Slider.vue";
import { DocumentType } from "../../../../types";
import { documentsApi, filesApi } from "../../../../config.js";
import { searchFilter } from "../../../../utils/search-filter";

const store = useStore();
const route = useRoute();
const protocols = ref([]);
const protocolDocuments = ref([]);
const filteredProtocols = computed(() =>
  searchFilter(protocols.value, store.getters["selectSearchString"], "Name")
);

const fetchProtocols = async () => {
  try {
    const response = await documentsApi.getDocuments(
      DocumentType.TypeDocTestProtocols
    );

    protocols.value = response.data.data;
  } catch {}
};

const fetchProtocol = async (id) => {
  if (id) {
    const response = await documentsApi.getDocument(
      DocumentType.TypeDocTestProtocols,
      id
    );

    protocolDocuments.value = response.data.data ?? [];
  } else {
    protocolDocuments.value = null;
  }
};

fetchProtocols();
fetchProtocol(route.params.id);

watch(
  () => route.params.id,
  () => {
    fetchProtocol(route.params.id);
  }
);

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/documents", title: "..." },
    { link: "/documents/protocol", title: "ПРОТОКОЛЫ ИСПЫТАНИЙ" },
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
