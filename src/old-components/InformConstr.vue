<template>
  <button type="button" class="btn close-btn" @click="$emit('hide')" style="position: fixed; top: 0px; right: 8px;">
    <svg height="50" width="50">
      <circle r="22" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="2" />
      <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3" />
      <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3" />
    </svg>
  </button>
  <div class="col-11 information-block" :style="{ top: position.y + 'px', left: position.x + 'px' }">

    <div style="margin-top:5px ; font-weight: 600;">{{ data.Description }}</div>
    <hr>
    <div class="image-descript">
      <img class="img" :src="'https://db.acoustic.ru:3005/api/v1/constr/' + data.Img" alt="wwwww">
      <ul class="ul-descript">
        <li v-if="visiblRw">Индекс звукоизоляции воздушного шума, Rw = {{ data.SoundIndex }} дБ. </li>
        <li v-if="visiblLnw">Индекс звукоизоляции ударного шума, Lnw = {{ data.ImpactNoseIndex }} дБ.</li>
        <li>Толщина: {{ data.Thickness }} мм.</li>
      </ul>
    </div>
    <a href="https://db.acoustic.ru/">
      <button class="btn btn-outline-secondary calculate ">РАССЧИТАТЬ КОЛИЧЕСТВО МАТЕРИАЛОВ</button>
    </a>
    <hr>
    <span>{{ data.Specification }}</span>
  </div>

</template>

<script>

export default {
  props: ['data'],
  data() {
    return {
      position: { x: 0, y: 75 },
      visible: false,
      unvisible: true,
    }
  },
  methods: {
    setPosition(event) {
      this.position.x = event.clientX;
      this.position.y = event.clientY;
    },
  },
  computed: {
    visiblLnw() {
      if (this.data.ImpactNoseIndex != 0)
        return true;
    },
    visiblRw() {
      if (this.data.SoundIndex != 'неопределен')
        return true;
    }
  }
}

</script>

<style>
.img {
  width: 100%;
}

.information-block {
  display: block;
  background-color: rgb(241, 241, 241);
  margin-left: 4%;
  padding: 10px;
  z-index: 5;
  position: fixed;
  transition: all 1s;
  border: solid 3px rgb(187, 180, 180);
  overflow: auto;
  max-height: 85%;
  filter: drop-shadow(2px 4px 6px gray);

}
.calculate{
    margin-top: 10px ;
  }

@media screen and (min-width: 1120px) {
  .information-block {
    background-color: rgb(241, 241, 241);
    padding: 10px;
    z-index: 5;
    position: fixed;
    transition: all 1s;
    border: solid 1px darkgrey;
    margin-left: 33%;
    width: 65%;
    height: 85%;
    filter: drop-shadow(2px 4px 6px gray);
  }

}

.image-descript {
  display: flex;
}

.ul-descript {
  margin-left: 5px;
}

@media screen and (max-width: 800px) {
  .image-descript {
    display: block;
  }

  .ul-descript {
    margin-top: 5px;
  }
 

}
</style>