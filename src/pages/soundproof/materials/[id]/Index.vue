<template>
    <Dialog v-if="selectElement">
        <p style="margin-top:5px ; font-weight: 600;width: 80%;">{{selectElement.Description}}</p>
        <hr>
        <div class="image-descript">
        <img class="img" 
            :src="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img"  alt="wwwww">
        <ul class="ul-descript"> 
            <li v-if="selectElement.Length !=0">Длина: {{ selectElement.Length }} мм</li>
            <li v-if="selectElement.Width !=0"> Ширина: {{ selectElement.Width}} мм</li>
            <li v-if="selectElement.Height !=0">Толщина: {{ selectElement.Height}} мм</li>
            <li v-if="selectElement.Weight !='неопределен'">{{ selectElement.Weight}} </li>
            <li >Аpтикул: {{ selectElement.Code }}</li>
        </ul>
        </div> 
        <hr>
        <span>{{selectElement.Specification}}</span>
    </Dialog>
</template>

<script>
import Dialog from '../../../../components/Dialog.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        Dialog,
    },
    computed: { 
         ...mapGetters(['selectMaterials']),
         selectElement() {
            const id = this.$route.params.id

            return this.selectMaterials.find(({ Code }) => Code === id)
         }
    },
}
</script>