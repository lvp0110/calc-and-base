<template>

  <div class="col-11 information-block composition" :style="{ top: position.y + 'px', left: position.x + 'px' }">
    <div type="button" class="btn close-btn" @click="$emit('hide')"
      style="position:absolute;top:5px;right:0;z-index: 4545;">
      <svg height="50" width="50">
        <circle r="22" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="2" />
        <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3" />
        <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3" />
      </svg>
    </div>
    <p style="margin-top:60px ; font-weight: 600;width: 80%;">{{ data.Name }}</p>
    <hr>
    <div class="image-descript">
      <!-- <swiper-container class="swip" slides-per-view="1" space-between="10" navigation="true" css-mode="true">
        <swiper-slide v-for="(image, index) in images" :key="index" class="slide">
          <img class="img1" :src="image.src" :alt="image.alt">
        </swiper-slide>
      </swiper-container> -->

      <!-- <ul>
        <li v-for="(dataItem, index) in selectedData" :key="index">
          {{ dataItem.field }}: {{ dataItem.value }}
        </li>
      </ul> -->
      <div class="one">
        <span v-if="selectedImage" style="position: relative;">Цвет: {{ selectedImage.text }}</span>

        <img :src="selectedImageIndex !== null ? images[selectedImageIndex].src : '/BA/bonacoustic_mini.jpg'" alt=""
          style="width: 100%;">

      </div>
      <!-- <select class="form-select select-descript" aria-label="Default select example"
        @change="updateSelectedData($event, 'Класс')">
        <option selected disabled>Класс пожаропастности:</option>
        <option>НГ</option>
        <option>Г1</option>
      </select> -->
      <select class="form-select select-descript" aria-label="Default select example"
        @change="updateSelectedData($event, 'Модель')">
        <option selected disabled>Модель</option>
        <!-- <option v-for="elem in $props.info.CoverTypes" :value="elem">{{ elem }}</option> -->
        <option>Reale</option>
        <option>UFR</option>
        <option>UFR NG</option>
      </select>
      <div class="two">
        <div class="form-select select-descript color" @click="toggleImages" :style="getColorStyle(selectedImageIndex)">
          Цвет
        </div>
        <div v-if="showImages">
          <button class="btn" v-for="(image, index) in images" @click="selectImage(index)" type="button">
            <div style="width: 100%;">
              <img :src="image.src" style="width: 100%;" :alt="image.alt">
              <span>{{ image.text }}</span>
            </div>
          </button>
        </div>

        <select class="form-select select-descript" aria-label="Default select example"
          @change="updateSelectedData($event, 'Размеры')">
          <option selected disabled>Размеры</option>
          <!-- <option type="button" v-for="elem in info.Sizes" :value="`${elem.LenX},${elem.LenZ},${elem.LenY}`">
            {{ `${elem.LenX}/${elem.LenZ}/${elem.LenY} мм` }}</option> -->
          <option> 2300x542x12,5 мм</option>
          <option> 1150x542x12,5 мм</option>
          <option> 600x542x12,5 мм</option>
        </select>

        <div class="select-container">
          <div class="select-wrapper">

            <select class="form-select select-descript" aria-label="Default select example"
              @change="updateSelectedData($event, 'Перфорация')" >
              <option selected disabled>Тип перфорации</option>
              <option v-for="elem in perforation" :value="elem.text">{{ elem.text }}</option>
            </select>

            <div v-if="selectedPerforation" >
              <img v-for="svgPath in selectedPerforationImages" :key="svgPath" :src="svgPath"
                alt="Selected Perforation">
            </div>
          </div>

          <div class="select-wrapper">
            <select class="form-select select-descript" aria-label="Default select example"
              @change="updateSelectedData($event, 'Кромка')">
              <option selected disabled>Тип кромки</option>
              <option v-for="elem in edge" :value="elem.svg">{{ elem.text }}</option>
            </select>
            <div v-if="selectedEdge" >
              <img :src="selectedEdgeImages.svg" alt="Selected Edge" >
            </div>
          </div>
        </div>


      </div>

    </div>
    <hr>
    <span style="color: black;">{{ data.Description }}</span>
  </div>

