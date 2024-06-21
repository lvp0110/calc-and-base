<template>
  
  <div class="d-grid gap-2" >
      <button class="btn btn-outline-secondary" 
              style="margin-bottom: 1px;" 
              @click="toggleSoundInsulation">
          СЕРТИФИКАТЫ
      </button>
  </div>
  
  <div class="list-group" v-show="isSoundInsulationVisible">
      <button v-for="elem in selectMaterialsWithCerts" :key="elem.Code" type="button" 
              class="list-group-item list-group-item-action" 
              aria-current="true" @click="addDiv(elem)">
          {{elem.Name}}
      </button>
      <InformCert v-if="selectedElement" :data="selectedElement" @hide="hideDiv" />
  
  </div>
</template>
 
<script>
  import { mapGetters, mapActions } from 'vuex'

  import InformCert from './InformCert.vue';

  import { API_TESTSERVER, API_CERT_MATERIAL } from '../config'

  export default {
      components: {
        InformCert
      },
    
      computed:{
        ...mapGetters(['selectMaterialsWithCerts']),
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
        async addDiv(elem) {

          let res = await fetch(`${API_TESTSERVER}/${API_CERT_MATERIAL}/${elem.Code}`)
          let resData = await res.json()

          console.log(resData)

          this.selectedElement = { ...elem, slides: resData.data };
          
        },
        hideDiv() {
          this.selectedElement = null;
        }
      }
    }
 
</script>




