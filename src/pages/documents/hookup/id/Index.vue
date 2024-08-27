<template>
  <div v-if="selectElement">
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <p>{{ selectElement.Name }}</p>
    {{ selectElement.Code }}
    <hr>
    <Slider :hookup="slides" />
  </div>
</template>

<script setup>
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import { installSchemesApi } from '../../../../config.js';
import { ref, computed } from 'vue'
import Slider from '../../../../components/Slider.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import 'swiper/swiper-bundle.css';
import { register } from 'swiper/element/bundle';
register();

const store = useStore()
const route = useRoute()

const slides = ref([])

const brand = route.params.id

store.dispatch('getBrandsInstalSchemas')

const selectElement = computed(() => store.getters['selectBrandsInstalSchemas']?.find(({ ShortName }) => ShortName === brand))

const fetchData = async (brand) => {
  const response = await installSchemesApi.getInstallSchemeByBrand(brand)

  slides.value = response.data.data
}

fetchData(brand)

const breadcrumbs = computed(() => [
  { link: '/', title: '...' },
  { link: '/documents/hookup', title: 'СХЕМА' },
  { title: selectElement.value?.Name  }
])
</script>

<style scoped>
p {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  background: radial-gradient(circle at left, #c7ced4, #f9f9fa00);
  padding: 5px;
}
</style>