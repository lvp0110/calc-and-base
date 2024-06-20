
<template>
  <button type="button" class="btn close-btn" @click="$emit('hide')" style="position: fixed;top: 0;right: 8px;">
    <svg height="50" width="50">
      <circle r="22" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="2" />
      <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3" />
      <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3" />
    </svg>
  </button>
  <div class="col-11 information-block composition" :style="{ top: position.y + 'px', left: position.x + 'px' }">

    <p style="margin-top:60px ; font-weight: 600;">{{ data.Name }}</p>
    <hr>
    <div class="image-descript">
      <swiper-container class="swip" slides-per-view="1" space-between="10" navigation="true" css-mode="true">
        <swiper-slide v-for="(image, index) in images" :key="index" class="slide">
          <img class="img1" :src="image.src" :alt="image.alt">
        </swiper-slide>
      </swiper-container>

      <div style="position: inherit;">
        <select class="form-select select-descript" aria-label="Default select example">
          <option selected>Размеры:</option>
          <option v-for="elem in info.Sizes" :value="`${elem.LenX},${elem.LenZ},${elem.LenY}`">
            {{ `${elem.LenX}/${elem.LenZ}/${elem.LenY} мм` }}</option>
        </select>
        <select class="form-select select-descript" aria-label="Default select example">
          <option selected>Вид панели:</option>
          <option v-for="elem in $props.info.CoverTypes" :value="elem">{{ elem }}</option>
        </select>
        <select class="form-select select-descript" aria-label="Default select example">
          <option selected>Тип перфорации:</option>
          <option v-for="elem in info.EdgesTypes" :value="elem">{{ elem }}</option>
        </select>

        <select class="form-select select-descript" aria-label="Default select example">
          <option selected>Цвет:</option>
          <option class="image-option" data-image="/Амазония Арт.А0580.jpg">Амазония Арт.А0580</option>
          <option class="image-option" data-image="/Астана Базальт Арт.А1040.jpg">Астана Базальт Арт.А1040</option>
          <option class="image-option" data-image="/Астана Базальт Арт.А1040.jpg">Астана Базальт Арт.А1040</option>
          <option class="image-option" data-image="/Астана Базальт Арт.А1040.jpg">Астана Базальт Арт.А1040</option>
          <option class="image-option" data-image="/Астана Базальт Арт.А1040.jpg">Астана Базальт Арт.А1040</option>
          <option class="image-option" data-image="/Астана Базальт Арт.А1040.jpg">Астана Базальт Арт.А1040</option>
        </select>
        <select class="form-select select-descript" aria-label="Default select example">
          <option selected>Тип кромки:</option>
          <option v-for="elem in info.EdgesTypes" :value="elem">{{ elem }}</option>
        </select>
      </div>
    </div>
    <hr>
    <span>{{ data.Description }}</span>
  </div>

</template>

<script>
// import 'swiper/swiper-bundle.css';
import { register } from 'swiper/element/bundle';
register();

export default {

  props: ['data', 'info'],
  data() {
    return {
      position: { x: 0, y: 75 },
      images: [
        { src: '/CA_NG/СА_НГ_Поинт_ДиагональD8.png', alt: 'wwwww' },
        { src: '/CA_NG/СА_НГ_ПойнтБлочнаяВертикальD8.png', alt: 'wwwww' },
        { src: '/CA_NG/СА_НГ_ПойнтБлочнаяДиагональ.png', alt: 'wwwww' },
        { src: '/CA_NG/СА_НГ_ПойнтБлочнаяD6.png', alt: 'wwwww' },
        { src: '/CA_NG/СА_НГ_ПойнтБлочнаяD8.png', alt: 'wwwww' },
        { src: '/CA_NG/СА_НГ_ПойнтZ.png', alt: 'wwwww' },
      ]

      // images: [
      //   { src: '/SL/cover_SL.jpg', alt: 'wwwww' },
      //   { src: '/SL/SL_BT.jpg.jpg', alt: 'wwwww' },
      //   { src: '/SL/SL_ChT.jpg.jpg', alt: 'wwwww' },
      //   { src: '/SL/SL_RAL.jpg.jpg', alt: 'wwwww' },
      //   { src: '//SL/SL_Solo.jpg', alt: 'wwwww' },
      //   { src: '/SL/SL_Bafl_Led.jpg', alt: 'wwwww' },
      //   { src: '/SL/SL_Bafl_Led.jpg', alt: 'wwwww' },
      // ] 

      // images: [
      //   { src: '/CA/СА-Акустика_обложка1.jpg', alt: 'wwwww' },
      //   { src: '/CA/panel/СА_ЗвездноеНебо.png', alt: 'wwwww' },
      //   { src: '/CA/блочная/СА_КвадроБлочная.png', alt: 'wwwww' },
      // ]
    }
  },

  methods: {
    setPosition(event) {
      this.position.x = event.clientX;
      this.position.y = event.clientY;
    }
  },
  created() {
    console.log('data', this.$props.data);
    console.log('info', this.$props.info);
  }
}

</script>

<style scoped>
.swip {
  width: 50%;
  margin: 0;
}

.img1 {
  width: 100%;

}

.image-descript {
  display: flex;
  margin-right: 10px;
  /* justify-content: center; */
  /* align-items: center;   */

}

.select-descript {
  margin-top: 5px;
  margin-left: 10px;
  width: 100%;
  background: rgb(232, 232, 232);
  box-shadow: 2px 3px 3px rgb(161, 160, 160);
  white-space: normal;
}

.select-descript option {
  word-wrap: break-word;
}

@media screen and (max-width: 1800px) {
  .swip {
    width: 100%;
    left: 0;
  }

  .img1 {
    width: 100%;
  }

  .image-descript {
    display: block;
    margin-right: 0px;
  }

  .select-descript {
    margin-top: 5px;
    margin-left: 0px;
    width: 100%;
  }
}
</style>
