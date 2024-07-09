<template>

  <div class="col-12">
    <input type="text" class="form-control input" id="result_voice" placeholder="поиск..."
      v-model="$store.state.voiceSearchText">
    <button type="button" class="btn btn btn-outline-secondary" id="btn_voice" @click="activateVoiceSearch"
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
import { mapGetters, mapActions } from 'vuex'

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
    activateVoiceSearch() {
      this.startVoiceRecognition();
    }
  }
}

</script>

<style>

figure {
  height: 34px;
  width: 34px;
  margin: 0;
}

#btn_voice {
  position: relative;
  z-index: 3;
  top: -38px;
  left: 0px;
  border: none;
  padding: 0 2px 3px 2px;
}

#result_voice {
  padding-left: 40px;
  background-color: rgb(248, 243, 243);
  margin-top:5px;
}

.col-12 {
  margin-bottom: -15px;
}

@media (max-width: 500px) {
  #btn_voice {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>