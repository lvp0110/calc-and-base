<template>
  <div v-if="selectElement">
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <!-- <p class="title-certificates">{{ selectElement.Name }}</p> -->
    <p>КОЛИЧЕСТВО ДОКУМЕНТОВ: {{ slides.length }}</p>
    <hr>
    <Slider :pdfs="slides" />
  </div>
</template>
 
<script>
import { certificatesApi } from '../../../../config.js';
import { mapGetters } from 'vuex'
import Slider from '../../../../components/Slider.vue';
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';

export default {
  created() {
    this.$watch(
      () => this.$route.params.id,
      this.fetchData,
      { immediate: true }
    )
  },
  data() {
    return {
      slides: [],
    }
  },
  components: {
    Slider,
    MainPageLayout
  },
  computed: {
    ...mapGetters(['selectMaterialsWithCerts']),
    selectElement() {
      const id = this.$route.params.id

      return this.selectMaterialsWithCerts.find(({ Code }) => Code === id)
    },
    breadcrumbs() {
      return [
        { link: '/', title: '...' },
        { link: '/documents/certificates', title: 'СЕРТИФИКАТЫ' },
        { title: this.selectElement?.Name }
      ]
    }
  },
  methods: {
    async fetchData(id) {
      const response = await certificatesApi.getCertificates(id)

      this.slides = response.data.data
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
p {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 14px;
  background: radial-gradient(circle at left, #c7ced4, #f9f9fa00);
  padding: 5px;
}

li {
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
  color: rgb(54, 52, 52);
  
}

.pdf-cert {
  width: 100%;
  height: 100%;
  margin-top: 50px;
}
</style>
