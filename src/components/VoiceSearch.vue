<template>
  <div class="input-container">
    <button
      type="button"
      id="btn_voice"
      @click="activateVoiceSearch"
      @touchstart="activateVoiceSearch"
    >
      <figure ref="figureVoice">
        <svg height="34" width="34">
          <circle
            r="5"
            cx="17"
            cy="17"
            fill="darkgrey"
            stroke="darkgrey"
            stroke-width="1"
          />
          <circle
            r="5"
            cx="17"
            cy="12"
            fill="darkgrey"
            stroke="darkgrey"
            stroke-width="1"
          />
          <line
            x1="12"
            y1="11"
            x2="12"
            y2="18"
            stroke="darkgrey"
            stroke-width="1"
          />
          <line
            x1="22"
            y1="11"
            x2="22"
            y2="18"
            stroke="darkgrey"
            stroke-width="1"
          />
          <line
            x1="22"
            y1="30"
            x2="12"
            y2="30"
            stroke="darkgrey"
            stroke-width="2"
          />
          <line
            x1="17"
            y1="25"
            x2="17"
            y2="30"
            stroke="darkgrey"
            stroke-width="2"
          />
          <path
            d="M10 20 C 10 26, 24 25, 24 20"
            stroke="darkgrey"
            fill="transparent"
            stroke-width="2"
          />
        </svg>
      </figure>
    </button>
    <!-- :class="{ search: true, search__open: isOpen }" -->
      <input
        type="text"
        class="form-control"
        id="result_voice"
        placeholder=""
        ref="input"
        :value="voiceSearchText"
        @input="handleInput"
        @focus="handleFocus"
      />
    <button v-if="isOpen" @click="handleClear" class="close-input-btn">
      ╳
    </button>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const input = ref(null);
const figureVoice = ref(null);

const store = useStore();

const voiceSearchText = computed(() => store.state.voiceSearchText);
const isOpen = computed(() => store.state.isOpenSearch);

const activateVoiceSearch = () => {
  if (isOpen.value) {
    store.dispatch("startVoiceRecognition");
  } else {
    input.value.focus();
    store.commit("setIsOpenStore", true);
  }
};

const handleClear = () => {
  store.commit("setIsOpenStore", false);
  store.commit("updateVoiceSearchText", "");
  figureVoice.value.style.opacity = "1";
};

const handleInput = (event) => {
  store.commit("updateVoiceSearchText", event.target.value);
};

const handleFocus = () => {
  store.commit("setIsOpenStore", true);
  figureVoice.value.style.opacity = "1";
};
onMounted(() => {
  figureVoice.value.style.opacity = "1";
});

// const handleBlur = () => {
//   if (!voiceSearchText.value) {
//     store.commit('setIsOpenStore', false)
//   }
// }--close-input-btn-color
</script>

<style scoped>

.form-control {
  width: 290px;
  height: 45px;
  color: var(--search-text);
  border-color: var(--search-border-color);
}
.close-input-btn {
  border: none;
  border-radius: 50%;
  background: none;
  position: absolute;
  left: 300px;
  top: 50%;
  transform: translateY(-50%) translateX(calc(-100% - 8px));
  width: 48px;
  height: 48px;
  z-index: 2;
  color: var(--close-input-btn-color);
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: auto;
}

.search {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  transition-duration: 500ms;
  cursor: pointer;
  background-repeat: no-repeat;
  font-size: 20px;
  color: transparent;
  border: 1px solid gray;
  overflow: hidden;
  opacity: 0;
}

.search:hover {
  cursor: pointer;
  border: 1px solid rgb(10, 115, 160);
}

.search__open {
  width: 300px;
  cursor: pointer;
  color: var(--search-open-color);
  outline: none;
  border: 1px solid rgb(10, 115, 160);
  background-color: transparent;
  opacity: 1;
}

figure {
  height: 34px;
  width: 34px;
  margin: 0;
}

#btn_voice {
  position: absolute;
  z-index: 3;
  border-radius: 50%;
  border: none;
  padding: 0 2px 3px 2px;
  background: none;
  transition: all 2s;
  left: 8px;
}

#btn_voice:active {
  background: rgb(204, 203, 203);
  transition: all 0.1s;
}

#result_voice {
  padding: 0 50px;
  background-color: var(--result-voice-background-color);
  font-weight: 250;
}
@media (prefers-color-scheme: dark) {
  /* .close-input-btn {
    color: rgb(210, 205, 205);
  } */
  /* #result_voice {
    background-color: rgba(236, 231, 231, 0.26);
  } */
  /* .search__open {
    color: rgb(210, 205, 205);
  } */
}

@media screen and (max-width: 768px) {
 
  .form-control {
  width: 99%;
}
}

@media screen and (max-width: 500px) {
  .close-input-btn {
    position: absolute;
    right: 20px;
    top: 50%;
  }

}
</style>
