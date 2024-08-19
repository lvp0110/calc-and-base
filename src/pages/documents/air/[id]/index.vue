<template>
  <div v-if="selectElement">
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <!-- <p class="title-hookup">{{ selectElement.Name }}</p> -->
    {{ selectElement.Description }}
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

const selectElement = computed(() => store.getters['selectAlbums'].find(({ Name }) => Name === id))

const breadcrumbs = computed(() => [
    { link: '/', title: 'ДОКУМЕНТЫ' }, 
    { link: '/documents/air', title: 'АЛЬБОМЫ...' },
    { title: id }
])
</script>

<style scoped>
.pdf-cert {
  width: 100%;
  height: 100vh;
}
</style>