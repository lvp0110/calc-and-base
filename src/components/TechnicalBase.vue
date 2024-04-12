<template>
     <!-- ТЕХЛИСТ ----------------------------------------------------------->
  <div class="d-grid gap-2" >
      <button class="btn btn-outline-secondary" style="margin-bottom: 1px;" @click="toggleTechnicalSheet">ТЕХЛИСТ</button>
  </div>

  <div class="list-group" v-show="isTechnicalSheet">
   
        <button class="btn btn-secondary" style="margin-bottom: 1px; background: #6b9ccd;" @click="toggleVisibleSound">ЗВУКОИЗОЛЯЦИЯ</button>

    <div class="list-group" v-show="isVisibleSound">
      <div class="search row" >            
        <div class="col-12" >
          <input type="text" class="form-control" placeholder="поиск..." v-model="$store.state.searchText" style="margin-top:5px;">
         </div>
       </div> 
       <button v-for="elem in getItems " :key="elem.Code" type="button"  class="list-group-item     list-group-item-action" aria-current="true">
          {{elem.Code}} {{elem.Name}}
       </button>
    </div> 
    <button class="btn btn-secondary" style="margin-bottom: 2px;background: #6b9ccd;" @click="toggleVisibleAcoustic">АКУСТИКА</button>

    <div class="list-group" v-show="isVisibleAcoustic">
      <div class="search row" >            
        <div class="col-12" >
          <input type="text" class="form-control" placeholder="поиск..." v-model="$store.state.searchText" style="margin-top:5px;">
        </div>
      </div> 
      <button v-for="elem in getItems" :key="elem.Code" type="button" class="list-group-item     list-group-item-action" aria-current="true">
          {{elem.Name}}
      </button>
  </div>

  </div>
</template>

<script>
     
    import { mapGetters } from 'vuex'
    
    export default {
     
        data() {
      // Добавляем новое свойство в состояние компонента
      return {
            isTechnicalSheet: false ,
            isVisibleSound: false, // По умолчанию список видим
            isVisibleAcoustic: false, // По умолчанию список видим
            CertyficateData:{
              id:'',
              img:''
            }
          }
        },
        methods:{
      // Метод для переключения видимости
       
          toggleTechnicalSheet(){
          
           this.isTechnicalSheet = !this.isTechnicalSheet;
          },
        
          toggleVisibleSound(){
          
           this.isVisibleSound = !this.isVisibleSound;
          },
          toggleVisibleAcoustic(){
          
           this.isVisibleAcoustic = !this.isVisibleAcoustic;
          },
        },
        
        computed:{
          ...mapGetters(['getItemsM']),
          ...mapGetters(['getItems'])
        },
        

    }
  </script>