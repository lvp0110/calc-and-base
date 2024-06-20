<template>
   <button type="button" 
           class="btn close-btn" 
           @click="$emit('hide')"
           style="position: fixed;top: 0;right: 8px;">
        <svg height="50" width="50">
            <circle r="22" cx="50%" cy="50%" fill ="transparent" stroke="darkgrey" stroke-width="2"/>
            <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3"/>
            <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3"/>
        </svg>  
      </button>
  <div class="col-11 information-block" 
     :style="{ top: position.y + 'px', left: position.x + 'px' }">
    
      <p style="margin-top:5px ; font-weight: 600;">{{data.Description}}</p>
      <hr>
      <div class="image-descript">
        <img class="img" 
           :src="'https://db.acoustic.ru:3005/api/v1/constr/' + data.Img"  alt="wwwww">
        <ul class="ul-descript"> 
            <li v-if="data.Length !=0">Длина: {{ data.Length }} мм</li>
            <li v-if="data.Width !=0"> Ширина: {{ data.Width}} мм</li>
            <li v-if="data.Height !=0">Толщина: {{ data.Height}} мм</li>
            <li v-if="data.Weight !='неопределен'">{{ data.Weight}} </li>
            <li >Аpтикул: {{ data.Code }}</li>
        </ul>
      
      </div> 
      <hr>
      <span>{{data.Specification}}</span>
  </div>

</template>

<script>

export default {
 
  props: ['data'],
  data() {
    return {
      position: { x: 0, y: 75}
    }
  },
  methods: {
    setPosition(event) {
      this.position.x = event.clientX;
      this.position.y = event.clientY;
    }
  }
}

</script>
<style >
.image-descript{
    display: flex;
  }
  .ul-descript{
    margin-left: 5px;
  }
  @media screen and (max-width: 800px) {
    .image-descript{
    display: block;
    
  }
  .ul-descript{
    margin-top: 5px;
  }
  }
</style>
