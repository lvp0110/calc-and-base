<template>
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <SidebarLayout :hasContent="selectElement">
        <template #sidebar>
            <List :items="selectMaterials" to="/vibration_isolation/materials" />
        </template>
        <template #content>
            <p class="title-materials">{{ selectElement.Description }}</p>
            <hr>
            <div class="image-descript">
                <img class="img" :src="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img" alt="wwwww">
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
            <span>{{ selectElement.Specification }}</span>
        </template>
    </SidebarLayout>
</template>

<script setup>
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import List from '../../../../components/List/List.vue';
import SidebarLayout from '../../../../components/Layouts/SidebarLayout.vue';
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

store.dispatch('getMaterialsVi')

const selectMaterials = computed(() => store.getters['selectMaterialsVi'])
const selectElement = computed(() => store.getters['selectMaterialsVi'].find(({ Code }) => Code === route.params.id))
const breadcrumbs = computed(() => {
    const breadcrumbs = [
        { link: '/', title: '...' },
        { link: '/vibration_isolation/materials', title: 'МАТЕРИАЛЫ' },
    ]

    if (route.params.id) {
        breadcrumbs.push({ title: route.params.id })
    }

    return breadcrumbs
})
</script>

<style scoped>
ul li {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    margin-top: 5px;
}
span {
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
}
</style>