<template>
    <div class="main">
      <!-- <RouterLink to="/">
          <img src="" alt="" class="logo">
      </RouterLink> -->
        <RouterView />
        <TabBar />
    </div>
    <button class="up-button" v-if="!isHiddenScrollUpButton" @click="scrollTop">
      <!-- <svg height="105" width="105" type="button">
        <circle r="40" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="3" />
        <line x1="51" y1="33" x2="51" y2="75" stroke="darkgrey" stroke-width="4" />
        <line x1="51" y1="34" x2="30" y2="50" stroke="darkgrey" stroke-width="4" />
        <line x1="51" y1="34" x2="70" y2="50" stroke="darkgrey" stroke-width="4" />
      </svg> -->
      <img src="/back_icon.svg" alt="">
    </button>
</template>

<script>
import TabBar from './components/TabBar.vue'

export default {
  data() {
    return {
      isHiddenScrollUpButton: true
    }
  },
  components: {
    TabBar
  },
  created() {
    this.$store.dispatch('getMaterials')
    this.$store.dispatch('getMaterialsAc')
    this.$store.dispatch('getMaterialsVi')
    this.$store.dispatch('getMaterialsWithCerts')
    this.$store.dispatch('getAcousticCategories') 
    this.$store.dispatch('getTechCards')
    this.$store.dispatch('getBrandsInstalSchemas')
    this.$store.dispatch('getAlbums')

    window.onscroll = () => {
      this.isHiddenScrollUpButton = window.scrollY < 250
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style>
.main {
  padding-bottom: 75px;
  margin-top: 60px;
}
.logo {
    opacity: 1;
    transition: all 0.7s;
  }
@media screen and (min-width: 500px) {
  .main {
    padding-bottom: 0;
    padding-left: 75px;
  }
  .logo {
    opacity: 0;
    transition: all 0.1s ease;
  }
}

body {
    background: url('https://db.acoustic.ru:3005/api/v1/constr/back_ground.jpg');
    background-size: 200%;
    padding: 0px 20px 0px 20px;
    margin: 0px;
    user-select: none;
    overflow-y: scroll;
}

@media screen and (min-width: 768px) {
  body {
    background-size: 200%;
  }
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #e5e9ec;
}

::-webkit-scrollbar-thumb {
  background: #939393;
  border-radius: 8px;
  border: 1px solid #d4d4d4;
}

::-webkit-scrollbar-thumb:hover {
  background: #7c7c7c;
}

.shown {
  display: inline;
}

.logo {
  height: 60px;
  margin-left: -14px;
  filter: drop-shadow(3px 3px 1px #96b3cd);
} 

.up-button img{
  position: fixed;
  bottom: 15%;
  right: 1%;
  z-index: 1000;
  background: none;
  border: none;
  width: 70px;
  rotate: 90deg;
  
}
@media screen and ( min-width: 500px) {
  .up-button img{
  position: fixed;
  bottom: 5%;
  right: 7%;
  z-index: 1000;
  background: none;
  border: none;
  width: 70px;
  rotate: 90deg;
  
}
}
</style>