<template>
  <Dialog v-if="selectElement">
    <p class="title-hookup">{{ selectElement.Name }}</p>
    {{ selectElement.Code }}
    <hr>
    <Slider :hookup="slides" />
    <!-- <swiper-container slides-per-view="1" space-between="10" navigation="true" css-mode="true" pagination="">
      <swiper-slide v-for="slide in slides" :key="slide.Code">
       
        <div class="pdf-container">
          <iframe class="pdf-cert" :src="`${API_SERVER}/${API_CERT}/${slide.File}`" />
        </div>
      </swiper-slide>
    </swiper-container> -->
   
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
swiper-container::part(scrollbar) {
    background-color: rgba(0, 204, 255, .7);
    height: 40px;
    background: rgba(206, 204, 204, 0.3);
    position: absolute;
    width: 100%;
}



</style>