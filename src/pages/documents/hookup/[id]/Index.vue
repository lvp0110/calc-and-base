<template>
  <Dialog v-if="selectElement">
    <p class="title-hookup">{{ selectElement.Name }}</p>
    {{ selectElement.Code }}
    <hr>
    <swiper-container slides-per-view="1" space-between="10" navigation="true" css-mode="true" pagination="">
      <swiper-slide v-for="slide in slides" :key="slide.Code">
       
        <div class="pdf-container">
          <iframe class="pdf-cert" :src="`${API_SERVER}/${API_CERT}/${slide.File}`" />
        </div>
      </swiper-slide>
    </swiper-container>
    <hr>
  </Dialog>
</template>

<script>
import { API_SERVER, API_INSTALL_SCHEMAS, API_CERT } from '../../../../config.js';
import { mapGetters } from 'vuex'
import Dialog from '../../../../components/Dialog.vue';

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
    Dialog
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
.title-certificates {
  margin-top: 20px;
  font-weight: 600;
  width: 80%;
}

li {
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
  color: rgb(54, 52, 52);
}

.pdf-container {
    width: 100%;
    height: 100vh; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.pdf-cert {
    width: 100%;
    height: 100%;
}

</style>