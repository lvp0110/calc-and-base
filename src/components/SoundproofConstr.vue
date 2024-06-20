<template>
  
  <div class="d-grid gap-2" >
      <button class="btn btn-outline-secondary" 
              style="margin-bottom: 1px;" 
              @click="toggleSoundInsulation">
          ЗВУКОИЗОЛЯЦИЯ
      </button>
  </div>
 
  <div class="list-group" v-show="isSoundInsulationVisible">
      <button v-for="(elem, index) in getItems" 
              :key="elem.Code" type="button" 
              class="list-group-item list-group-item-action" 
              aria-current="true" @click="addDiv(elem, index)">
          {{elem.Name}}
          
      </button>
      </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    
      computed:{
        ...mapGetters(['getItems']),
      },
      data() {
        return {
          isSoundInsulationVisible: false,  
          selectedElement: null,
          selectedElementTop: 0
        }
      },
      methods:{
        toggleSoundInsulation(){
          this.isSoundInsulationVisible = !this.isSoundInsulationVisible;
        },
        

      }
  }
 
</script>






  