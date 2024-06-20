<template>
  
  <div class="d-grid gap-2" >
      <button class="btn btn-outline-secondary" 
              style="margin-bottom: 1px;" 
              @click="toggleSoundInsulation">
          АКУСТИКА
      </button>
  </div>

  <div class="list-group" v-show="isSoundInsulationVisible">
      <button v-for="elem in itemsByCat(getItems)"  
              :key="elem.Code" 
              type="button" 
              class="list-group-item list-group-item-action" 
              aria-current="true" @click="addDiv(elem)">
          {{elem.Name}}
      </button>
  </div>
      <InformConstr v-if="selectedElement" :data="selectedElement" @hide="hideDiv" />
      
</template>
 
<script>
  import { mapGetters, mapActions } from 'vuex'

  import InformConstr from './InformConstr.vue';

  export default {
      components: {
        InformConstr
      },
    
      computed:{
        ...mapGetters(['getItems'])
        
      },
      data() {
        return {
          isSoundInsulationVisible: false,  
          selectedElement: null,
          selectedElementTop: 0,
        }
      },
      methods:{
        toggleSoundInsulation(){
          this.isSoundInsulationVisible = !this.isSoundInsulationVisible;
        },
        addDiv(elem) {
          if (elem.Category && elem.Category === "acoustic") {
              this.selectedElement = elem;
            } else {
              this.selectedElement = null;
            }
        },
        hideDiv() {
          this.selectedElement = null;
        },
        itemsByCat(getItems) {
          return getItems.filter(item => item.Category == "acoustic")
        }
      }
  }
 
</script>






  