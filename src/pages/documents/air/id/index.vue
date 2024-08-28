<template>
  <div v-if="selectElement">
    <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />
    <!-- <p class="title-hookup">{{ selectElement.Name }}</p> -->
    <p>{{ selectElement.Description }}</p>
    
    <hr>
    <iframe class="pdf-cert" :src="filesApi.getCertificateFileUrl(selectElement.File)"></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import { filesApi }from '../../../../config.js';

const store = useStore()
const route = useRoute();

const id = route.params.id

store.dispatch('getAlbums')

const selectElement = computed(() => store.getters['selectAlbums'].find(({ Name }) => Name === id))

const breadcrumbs = computed(() => [
    { link: '/', title: '...' }, 
    { link: '/documents/air', title: 'АЛЬБОМЫ' },
    { title: id }
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
.pdf-cert {
  width: 100%;
  height: 100vh;
}
</style>