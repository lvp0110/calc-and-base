<template>
    <div v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />
        <p class="title-materials">{{ selectElement.Description }}</p>
        <hr>
        <div class="image-descript">
            <div>
                <img class="img" :src="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img" alt="wwwww">
                <span class="span1">{{ selectElement.Specification }}</span>
            </div>
            <ul class="ul-descript">
                <li v-if="selectElement.Length != 0">Длина: {{ selectElement.Length }} мм</li>
                <li v-if="selectElement.Width != 0"> Ширина: {{ selectElement.Width }} мм</li>
                <li v-if="selectElement.Height != 0">Толщина: {{ selectElement.Height }} мм</li>
                <li v-if="selectElement.Weight != 'неопределен'">{{ selectElement.Weight }} </li>
                <li v-if="selectElement.Volume != 'неопределен'">{{ selectElement.Volume }} </li>

                <li>Аpтикул: {{ selectElement.Code }}</li>
            </ul>
        </div>
        <hr>
        <span class="span2">{{ selectElement.Specification }}</span>
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

store.dispatch('getMaterialsVi')

const selectElement = computed(() => store.getters['selectMaterialsVi'].find(({ Code }) => Code === id))

const breadcrumbs = computed(() => [
    { link: '/vibration_isolation', title: '...' },
    { link: '/vibration_isolation/materials', title: 'МАТЕРИАЛЫ' },
    { title: id }
])
</script>

<style scoped>
ul li {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    margin-top: 5px;
    padding-left: 10px;
}
ul {
    margin-top: 15px;
}
.span1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    display: none;
}

.span2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}
.img {
    width: 100%;
}
.title-materials {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    width: 100%;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
@media screen and (min-width: 768px) {
    .img {
    width: 50%;
}
}
@media screen and (min-width: 1024px) {
    .img {
        width: 40%;
    }
    ul {
        width: 40%;
    }
    .span1 {
        display: inline-flex;
        width: 50%;
        position: absolute;
        margin-left: 15px;
    }
    .span2 {
        display: none;
    }

}
</style>