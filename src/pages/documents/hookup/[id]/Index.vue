<template>
  <Dialog v-if="selectElement">
    <p class="title-hookup">{{ selectElement.Name }}</p>
    {{ selectElement.Code }}
    <hr>
    <div v-for="slide in slides" :key="slide.Code">
      <a class="btn btn-outline-secondary btn-lg pdf-btn" role="button"
        :href="`${API_SERVER}/${API_CERT}/${slide.File}`" target="My Pdf">
        скачать PDF
      </a>
      <embed :src="`${API_SERVER}/${API_CERT}/${slide.File}`" class="pdf-hookup" />
    </div>
    <hr>
  </Dialog>
</template>

<script>
import { API_SERVER, API_INSTALL_SCHEMAS, API_CERT } from '../../../../config.js';
import { mapGetters } from 'vuex'
import Dialog from '../../../../components/Dialog.vue';

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

<style>
.title-hookup {
  margin-top: 15px;
  font-weight: 600;
}

.pdf-hookup {
  display: block;
  width: 100%;
  height: 1200px;
}

.pdf-btn {
  display: none;
  margin-bottom: 10px;
}

@media screen and (max-width: 525px) {

  .pdf-hookup {
    display: none;
  }

  .pdf-btn {
    display: block;
    margin-bottom: 300px;
  }

}
</style>