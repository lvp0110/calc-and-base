<template>
  <button type="button" class="btn close-btn" @click="$emit('hide')" style="position: fixed;top: 0;right: 8px;">
    <svg height="50" width="50">
      <circle r="22" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="2" />
      <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3" />
      <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3" />
    </svg>
  </button>
  <div class="col-11 information-block" :style="{ top: position.y + 'px', left: position.x + 'px' }">

    <p style="margin-top:5px ; font-weight: 600;">{{ data.Name }}</p>
    <hr>
    <swiper-container slides-per-view="1" space-between="10" navigation="true" css-mode="true" pagination="true">
      <swiper-slide v-for="slide in data.slides" :key="slide.Code">
        <!-- <a class="btn btn-outline-secondary btn-lg text-download-btn" @click="downloadTextFile(slide)">Скачать текст</a> -->
        <ul style="border: solid 2px gray;" @click="downloadTextFile(slide)">
          <li class="cert" v-if="slide.Type != 0"> Тип: {{ slide.Type }} </li>
          <li class="cert" v-if="slide.Code != 0">№ {{ slide.Code }} </li>
          <li class="cert" v-if="slide.ValPeriod != 0"> Срок действия: {{ formatTime(slide.ValPeriod) }} </li>
          <li class="cert" v-if="slide.Indicators != 0"> Класс пожарной опасности: {{ slide.Indicators }} </li>
        </ul>
        <a class="btn btn-outline-secondary btn-lg pdf-btn" role="button"
          :href="`${API_TESTSERVER}/${API_CERT}/${slide.File}`" target="My Pdf">
          скачать PDF
        </a>
        <embed :src="`${API_TESTSERVER}/${API_CERT}/${slide.File}`" class="pdf-cert" />
      </swiper-slide>
    </swiper-container>
    <hr>
  </div>

</template>

<script>
import { API_TESTSERVER, API_CERT } from '../config';

import 'swiper/swiper-bundle.css';
import { register } from 'swiper/element/bundle';
register();

export default {

  props: ['data'],
  data() {
    return {
      position: { x: 0, y: 75 },
      API_TESTSERVER,
      API_CERT
    }
  },
  methods: {
    setPosition(event) {
      this.position.x = event.clientX;
      this.position.y = event.clientY;
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
li.cert {
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
  display: none;
  width: 100%;
  height: 100%;
}

.pdf-btn {
  display: none;
  margin-bottom: 10px;
}

@media screen and (max-width: 525px) {
  .img-cert {
    display: block;
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