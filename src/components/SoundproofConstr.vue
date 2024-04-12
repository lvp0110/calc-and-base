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
   
      <div v-if="selectedElement" class="col-11 information-block" :style="{ top: selectedElementTop + 'px' }">
           <button type="button" class="btn close-btn" @click="hideDiv">
            <svg height="50" width="50">
                 <circle r="22" cx="50%" cy="50%" fill ="transparent" stroke="darkgrey" stroke-width="2"/>
                 <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3"/>
                 <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3"/>
              </svg>  
          </button>
          <span style="margin-top: 50px;display: block;">{{selectedElement.Description}}</span><hr>
          
          <span>{{selectedElement.Specification}}</span>
          <hr>
          <ul v-if="selectedElement">
             <li>Шифр конструкции: {{selectedElement.Code}}</li>
             <li>Толщина конструкции: {{selectedElement.Thickness}} мм</li>
             <li>Индекс звукоизоляции воздушного шума,<br> Rw ≈ {{selectedElement.SoundIndex}} дБ</li>
          </ul>
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
        hideDiv() {
          this.selectedElement = null;
        },
        setPosition(index) {
        const itemHeight = 40; // Высота одного элемента списка, измените, если она другая
        this.selectedElementTop = index * itemHeight;
        },
        addDiv(elem, index) {
          this.selectedElement = elem;
          this.setPosition(index);
        },

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
    border: solid 1px darkgray;
    border-radius: 15px;
  }
  .close-btn{
    border-radius: 50%;
    padding: 0%;
    right: 5%;
    position: absolute;
  }
</style>




  