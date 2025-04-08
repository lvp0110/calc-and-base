<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List
        :items="selectBrandsInstalSchemas"
        to="/documents/hookup"
        keyPath="ShortName"
      />
    </template>
    <template #content>
      <div v-if="selectElement" class="content">
        <p>{{ selectElement.Name }}</p>
        {{ selectElement.Code }}
        <hr />
        <iframe
          v-if="slides.length === 1"
          class="pdf-cert"
          :src="filesApi.getCertificateFileUrl(slides[0].file)"
        >
        </iframe>
        <Slider v-else-if="slides.length > 1" :hookup="slides" />
      </div>
    </template>
  </SidebarLayout>
</template>

<script setup>
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import { installSchemesApi } from "../../../../config.js";
import { ref, computed, watch } from "vue";
import Slider from "../../../../components/Slider.vue";
import List from "../../../../components/List/List.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { filesApi } from "../../../../config.js";

import "swiper/swiper-bundle.css";
import { register } from "swiper/element/bundle";
register();

const store = useStore();
const route = useRoute();

const slides = ref([]);

store.dispatch("getBrandsInstalSchemas");

const selectBrandsInstalSchemas = computed(
  () => store.getters["selectBrandsInstalSchemas"]
);
const selectElement = computed(() =>
  store.getters["selectBrandsInstalSchemas"].find(
    ({ ShortName }) => ShortName === route.params.id
  )
);

const fetchData = async (brand) => {
  if (brand) {
    slides.value = [];

    const response = await installSchemesApi.getInstallSchemeByBrand(brand);

    slides.value = response.data.data;
  } else {
    slides.value = [];
  }
};

fetchData(route.params.id);

watch(
  () => route.params.id,
  (brand) => {
    fetchData(brand);
  }
);

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/documents", title: "..." },
    { link: "/documents/hookup", title: "МОНТАЖНЫЕ СХЕМЫ" },
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

.content {
  flex-grow: 1;
  overflow: hidden;
}

.pdf-cert {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
