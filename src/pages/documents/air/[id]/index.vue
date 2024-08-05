<template>
  <Dialog v-if="selectElement">
    <p class="title-hookup">{{ selectElement.Name }}</p>
    {{ selectElement.Description }}
    <hr>
    <iframe class="pdf-cert" :src="filesApi.getCertificateFileUrl(selectElement.File)"></iframe>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import Dialog from '../../../../components/Dialog.vue';
import { filesApi }from '../../../../config.js';

const store = useStore()
const route = useRoute();

const id = route.params.id

const selectElement = computed(() => store.getters['selectAlbums'].find(({ Name }) => Name === id))
</script>

  
<style scoped>
.pdf-cert {
  width: 100%;
  height: 100%;
}
</style>