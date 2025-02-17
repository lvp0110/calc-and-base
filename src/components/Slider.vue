<template>
  <swiper-container
    ref="mySwiper"
    :slides-per-view="1"
    :space-between="10"
    :centered-slides="true"
    :pagination="{ clickable: true, renderBullet: renderBullet }"
    :breakpoints="{ 768: { slidesPerView: 1 } }"
    @swiperprogress="onProgress"
    @swiperslidechange="onSlideChange"
  >
    <swiper-slide
      v-for="(image, index) in images"
      :key="index"
      @click="goToNextSlide"
    >
      <img class="img" :src="image" alt="" />
    </swiper-slide>

    <swiper-slide
      v-for="slide in pdfs"
      :key="slide.Code"
      @click="goToNextSlide"
    >
      <div>
        <ul @click.stop="downloadTextFile(slide)">
          <li v-if="slide.Type != 0">Тип: {{ slide.Type }}</li>
          <li v-if="slide.Code != 0">№ {{ slide.Code }}</li>
          <li v-if="slide.ValPeriod != 0 && slide.ExpireDate">
            Срок действия: {{ formatTime(slide.ExpireDate) }}
          </li>
          <li v-if="slide.Indicators != 0">
            Класс пожарной опасности: {{ slide.Indicators }}
          </li>
        </ul>
        <a
          :href="filesApi.getCertificateFileUrl(slide.File)"
          target="_blank"
          @click.stop
          >Посмотреть</a
        >
        <div class="pdf-container">
          <iframe
            class="pdf-cert"
            :src="filesApi.getCertificateFileUrl(slide.File)"
            @click="goToNextSlide"
          ></iframe>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide
      v-for="slide in hookup"
      :key="slide.Code"
      @click="goToNextSlide"
    >
      <p style="bottom: 20px"></p>
      <div>
        <div class="hookup-container">
          <iframe
            class="pdf-cert"
            :src="filesApi.getCertificateFileUrl(slide.File)"
          >
          </iframe>
        </div>
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<script>
import { filesApi } from "../config";
import { register } from "swiper/element/bundle";
register();

export default {
  props: {
    pdfs: Array,
    images: Array,
    hookup: Array,
  },
  data() {
    return {
      filesApi,
      swiper: null,
    };
  },
  setup() {
    const onProgress = (e) => {
      const [swiper, progress] = e.detail;
    };

    const onSlideChange = (e) => {
    };

    return {
      onProgress,
      onSlideChange,
    };
  },
  mounted() {
    this.swiper = this.$refs.mySwiper.swiper;
  },
  methods: {
    goToNextSlide() {
      if (this.swiper) {
        const nextIndex =
          (this.swiper.realIndex + 1) % this.swiper.slides.length;
        this.swiper.slideTo(nextIndex);
      } else {
        console.error("not found");
      }
    },
    formatTime(value) {
      const data = new Date(value);
      return data.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    renderBullet(index, className) {
      if (this.$props.hookup?.length > 0) {
        return (
          '<span class="' +
          className +
          '">' +
          this.$props.hookup[index].Name +
          "</span>"
        );
      }

      const arr = this.$props.images ?? this.$props.pdfs;

      return (
        '<span class="' + className + '">' + arr?.[index]?.Type + "</span>"
      );
    },
  },
};
</script>

<style scoped>
swiper-container {
  flex-grow: 1;
  width: 100%;
}
swiper-container::part(pagination) {
  top: 0;
  background-color: none;
  height: 40px;
  display: flex;
}

swiper-container::part(bullet),
swiper-container::part(bullet-active) {
  border-radius: 5px;
  flex-grow: 1;
  height: 100%;
  margin: 1px;
  font-size: 12px;
  opacity: 1;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

ul {
  margin-top: 55px;
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  color: var(--list-swiper-color);
  border: var(--list-swiper-border);
}
swiper-container::part(bullet-active) {
  background: grey;
  color: white;
}

.img {
  width: 100%;
}

.pdf-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hookup-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 55px;
}

.pdf-cert {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
