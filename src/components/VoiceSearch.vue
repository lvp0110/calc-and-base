<template>
  <div>
    <div class="input-container">
      <input type="text" 
            :class="{ 'search': true, 'search__open': isOpen }" 
            id="result_voice" 
            placeholder="" 
            ref="input" 
            :value="voiceSearchText" 
            @input="handleInput"
            @focus="handleFocus" 
        />
      <button type="button" id="btn_voice" @click="activateVoiceSearch" @touchstart="activateVoiceSearch">
        <figure>
          <svg height="34" width="34">
            <circle r="5" cx="17" cy="17" fill="darkgrey" stroke="darkgrey" stroke-width="1" />
            <circle r="5" cx="17" cy="12" fill="darkgrey" stroke="darkgrey" stroke-width="1" />
            <line x1="12" y1="11" x2="12" y2="18" stroke="darkgrey" stroke-width="1" />
            <line x1="22" y1="11" x2="22" y2="18" stroke="darkgrey" stroke-width="1" />
            <line x1="22" y1="30" x2="12" y2="30" stroke="darkgrey" stroke-width="2" />
            <line x1="17" y1="25" x2="17" y2="30" stroke="darkgrey" stroke-width="2" />
            <path d="M10 20 C 10 26, 24 25, 24 20" stroke="darkgrey" fill="transparent" stroke-width="2" />
          </svg>
        </figure>
      </button>
    </div>
    <button v-if="isOpen" @click="handleClear" style="position: absolute; right: 0; top: 0;">Х</button>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const input = ref(null)

const store = useStore()

const voiceSearchText = computed(() => store.state.voiceSearchText)
const isOpen = computed(() => store.state.isOpenSearch)

const activateVoiceSearch = () => {
  if (isOpen.value) {
    store.dispatch('startVoiceRecognition')
  } else {
    input.value.focus()
    store.commit('setIsOpenStore', true)
  }
}

const handleClear = () => {
  store.commit('setIsOpenStore', false)
  store.commit('updateVoiceSearchText', '')
}

const handleInput = (event) => {
  store.commit('updateVoiceSearchText', event.target.value)
}

const handleFocus = () => {
  store.commit('setIsOpenStore', true)
}

// const handleBlur = () => {
//   if (!voiceSearchText.value) {
//     store.commit('setIsOpenStore', false)
//   }
// }
</script>

<style scoped>

.input-container {
  position: absolute;
  display: flex;
  align-items: center;
}

.search {
        top: -55px;
        left: 4px;
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50px ;
        transition-duration: 500ms;
        cursor: pointer;
        background-repeat: no-repeat;
        font-size: 20px;
        color: transparent;
        border: 1px solid gray;
        overflow: hidden;
       
    }

    .search:hover {
        cursor: pointer;
        border: 1px solid rgb(10, 115, 160);
    }

    .search__open {
        width: 330px;
        cursor: pointer;
        color: gray;
        outline: none;
        border: 1px solid rgb(10, 115, 160);
        background-color: transparent;
    }

figure {
  height: 34px;
  width: 34px;
  margin: 0;
}

#btn_voice {
  position: absolute;
  z-index: 3;
  top: -49px;
  border-radius: 50%;
  right: 2px;
  border: none;
  padding: 0 2px 3px 2px;
  background: none;
  transition: all 2s;
}

#btn_voice:active {
  background: rgb(204, 203, 203);
  transition: all 0.1s;
}

#result_voice {
  padding-left: 5px;
  background-color: rgb(248, 243, 243);
  font-weight: 250;
}
@media screen and (min-width: 500px) {
  #btn_voice {
    right: 2;
  }
}
</style>