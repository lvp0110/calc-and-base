<template>
  <div class="darck-theme">
    <button
      ref="buttonDark"
      type="button"
      class="buttons button_dark"
      @click="toggleTheme"
    >
      <img
        src="http://51.250.123.41:3005/api/v1/constr/night_white.svg"
        alt=""
        style="position: absolute; top: -4px; left: -4px; color: aliceblue"
        width="35"
        height="35"
      />
    </button>
    <button
      ref="buttonLight"
      type="button"
      class="buttons button_light"
      @click="toggleTheme"
    >
      <img
        src="http://51.250.123.41:3005/api/v1/constr/day.svg"
        alt=""
        style="position: absolute; top: -4px; left: -4px; color: aliceblue"
        width="35"
        height="35"
      />
    </button>
  </div>
  <div class="main">
    <VoiceSearch />
    <div class="content">
      <RouterView />
    </div>
    <TabBar />
  </div>
</template>

<script>
import TabBar from "./components/TabBar.vue";
import VoiceSearch from "./components/VoiceSearch.vue";

export default {
  data() {
    return {
      isHiddenScrollUpButton: true,
    };
  },
  components: {
    TabBar,
    VoiceSearch,
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
  },
  mounted() {
    const buttonDark = this.$refs.buttonDark;
    const buttonLight = this.$refs.buttonLight;

    buttonDark.style.zIndex = "2";
    buttonLight.style.zIndex = "1";

    buttonDark.addEventListener("click", () => {
      this.moveButton(buttonDark);
    });

    buttonLight.addEventListener("click", () => {
      this.moveButton(buttonLight);
    });

    window.onscroll = () => {
      this.isHiddenScrollUpButton = window.scrollY < 250;
    };
  },
  methods: {
    switchButtons(button1, button2) {
      if (button1.style.zIndex === "2") {
        button1.style.zIndex = "1";
        button2.style.zIndex = "2";
      } else {
        button1.style.zIndex = "2";
        button2.style.zIndex = "1";
      }
    },
    moveButton(button) {
      button.style.left = "2%";
      setTimeout(() => {
        button.style.left = "0px";
        this.switchButtons(this.$refs.buttonDark, this.$refs.buttonLight);
      }, 300);
    },
    toggleTheme() {
      const theme = localStorage.getItem("theme") ?? "light";
      const newTheme = theme === "light" ? "dark" : "light";

      console.log("toggle theme", theme, newTheme);

      document.documentElement.setAttribute("color-scheme", newTheme);
      localStorage.setItem("theme", newTheme);
    },
    scrollTop() {
      window.scrollTo(0, 0);
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
  user-select: none;
  height: 100vh;
  overflow: hidden;
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
}

[color-scheme="dark"] {
  --primary: rgb(32, 145, 197);
  --background: url("https://db.acoustic.ru:3005/api/v1/constr/black_back_ground.png");

  --primary-text: rgb(186, 186, 186);

  --link-text: rgb(209, 206, 206);
  --link-text-hover: aliceblue;

  --list-background: radial-gradient(circle at right, black, gray);
  --list-opacity: 0.8;
  --list-color: aliceblue;
  --list-background-hover: radial-gradient(circle at right, gray, black);
  --list-color-hover: white;
  --list-background-selected: black;
  --list-color-selected: white;

  --list-materials-color: rgb(170, 176, 179);
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
}

.main {
  padding: 8px 8px 83px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  height: calc(100% - 70px);
  color: var(--primary-text);
}

.buttons {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  position: absolute;
  transition: left 0.3s;
  margin-left: 90%;
  margin-top: 18px;
  z-index: 1;
}

.button_dark {
  background: rgb(77, 73, 73);
  left: 0;
  border: solid 1px rgb(187, 186, 186);
  color: #c7ced4;
}

.button_light {
  background: rgb(229, 229, 229);
  left: 0;
  border: solid 1px rgb(138, 136, 136);
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.logo {
  opacity: 1;
  transition: all 0.7s;
}

@media screen and (min-width: 500px) {
  .main {
    padding: 8px 8px 8px 83px;
    height: 100%;
  }

  .logo {
    opacity: 0;
    transition: all 0.1s ease;
  }
}

#app {
  height: 100%;
  overflow: hidden;
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

.shown {
  display: inline;
}

.logo {
  height: 60px;
  margin-left: -14px;
  filter: drop-shadow(3px 3px 1px #96b3cd);
}
</style>
