<template>
  <Dialog v-if="selectElement">
    <p class="title-techcard">{{ selectElement.Name }}</p>
    <p>{{ selectElement.Code }}_2023</p>
    <hr>
    <div class="pdf-container">
      <iframe class="pdf-techcard" :src="filesApi.getCertificateFileUrl(selectElement.File)" />
    </div>
  </Dialog>
</template>

<script>
import { filesApi } from '../../../../config.js';
import { mapGetters } from 'vuex'
import Dialog from '../../../../components/Dialog.vue';

export default {
  data() {
    return {
      filesApi
    }
  },
  components: {
    Dialog
  },
  computed: {
    ...mapGetters(['selectMaterialsWithTechCards']),
    selectElement() {
      const id = this.$route.params.id

      return this.selectMaterialsWithTechCards.find(({ Code }) => Code === id)
    },
  },
  methods: {
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
.title-techcard {
  margin-top: 20px;
  font-weight: 600;
  width: 80%;
}

.pdf-techcard {
  display: block;
  margin-top: 18px;
  width: 100%;
  height: 100vh;
}

.pdf-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>