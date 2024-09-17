<template>
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <SidebarLayout :hasContent="selectElement">
        <template #sidebar>
            <List :items="selectMaterialsAc" to="/acoustic/materials" />
        </template>
        <template #content>
            <div v-if="selectElement">
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
    </SidebarLayout>
</template>

<script setup>
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import SidebarLayout from '../../../../components/Layouts/SidebarLayout.vue';
import List from '../../../../components/List/List.vue';
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

store.dispatch('getMaterialsAc')

const selectMaterialsAc = computed(() => store.getters['selectMaterialsAc'])
const selectElement = computed(() => store.getters['selectMaterialsAc'].find(({ Code }) => Code === route.params.id))

const breadcrumbs = computed(() => {
    const breadcrumbs = [
        { link: '/', title: '...' },
        { link: '/acoustic/materials', title: 'МАТЕРИАЛЫ' },
    ]

    if (route.params.id) {
        breadcrumbs.push({ title: route.params.id })
    }

    return breadcrumbs
})
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}
.title-materials {
    text-transform: uppercase;
    margin-top: 5px;
    width: 100%;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
ul li {
    
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    margin-top: 5px;
}
ul {
    margin-top: 15px;
}
.span1 {
  
  display: none;
}
img {
    width: 100%;
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