<template>
  <div class="theme-switcher">
    <!-- Кнопка для темы light -->
    <transition name="fade">
      <button
        v-if="theme === 'light'"
        type="button"
        class="theme-button button_dark"
        @click="toggleTheme"
      >
        <img
          :src="filesApi.getImageFileUrl('day.svg')"
          alt="Темная тема"
          width="40"
          height="40"
        />
      </button>
    </transition>

    <!-- Кнопка для темы dark -->
    <transition name="fade">
      <button
        v-if="theme === 'dark'"
        type="button"
        class="theme-button button_light"
        @click="toggleTheme"
      >
        <img
          :src="filesApi.getImageFileUrl('night_white.svg')"
          alt="Светлая тема"
          width="40"
          height="40"
        />
      </button>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { filesApi } from "../config";

export default {
  setup() {
    // Инициализируем тему из localStorage, по умолчанию "light"
    const theme = ref(localStorage.getItem("theme") || "light");
    
    onMounted(() => {
      document.documentElement.setAttribute("color-scheme", theme.value);
    });

    const toggleTheme = () => {
      // Переключение темы
      theme.value = theme.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme.value);
      document.documentElement.setAttribute("color-scheme", theme.value);
    };

    return {
      theme,
      toggleTheme,
      filesApi,
    };
  },
};
</script>

<style scoped>
/* Контейнер фиксированного размера, в котором кнопки располагаются абсолютно */
.theme-switcher {
  position: relative;
  width: 45px;
  height: 45px;
}

/* Кнопки с абсолютным позиционированием, чтобы они всегда занимали одни и те же координаты */
.theme-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* Значения стилей для каждой темы */
.button_light {
  background: rgb(93, 90, 90);
  border: 1px solid rgb(187, 186, 186);
  color: #c7ced4;
}

.button_dark {
  background: rgb(244, 242, 242);
  border: 1px solid rgb(138, 136, 136);
}

/* Анимация плавного появления/исчезновения кнопок */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


<!-- <template>
  <div class="theme-switcher" style="color: aliceblue;font-size: 30px;">

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
        width ="40"
        height="40"
      />
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
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  position: relative;
  left: -45px;
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
</style> -->
