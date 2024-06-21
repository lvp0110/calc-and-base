<template>
  
  <div class="d-grid gap-2" >
      <button class="btn btn-outline-secondary" 
              style="margin-bottom: 1px;" 
              @click="toggleSoundInsulation">
          ВИБРОИЗОЛЯЦИЯ
      </button>
  </div>

  <div class="list-group" v-show="isSoundInsulationVisible">
      <button v-for="elem in getItems" :key="elem.Code" type="button" 
              class="list-group-item list-group-item-action" 
              aria-current="true" @click="addDiv(elem)">
          {{elem.Name}}
      </button>
   
  <div v-if="selectedElement" class="col-11 information-block" 
           v-for="elem in getItems">
           <button type="button" class="btn close-btn" @click="hideDiv">
            <svg height="50" width="50">
                 <circle r="22" cx="50%" cy="50%" fill ="transparent" stroke="darkgrey" stroke-width="2"/>
                 <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3"/>
                 <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3"/>
              </svg>  
          </button>
          <p style="margin-top:50px ;">{{selectedElement.Code}}</p>
          <span>{{selectedElement.Specification}}</span>
      </div>
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
        addDiv(elem) {
          this.selectedElement = elem;
          
        },
        hideDiv() {
          this.selectedElement = null;
        }
      }
  }
 
</script>

<style>
  .information-block{
    background-color: rgb(241, 241, 241);
    padding: 10px;
    z-index: 5;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all 1s;
  }
  .close-btn{
    border-radius: 50%;
    padding: 0%;
    right: 5%;
    position: absolute;
  }
</style>




  