<template>
  
  <div class="d-grid gap-2" >
      <button class="btn btn-outline-secondary" 
              style="margin-bottom: 1px;" 
              @click="toggleSoundInsulation">
          АКУСТИКА ПО БРЕНДАМ
      </button>
  </div>
 
  <div class="list-group" v-show="isSoundInsulationVisible">
      <button v-for="elem in selectAcousticCategories" :key="elem.Code" type="button" 
              class="list-group-item list-group-item-action" 
              aria-current="true" @click="addDiv(elem)">
          {{elem.Name}}
      </button>
      <!-- <InformComposition v-if="selectedElement" :data="selectedElement" :info="infoData" @hide="hideDiv" />  -->
      <InformComp v-if="selectedElement" :data="selectedElement" :info="infoData" @hide="hideDiv" /> 
  </div> 
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  
  import InformComp from './InformComp.vue';

  import {API_PANELS_INFO_BY_BRAND, API_TESTSERVER} from '../config'

  export default {
      components: {
        // InformComposition,
        InformComp
      },
    
      computed:{
        ...mapGetters(['selectAcousticCategories']),
      },
      data() {
        return {
          isSoundInsulationVisible: false,  
          selectedElement: null,
          selectedElementTop: 0,
          infoData:null,
        }
      },
      methods:{
        toggleSoundInsulation(){
          this.isSoundInsulationVisible = !this.isSoundInsulationVisible;
        },
        async addDiv(elem) {

           let res = await fetch(`${API_TESTSERVER}/${API_PANELS_INFO_BY_BRAND}/${elem.Name}`)
           let resData = await res.json()

            console.log(resData)
             this.infoData = resData.data
            // this.selectedElement = { ...elem, slides: resData.data };

            this.selectedElement = elem;

          },
        // addDiv(elem) {
        
          
        // },
        hideDiv() {
          this.selectedElement = null;
        }
      }
    }
 
</script>



