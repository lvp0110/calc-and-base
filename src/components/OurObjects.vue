<template>

  <RouterLink to="/our-objects" class="btn btn-outline-secondary" type="button" style="width: 100%;">ВСЕ ОБЪЕКТЫ
  </RouterLink>

  <!-- <ListObjects v-if="selectedElement" :data="selectedElement" :info="infoData" @hide="hideDiv" /> -->

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ListObjects from './ListObjects.vue';

import { API_PANELS_INFO_BY_BRAND, API_SERVER } from '../config'

export default {
  components: {
    ListObjects
  },

  computed: {
    ...mapGetters(['selectAcousticCategories']),
  },
  data() {
    return {
      isSoundInsulationVisible: false,
      selectedMaterial: null,
      selectedElement: null,
      selectedElementTop: 0,
      infoData: null,
    }
  },
 
}

</script>

<style scoped>

</style>