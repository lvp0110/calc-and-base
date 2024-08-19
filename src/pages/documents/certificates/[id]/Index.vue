<template>
  <div v-if="selectElement">
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <p class="title-certificates">{{ selectElement.Name }}</p>
    <p> количество документов: {{ slides.length }}</p>
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
        { link: '/', title: 'ДОКУМЕНТЫ' },
        { link: '/documents/certificates', title: 'СЕРТИФИКАТЫ' },
        { title: this.selectElement?.Code }
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
  margin-top: 50px;
}
</style>
