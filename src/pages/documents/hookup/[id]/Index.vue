<template>
  <Dialog v-if="selectElement">
    <p class="title-hookup">{{ selectElement.Name }}</p>
    {{ selectElement.Code }}
    <hr>
    <Slider :hookup="slides" />
  </Dialog>
</template>

<script>
import { API_SERVER, API_INSTALL_SCHEMAS, API_CERT } from '../../../../config.js';
import { mapGetters } from 'vuex'
import Dialog from '../../../../components/Dialog.vue';
import Slider from '../../../../components/Slider.vue';

import 'swiper/swiper-bundle.css';
import { register } from 'swiper/element/bundle';
register();

export default {
  data() {
    return {
      API_SERVER,
      API_CERT,
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
    async fetchData(id) {

      let res = await fetch(`${API_SERVER}/${API_INSTALL_SCHEMAS}/${id}`)
      let resData = await res.json()

      console.log({ resData })
      this.slides = resData.data

    },
   
  },
}

</script>

<style scoped>

</style>