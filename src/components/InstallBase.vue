<template>
    <!-- МОНТАЖНАЯ СХЕМА --------------------------------------------------->
    <div class="d-grid gap-2" >
        <button class="btn btn-outline-secondary" style="margin-bottom: 1px;" @click="toggleInstallDiagram">МОНТАЖНАЯ СХЕМА</button>
    </div>
    <div class="list-group" v-show="isInstallDiagram">
      <button class="btn btn-secondary" style="margin-bottom: 1px; background: #6b9ccd;" >ЗВУКОИЗОЛЯЦИЯ</button>
      <button class="btn btn-secondary" style="margin-bottom: 2px;background: #6b9ccd;" >АКУСТИКА</button>
    </div>
  </template>
  
  <script>
       
      import { mapGetters } from 'vuex'
      
      export default {
       
          data() {
        // Добавляем новое свойство в состояние компонента
        return {
              
              isInstallDiagram: false, 
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
          
            toggleInstallDiagram(){
            
             this.isInstallDiagram = !this.isInstallDiagram;
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  