</template>

<script>

export default {

  props: ['data', 'info'],
  data() {
    return {
      position: { x: 0, y: 75 },
      images: [
        { src: '/BA/BA_Reale/Амазония Арт.А0580.jpg', alt: 'Амазония ', text: 'Амазония Арт.А0580' },
        { src: '/BA/BA_Reale/Астана Базальт Арт.А1040.jpg', alt: 'Астана Базальт', text: 'Астана Базальт Арт.А1040' },
        { src: '/BA/BA_Reale/Астана Роузвуд Арт.А0140.jpg', alt: 'Астана Роузвуд', text: 'Астана Роузвуд Арт.А0140' },
        { src: '/BA/BA_Reale/Бетон Бежевый Арт.А0173.jpg', alt: 'Бетон Бежевый', text: 'Бетон Бежевый Арт.А0173' },
      ],
      perforation: [
        { svg: ['/BA/BA_perf/14-2.svg', '/BA/BA_perf/14-2-1.svg'], text: 'Lineo 14/2' },
        { svg: ['/BA/BA_perf/29-3.svg', '/BA/BA_perf/29-3-1.svg'], text: 'Lineo 29/3' },
        { svg: ['/BA/BA_perf/BLOCK 4.svg'], text: 'BLOCK 4' },
        { svg: ['/BA/BA_perf/POINT MIX 6815.svg'], text: 'POINT MIX 6/8/15' },
      ],
      edge: [
        { svg: '/BA/BA_кромка/Bonacoustic-01.svg', text: 'H' },
        { svg: '/BA/BA_кромка/Bonacoustic-02.svg', text: 'H2' },
        { svg: '/BA/BA_кромка/Bonacoustic-03.svg', text: 'H3' },
      ],
      showImages: false,
      selectedImageIndex: null,
      selectedImage: null,
      selectedData: [],
      selectedEdge: null,
      selectedPerforation: null,
      modelSelected: false,
    }
  },

  methods: {
    updateSelectedData(event, field) {
      const selectedValue = event.target.value;
      const selectedText = event.target.options[event.target.selectedIndex].text;

      const currentData = { field: field, value: selectedText };

      const index = this.selectedData.findIndex(item => item.field === field);
      if (index !== -1) {
        this.selectedData.splice(index, 1, currentData);
      } else {
        this.selectedData.push(currentData);
      }

      if (field === 'Кромка') {
        this.selectedEdge = selectedValue;
        this.selectedEdgeImages = this.edge.find(item => item.svg === selectedValue);
      }

      if (field === 'Перфорация') {
        this.selectedPerforation = this.perforation.find(perf => perf.text === selectedText);
        this.selectedPerforationImages = this.selectedPerforation.svg;
      }

      if (field === 'Модель') {
        this.modelSelected = true; // Установить флаг на true
      }
      const selectElement = event.target;

      if (selectElement) {
        selectElement.style.backgroundColor = 'lightgray';
      }
      console.log(this.selectedData);
    },
    toggleImages() {
      if (this.modelSelected) {
        this.showImages = !this.showImages;
      }

    },
    selectImage(index) {
      if (this.modelSelected) {
        this.selectedImageIndex = index;
        this.selectedImage = this.images[index];
        this.showImages = false;

        console.log(index);
      }
    },
    getColorStyle(index) {
      return index !== null ? { backgroundColor: 'lightgray' } : {};
    }
  },
  created() {
    console.log('data', this.$props.data);
    console.log('info', this.$props.info);
  }
}

</script>

<style scoped>
.select-container {
  display: flex;
  justify-content: space-between;
}

.select-wrapper {
width: 49%;
}

.select-wrapper select {
  width: 100%
}

img {
  padding-top: 5px;
}

.select-descript {
  background: rgb(232, 232, 232);
  box-shadow: 2px 3px 3px rgb(161, 160, 160);
}

@media screen and (max-width: 1800px) {

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
