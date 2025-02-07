<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List :items="selectTechcard" to="/documents/techcard" />
    </template>
    <template #content>
      <p>{{ selectElement.Name }}</p>
      {{ selectElement.Description }}
      <hr>
      <iframe class="pdf-cert" :src="filesApi.getCertificateFileUrl(selectElement.File)"></iframe>
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
import { filesApi } from '../../../../config.js';

const store = useStore();
const route = useRoute();

store.dispatch('getTechCards');

const selectTechcard = computed(() => store.getters['selectMaterialsWithTechCards'])
const selectElement = computed(() => store.getters['selectMaterialsWithTechCards'].find(({ Code }) => Code === route.params.id))

const breadcrumbs = computed(() => {
    const breadcrumbs = [
        { link: '/documents', title: '...' },
        { link: '/documents/techcard', title: 'ТЕХ.КАРТЫ' },
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
@media (prefers-color-scheme: dark) {
  p {
    color: black; 
  }
}
.pdf-cert {
  width: 100%;
  height: 100vh;
}
</style>