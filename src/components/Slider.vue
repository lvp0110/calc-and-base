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
          <li v-if="slide.type && slide.type != 0">Тип: {{ slide.type }}</li>
          <li v-if="slide.code && slide.code != 0">№ {{ slide.code }}</li>
          <li
            v-if="
              slide.val_period && slide.val_period != 0 && slide.expire_date
            "
          >
            Срок действия: {{ formatTime(slide.expire_date) }}
          </li>
          <li v-if="slide.indicators && slide.indicators != 0">
            Класс пожарной опасности: {{ slide.indicators }}
          </li>
          <li v-if="slide.name">
            {{ slide.name }}
          </li>
          <li v-if="slide.description">
            {{ slide.description }}
          </li>
        </ul>
        <a
          class="copy-link"
          :href="filesApi(slide.file)"
          target="_blank"
          @click.stop
        >
          <img
            class="icon-img"
            src="https://db.acoustic.ru:3005/api/v1/constr/i_pdf.svg"
            alt=""
          />
        </a>
        <div class="pdf-container">
          <!-- <img
            v-for="pdfPage in slide.images"
            :src="filesApi.getImageFileUrl(pdfPage.file)"
          /> -->
          <iframe
            class="pdf-cert"
            :src="filesApi(slide.file)"
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
          <iframe class="pdf-cert" :src="filesApi(slide.file)"> </iframe>
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
    getFileApi: Function,
  },
  data() {
    return {
      swiper: null,
    };
  },
  setup() {
    const onProgress = (e) => {
      const [swiper, progress] = e.detail;
    };

    const onSlideChange = (e) => {};

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
          this.$props.hookup[index].name +
          "</span>"
        );
      }

      if (this.$props.pdfs?.length > 0) {
        return (
          '<span class="' +
          className +
          '">' +
          (this.$props.pdfs[index]?.type ?? this.$props.pdfs[index]?.name) +
          "</span>"
        );
      }

      return (
        '<span class="' +
        className +
        '">' +
        this.$props.images?.[index]?.Type +
        "</span>"
      );
    },
  },
  computed: {
    filesApi() {
      return this.$props.getFileApi ?? filesApi.getCertificateFileUrl;
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
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  height: 100vh;
  overflow: hidden;
}
.copy-link {
  width: 50px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 3px;
  color: #575656;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-link:hover {
  background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
  border-radius: 10px;
}

.copy-link:focus {
  background: radial-gradient(circle at center, #efeff16e, #d4d9de);
  color: rgb(158, 161, 163);
  border-radius: 10px;
}
.icon-img {
  display: flex;
  width: 40px;
}
</style>
