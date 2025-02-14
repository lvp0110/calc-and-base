<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />
  <SidebarLayout :hasContent="route.params.id">
    <template #sidebar>
      <List :items="selectMaterialsWithCerts" to="/documents/certificates" />
    </template>
    <template #content>
      <div v-if="slides?.length > 0">
        <p>КОЛИЧЕСТВО ДОКУМЕНТОВ: {{ slides.length }}</p>
        <hr />
        <Slider :pdfs="slides" />
      </div>
      <div v-else> <h4 style="color: gray;">Материал в процессе сертификации</h4> </div>
    </template>
  </SidebarLayout>
</template>

<script setup>
import { certificatesApi } from "../../../../config.js";
import Slider from "../../../../components/Slider.vue";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import { useRoute } from "vue-router";
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

const slides = ref(null);

store.dispatch("getMaterialsWithCerts");

const selectMaterialsWithCerts = computed(
  () => store.getters["selectMaterialsWithCerts"]
);

const fetchSlides = async (id) => {
  if (id) {
    slides.value = []

    const response = await certificatesApi.getCertificates(id);

    slides.value = response.data.data;
  } else {
    slides.value = null;
  }
};

fetchSlides(route.params.id);

watch(
  () => route.params.id,
  () => {
    fetchSlides(route.params.id);
  }
);

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/documents", title: "..." },
    { link: "/documents/certificates", title: "СЕРТИФИКАТЫ" },
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
  background: radial-gradient(circle at left, #c7ced4, #f9f9fa00);
  padding: 5px;
  color: black;
}

li {
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  color: rgb(54, 52, 52);
}

.pdf-cert {
  width: 100%;
  height: 100%;
  margin-top: 50px;
}

</style>
