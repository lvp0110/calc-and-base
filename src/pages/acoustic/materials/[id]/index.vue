<template>
    <div v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" />
        <p class="title-materials">{{ selectElement.Description }}</p>
        <hr>
        <div class="image-descript">
            <div>
                <img class="img" :src="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img" alt="wwwww">

            </div>
            <ul class="ul-descript">
                <li v-if="selectElement.Length != 0">Длина: {{ selectElement.Length }} мм</li>
                <li v-if="selectElement.Width != 0"> Ширина: {{ selectElement.Width }} мм</li>
                <li v-if="selectElement.Height != 0">Толщина: {{ selectElement.Height }} мм</li>
                <li v-if="selectElement.Weight != 'неопределен'">{{ selectElement.Weight }} </li>
                <li>Аpтикул: {{ selectElement.Code }}</li>
            </ul>
        </div>
        <hr>
        <span>{{ selectElement.Specification }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';

const store = useStore()
const route = useRoute()

const id = route.params.id

const selectElement = computed(() => store.getters['selectMaterialsAc'].find(({ Code }) => Code === id))

const breadcrumbs = computed(() => [
    { link: '/', title: 'АКУСТИКА' },
    { link: '/soundproof/materials', title: 'СПИСОК МАТЕРИАЛОВ' },
    { title: id }
])
</script>

<style scoped>
.title-materials {
    margin-top: 5px;
    font-weight: 600;
    width: 80%;
}
img {
    width: 100%;
}
</style>