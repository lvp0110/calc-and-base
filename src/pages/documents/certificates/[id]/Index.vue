<template>
  <Dialog v-if="selectElement">
    <p class="title-certificates">{{ selectElement.Name }}</p>
    <p> количество документов: {{ slides.length }}</p>
    <hr>
    <swiper-container slides-per-view="1" space-between="10" navigation="true" css-mode="true" pagination="">
      <swiper-slide v-for="slide in slides" :key="slide.Code">
        <!-- <a class="btn btn-outline-secondary btn-lg text-download-btn" @click="downloadTextFile(slide)">Скачать текст</a> -->
        <ul style="border: solid 2px gray;" @click="downloadTextFile(slide)">
          <li v-if="slide.Type != 0"> Тип: {{ slide.Type }} </li>
          <li v-if="slide.Code != 0">№ {{ slide.Code }} </li>
          <li v-if="slide.ValPeriod != 0"> Срок действия: {{ formatTime(slide.ValPeriod) }} </li>
          <li v-if="slide.Indicators != 0"> Класс пожарной опасности: {{ slide.Indicators }} </li>
        </ul>
        <a class="btn btn-outline-secondary btn-lg pdf-btn" role="button"
          :href="`${API_SERVER}/${API_CERT}/${slide.File}`" target="My Pdf">
          скачать PDF
        </a>
        <embed class="pdf-cert" :src="`${API_SERVER}/${API_CERT}/${slide.File}`"  />
      </swiper-slide>
    </swiper-container>
    <hr>  
  </Dialog>
</template> 

<script>
import { API_SERVER, API_CERT_MATERIAL, API_CERT } from '../../../../config.js';
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
    ...mapGetters(['selectMaterialsWithCerts']),
    selectElement() {
      const id = this.$route.params.id

      return this.selectMaterialsWithCerts.find(({ Code }) => Code === id)
    },
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      this.fetchData,
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async fetchData(id) {

      let res = await fetch(`${API_SERVER}/${API_CERT_MATERIAL}/${id}`)
      let resData = await res.json()

      console.log({ resData })
      this.slides = resData.data
      //   this.selectedElement = { ...elem, slides: resData.data };

    },
    formatTime(value) {
      const data = new Date(value)

      return data.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    },
    downloadTextFile(slide) {
      const textData = `Тип: ${slide.Type}\n№ ${slide.Code}\nСрок действия: ${this.formatTime(slide.ValPeriod)}\nКласс пожароопасности: ${slide.Indicators}`;
      const blob = new Blob([textData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'slide_info.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    },
  },
}

</script>

<style scoped>
.title-certificates {
  margin-top: 15px;
  font-weight: 600;
}

li {
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
  color: rgb(54, 52, 52);
}

.pdf-cert {
  display: block;
  width: 100%;
  height: 1200px;
}

.img-cert {
  display: block;
  width: 100%;
  height: 100%;
}

.pdf-btn {
  display: none;
  margin-bottom: 10px;
}

@media screen and (max-width: 525px) {
  .img-cert {
    display: none;
  }
  .pdf-cert {
    display: none;
  }
  .pdf-btn {
    display: block;
    margin-bottom: 300px;
  }

}
</style>




