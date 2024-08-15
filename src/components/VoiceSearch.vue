<template>
  <div class="input-container">
    <input type="text" class="search" ref="voiceInput" id="result_voice" placeholder=""
  v-model="$store.state.voiceSearchText" />
    <button type="button" id="btn_voice" @click="activateVoiceSearch"
      @touchstart="activateVoiceSearch">
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
  

</template>
<script>
import { mapGetters, mapActions} from 'vuex'

export default {

  computed: {
    ...mapGetters(['getItemsM']),

  }, 
  data() {
    
    return {
      isSoundInsulationVisible: false,  
    }
  },

  methods: {
   
    toggleSoundInsulation() {
      this.isSoundInsulationVisible = !this.isSoundInsulationVisible;
    },
    ...mapActions(['startVoiceRecognition']),
    activateVoiceSearch(event) {
      event.stopPropagation()
      this.$refs.voiceInput.focus();
      this.startVoiceRecognition();
    }
  }
}

</script>

<style>

.input-container {
  position: absolute;
  display: flex;
  align-items: center;
}
/* .input {
  flex: 1;
  border: solid 1px gray;
  border-radius: 4px;
  height: 40px;
  padding-left: 40px;
  background-color: rgb(248, 243, 243);
  margin-top: -60px;
} */
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
        /* background-size: 22px; */
        /* background-position: 45% 50%; */
    }
    .search:hover {
        cursor: pointer;
        border: 1px solid rgb(10, 115, 160);
        /* background-size: 22px; */
        /* background-position: 45% 50%; */
    }
    .search:focus {
        width: 330px;
        cursor: pointer;
        /* padding-left: 40px; */
        color: gray;
        outline: none;
        border: 1px solid rgb(10, 115, 160);
        background-color: transparent;
        /* background-size: 22px; */
        /* background-position: 10px 50px; */
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