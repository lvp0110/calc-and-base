<template>
  <Dialog v-if="selectElement">
    <p class="title-hookup">{{ selectElement.Name }}</p>
    {{ selectElement.Code }}
    <hr>
    <Slider :hookup="slides" />
  </Dialog>
</template>

<script>
import { installSchemesApi } from '../../../../config.js';
import { mapGetters } from 'vuex'
import Dialog from '../../../../components/Dialog.vue';
import Slider from '../../../../components/Slider.vue';

import 'swiper/swiper-bundle.css';
import { register } from 'swiper/element/bundle';
register();

export default {
  data() {
    return {
      slides: []
    }
  },
  components: {
    Dialog,
    Slider
  },
  computed: {
    ...mapGetters(['selectBrandsInstalSchemas']),
    selectElement() {
      const id = this.$route.params.id

      return this.selectBrandsInstalSchemas.find(({ ShortName }) => ShortName === id)
    },
  },
  created() {

    this.$watch(
      () => this.$route.params.id,
      this.fetchData,

      { immediate: true }
    )
  },
  methods: {
    async fetchData(brand) {
      const response = await installSchemesApi.getInstallSchemeByBrand(brand)

      this.slides = response.data.data
    },
   
  },
}

</script>

<style scoped>

</style>