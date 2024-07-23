<template>
  <Dialog v-if="selectElement">
    <p class="title-certificates">{{ selectElement.Name }}</p>
    <p> количество документов: {{ slides.length }}</p>
    <hr>
    <Slider :pdfs="slides" />
  </Dialog>
</template>
 
<script>
import { API_SERVER, API_CERT_MATERIAL, API_CERT } from '../../../../config.js';
import { mapGetters } from 'vuex'
import Dialog from '../../../../components/Dialog.vue';
import Slider from '../../../../components/Slider.vue';

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
      API_SERVER,
      API_CERT,
      slides: [],
    }
  },
  components: {
    Dialog,
    Slider
  },
  computed: {
    ...mapGetters(['selectMaterialsWithCerts']),
    selectElement() {
      const id = this.$route.params.id

      return this.selectMaterialsWithCerts.find(({ Code }) => Code === id)
    },
  },
  methods: {
    async fetchData(id) {
      let res = await fetch(`${API_SERVER}/${API_CERT_MATERIAL}/${id}`)
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
