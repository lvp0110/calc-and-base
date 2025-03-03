<template>
  <div class="theme-switcher" style="color: aliceblue;font-size: 20px;">
    <span>
        Theme
    </span> 
    <button
      ref="buttonDark"
      type="button"
      class="buttons button_dark"
      @click="toggleTheme"
    >
      <img
        :src="filesApi.getImageFileUrl(`day.svg`)"
        alt=""
        style="position: absolute; top: -4px; left: -4px; color: aliceblue"
        width="35"
        height="35"
      />
      <span style="padding: 30px;color: aliceblue;">light</span>
    </button>
    <button
      ref="buttonLight"
      type="button"
      class="buttons button_light"
      @click="toggleTheme"
    >
      <img
        :src="filesApi.getImageFileUrl(`night_white.svg`)"
        alt=""
        style="position: absolute; top: -4px; left: -4px; color: aliceblue"
        width="35"
        height="35"
      />
       <span style="padding: 30px;color: #3e4348;">dark</span>
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { filesApi } from "../config";

export default {
  setup() {

    const buttonDark = ref(null);
    const buttonLight = ref(null);

    onMounted(() => {
      const theme = localStorage.getItem("theme") ?? "light";

      if (buttonDark.value && buttonLight.value) {
        buttonDark.value.style.opacity = theme === "light" ? "1" : "0.5";
        buttonLight.value.style.opacity = theme === "light" ? "0.5" : "1";
      }
    });
    

    const toggleTheme = () => {
      const theme = localStorage.getItem("theme") ?? "light";
      const newTheme = theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("color-scheme", newTheme);
      localStorage.setItem("theme", newTheme);
      if (buttonDark.value && buttonLight.value) {
        switchButtons(buttonDark.value, buttonLight.value);
      }
    };

    const switchButtons = (button1, button2) => {
      if (button1 && button2) {
        if (button1.style.opacity === "1") {
          button1.style.opacity = "0.5";
          button2.style.opacity = "1";
        } else {
          button1.style.opacity = "1";
          button2.style.opacity = "0.5";
        }
      }
    };
    
    const moveButton = (button) => {
      if (button) {
        button.style.left = "2%";
        setTimeout(() => {
          button.style.left = "0px";
          if (buttonDark.value && buttonLight.value) {
            switchButtons(buttonDark.value, buttonLight.value);
          }
        }, 300);
      }
    };

    return {
      buttonDark,
      buttonLight,
      toggleTheme,
      filesApi,
    };
  },
};
</script>

<style scoped>
.buttons {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  position: relative;
  left: -70px;
  transition: left 0.3s;
  z-index: 1;
  opacity: .5;
}

.button_light {
  background: rgb(93, 90, 90);
  border: solid 1px rgb(187, 186, 186);
  color: #c7ced4;
}

.button_dark {
  background: rgb(244, 242, 242);
  border: solid 1px rgb(138, 136, 136);
}
</style>
