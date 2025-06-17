<template>
  <div class="main" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <div class="content">
      <RouterView />
    </div>
    <transition name="fade">
      <TabBar v-if="showTabBarMobile || !isMobile" />
    </transition>
  </div>
</template>

<script>
import TabBar from "./components/TabBar.vue";

import { filesApi } from "./config";

export default {
  data() {
    return {
      isHiddenScrollUpButton: true,
      filesApi,
      showTabBarMobile: false,
      isMobile: window.innerWidth < 500,
      hideTabBarTimeout: null,
      touchStartY: 0,
      touchEndY: 0,
    };
  },
  components: {
    TabBar,
  },
  created() {
    this.$store.dispatch("getMaterials");
    this.$store.dispatch("getMaterialsAc");
    this.$store.dispatch("getMaterialsVi");
    this.$store.dispatch("getMaterialsWithCerts");
    this.$store.dispatch("getAcousticCategories");
    this.$store.dispatch("getTechCards");
    this.$store.dispatch("getBrandsInstalSchemas");
    this.$store.dispatch("getAlbums");
    this.$store.dispatch("getGeneralCategories");

    window.onscroll = () => {
      this.isHiddenScrollUpButton = window.scrollY < 250;
    };
    window.addEventListener("resize", this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkMobile);
    clearTimeout(this.hideTabBarTimeout);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 500;
      if (!this.isMobile) {
        this.showTabBarMobile = false;
      }
    },
    onTouchStart(e) {
      if (!this.isMobile) return;
      this.touchStartY = e.touches[0].clientY;
    },
    onTouchEnd(e) {
      if (!this.isMobile) return;
      this.touchEndY = e.changedTouches[0].clientY;
      // Свайп вверх: палец двигается снизу вверх
      if (this.touchStartY - this.touchEndY > 50) {
        this.showTabBar();
      }
    },
    showTabBar() {
      this.showTabBarMobile = true;
      clearTimeout(this.hideTabBarTimeout);
      this.hideTabBarTimeout = setTimeout(() => {
        this.showTabBarMobile = false;
      }, 5000);
    },
  },
};


</script>

<style>
:root,
[color-scheme="light"],
[color-scheme="dark"] {
  transition: all 0.7s ease;
}

body {
  background: var(--background);
  transition: background 1s ease;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0px;
  height: 100vh;
  overflow: hidden;
}

html, body, #app {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */

@media (min-width: 500px) {
  .show-tabbar-btn {
    display: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


[color-scheme="light"] {
  --primary: rgb(32, 145, 197);
  --background: url("https://db.acoustic.ru:3005/api/v1/constr/back_ground.jpg");

  --primary-text: black;

  --link-text: rgb(34, 33, 33);
  --link-text-hover: black;

  --list-background: radial-gradient(circle at right, #c7ced4, #f9f9fac1);
  --list-opacity: 1;
  --list-color: #6c757d;
  --list-background-hover: radial-gradient(circle at left, #6c757d, #bdbfc2);
  --list-color-hover: aliceblue;
  --list-background-selected: radial-gradient(circle at left, #6c757d, #bdbfc2);
  --list-color-selected: aliceblue;

  --list-materials-color: rgb(15, 106, 144);
  --block-description-color: rgb(45, 44, 44);

  --list-categogy-color: #6c757d;
  --list-categogy-background: radial-gradient(circle at right, #9b9fa3d2, #e2e2e9ec);
  --list-categogy-background-hover: radial-gradient(circle at left, #acb2b9, #e2e2e9ec);

  --list-swiper-color: rgb(7, 91, 128);
  --list-swiper-border: solid 2px rgb(7, 91, 128);

  --form-box-shadow: 5px 5px 2px #c7ced4;
  --form-toggle-color: black;
  --add-image-background: rgba(255, 255, 255, 0.291);
  --select-descript-color: #030303fd;

  --select-value-color: black;

  --close-input-btn-color: grey;
  --result-voice-background-color: rgba(248, 243, 243, 0.7);
  --search-open-color: gray;

  --section-text-color: rgb(83, 79, 79);
  --section-hover-background: radial-gradient(#e0e4e7, #ffffff8d);

  --button-box-shadow: 2px -3px 5px 1px rgb(139, 138, 138);

  --search-text:gray;
  --search-border-color:gray;

  --select-color:black;

}

[color-scheme="dark"] {
  --primary: rgb(32, 145, 197);
  --background: url("https://db.acoustic.ru:3005/api/v1/constr/black_back_ground.png");

  --primary-text: rgb(217 215 215);

  --link-text: rgb(209, 206, 206);
  --link-text-hover: aliceblue;

  --list-background: radial-gradient(circle at right, black, gray);
  --list-opacity: 0.8;
  --list-color: aliceblue;
  --list-background-hover: radial-gradient(circle at right, gray, black);
  --list-color-hover: white;
  --list-background-selected: black;
  --list-color-selected: white;

  --list-materials-color: #cad2d5;
  --block-description-color: rgb(25, 24, 24);

  --list-categogy-color: rgb(206, 211, 215);
  --list-categogy-background: radial-gradient(circle at center, rgba(139, 138, 138, 0.489), rgb(29, 28, 28));
  --list-categogy-background-hover: radial-gradient(circle at center, black, rgba(255, 255, 255, 0.619));

  --list-swiper-color: rgb(160, 157, 157);
  --list-swiper-border: solid 2px rgb(175, 175, 175);

  --form-box-shadow: 5px 5px 2px #535c64;
  --form-form-toggle: color: rgb(173, 170, 170);
  --add-image-background: lightgray;
  --select-descript-color: aliceblue;

  --select-value-color: aliceblue;

  --close-input-btn-color: rgb(210, 205, 205);
  --result-voice-background-color: rgba(236, 231, 231, 0.26);
  --search-open-color: rgb(210, 205, 205);

  --section-text-color: aliceblue;
  --section-hover-background: radial-gradient(#e0e4e72a, #ffffff2b);

  --button-box-shadow: 2px -3px 5px 1px rgb(209 204 204 / 50%);

  --search-text:white;
  --search-border-color:lightgray;

  --select-color:black;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  color: var(--primary-text);
}

.content {
  flex: 1 1 0%;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

@media screen and (min-width: 500px) {
  .main {
    padding: 8px 8px 8px 8px;
    height: 100vh;
    margin-left: 72px
  }
.content {
  margin-bottom: 0;
}
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #d6dce0;
  display: none;
}

::-webkit-scrollbar-track:hover {
  background: #d6dce0;
  display: block;
}

::-webkit-scrollbar-thumb {
  background: #c7ced4;
  border-radius: 8px;
  border: 1px solid #d6dce0;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(32, 145, 197);
}

</style>
