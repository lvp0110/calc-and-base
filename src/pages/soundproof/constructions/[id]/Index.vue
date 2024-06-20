<template>
    <Dialog v-if="selectElement">
        <div style="margin-top:5px ; font-weight: 600;width: 80%;">{{ selectElement.Description }}</div>
        <hr>
        <div class="image-descript">
            <img class="img" :src="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img" alt="wwwww">
            <ul class="ul-descript">
                <li v-if="visiblRw">Индекс звукоизоляции воздушного шума, Rw = {{ selectElement.SoundIndex }} дБ. </li>
                <li v-if="visiblLnw">Индекс звукоизоляции ударного шума, Lnw = {{ selectElement.ImpactNoseIndex }} дБ.</li>
                <li>Толщина: {{ selectElement.Thickness }} мм.</li>
            </ul>
        </div>
        <RouterLink :to="`/calc/${selectElement.Code}`" class="btn btn-outline-secondary calculate">РАССЧИТАТЬ КОЛИЧЕСТВО МАТЕРИАЛОВ</RouterLink>
        <hr>
        <span>{{ selectElement.Specification }}</span>
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
         ...mapGetters(['selectAllIsolationConstrSound']),
         selectElement() {
            const id = this.$route.params.id

            return this.selectAllIsolationConstrSound.find(({ Code }) => Code === id)
         },
        visiblLnw() {
            if (this.selectElement.ImpactNoseIndex != 0)
                return true;
        },
        visiblRw() {
            if (this.selectElement.SoundIndex != 'неопределен')
                return true;
        }
    },
}
</script>