<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List :items="selectAlbums" to="/documents/air" keyPath="Name" />
    </template>
    <template #content>
      <div v-if="selectElement">
        <!-- <p class="title-hookup">{{ selectElement.Name }}</p> -->
        <p>{{ selectElement.Description }}</p>
        
        <hr>
        <iframe class="pdf-cert" :src="filesApi.getCertificateFileUrl(selectElement.File)"></iframe>
      </div>
    </template>
  </SidebarLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import SidebarLayout from '../../../../components/Layouts/SidebarLayout.vue';
import List from '../../../../components/List/List.vue';
import { filesApi }from '../../../../config.js';

const store = useStore()
const route = useRoute();

store.dispatch('getAlbums')

const selectAlbums = computed(() => store.getters['selectAlbums'])
const selectElement = computed(() => store.getters['selectAlbums'].find(({ Name }) => Name === route.params.id))

const breadcrumbs = computed(() => {
    const breadcrumbs = [
        { link: '/', title: '...' },
        { link: '/documents/air', title: 'АЛЬБОМЫ' },
    ]

    if (route.params.id) {
        breadcrumbs.push({ title: route.params.id })
    }

    return breadcrumbs
})
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