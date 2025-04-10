<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="brochure">
    <template #sidebar>
      <List
        :items="brochures"
        to="/documents/brochure"
        keyPath="file"
        namePath="name"
      />
    </template>
    <template #content>
      <p>{{ brochure.name }}</p>
      <hr />
      <iframe
        class="pdf-cert"
        :src="filesApi.getBrochureFileUrl(brochure.file)"
      ></iframe>
    </template>
  </SidebarLayout>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import { filesApi, brochuresApi } from "../../../../config.js";

const route = useRoute();

const brochures = ref([]);
const brochure = computed(() =>
  brochures.value.find(({ file }) => file === route.params.id)
);

const fetchBrochures = async () => {
  const response = await brochuresApi.getBrochures();

  brochures.value = response.data.data ?? [];
};

onMounted(() => {
  fetchBrochures();
});

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/documents", title: "..." },
    { link: "/documents/brochure", title: "КАТАЛОГИ | БРОШЮРЫ" },
    { title: brochure.value?.description },
  ];

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
