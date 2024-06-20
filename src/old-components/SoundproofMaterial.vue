<template>
  
  <div class="d-grid gap-2" >
      <button class="btn btn-outline-secondary" 
              style="margin-bottom: 1px;" 
              @click="toggleSoundInsulation">
          СПИСОК МАТЕРИАЛОВ
      </button>
  </div>

  <div class="list-group" v-show="isSoundInsulationVisible">
      <button v-for="elem in selectMaterials" :key="elem.Code" type="button" 
              class="list-group-item list-group-item-action" 
              aria-current="true" @click="addDiv(elem)">
          {{elem.Name}}
      </button> 
      <InformMaterial v-if="selectedElement" :data="selectedElement" @hide="hideDiv" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import InformMaterial from './InformMaterial.vue';

  export default {
      components: {
        InformMaterial
      },
    
      computed:{
        ...mapGetters(['selectMaterials']),
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
        addDiv(elem) {
          this.selectedElement = elem;
          
        },
        hideDiv() {
          this.selectedElement = null;
        }
      }
    }
 
</script>




