<template>
    <div class="content" v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />
        <div class="title">{{ selectElement.Name }} </div>
        <hr>
        <ul> 
            <li v-if="selectElement.Location"><p >Адрес:</p> {{ selectElement.Location }}</li>
            <!-- <li v-if="selectElement.Cover">{{ selectElement.Cover }}</li> -->
            <li v-if="selectElement.Contractor"> <p >Заказчик:</p>  {{ selectElement.Contractor }}</li>
            <li v-if="selectElement.Designer"><p >Проектировщик:</p>{{ selectElement.Designer }}</li>
            <li v-if="selectElement.ProjectOwner"><p >Ген.подрядчик :</p>{{ selectElement.ProjectOwner }}</li>
            <li v-if="selectElement.TotalArea"><p >Площадь:</p>{{ selectElement.TotalArea }} м2</li>
            <li v-if="selectElement.CompletionYear"><p >Год:</p>{{ selectElement.CompletionYear }} г.</li>
            <li v-if="selectElement.PerformedWorks"><p >Выполненные работы :</p>{{ selectElement.PerformedWorks }}</li>
        </ul>
        <span>Используемые материалы :</span>
        <ul>
            <li class="list-materials" v-for="(material, index) in selectElement.UsedMaterials" :key="index">
                <RouterLink :to="`/acoustic/brands/${material.Code}`">
                    {{ material.Name }}<span class="ellipses">...</span>
                </RouterLink><span class="ellipses">...</span>
            </li>
        </ul>
        <div :class="['slider-position', { 'full-screen': fullScreen }]">
            <section @click="toggleFullScreen"><img src="/increase_white.svg" alt=""></section>
            <ObjectsSlider :slides="selectElement.Images.map(({ File }) => filesApi.getImageFileUrl(File))"
                :slideComponent="ImageSlide" />
        </div>

        <p class="block-description" v-if="selectElement.Description">{{ selectElement.Description }}</p>

    </div>
</template>

<script setup>
import MainPageLayout from '../../../components/Layouts/MainPageLayout.vue';
import ObjectsSlider from '../../../components/Slider/ObjectsSlider.vue'
import ImageSlide from '../../../components/Slider/ImageSlide.vue'
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { objectsApi } from '../../../config';
import { filesApi } from '../../../config';

const selectElement = ref(null)
const route = useRoute()

const code = route.params.id

const fetchObject = async (code) => {
    const response = await objectsApi.getObject(code)

    selectElement.value = response.data.data
}

fetchObject(code)

const breadcrumbs = computed(() => [
    { link: '/our-objects', title: "..." },
    { title: selectElement.value?.Name }
])

const fullScreen = ref(false);

const toggleFullScreen = () => {
    fullScreen.value = !fullScreen.value;
};
</script>

<style scoped>
.content {
    flex-grow: 1;
    overflow: auto;
}
* {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}

.list-materials a {
    color: rgb(12, 138, 192);

}

.block-description {
    margin-top: 15px;
}

.title {
    margin-top: 15px;
    width: 100%;
    font-weight: 400;
    text-transform: uppercase;
    background: radial-gradient(circle at center, #8992998c, #dfe1e662);
    padding: 5px;
    text-align: center;
}
p {
    background: radial-gradient(circle at left, #feffff8c, #afb6c262);;
    padding-left: 5px;
    margin: 0;
}
li {
    list-style-type: none;
    background: radial-gradient(circle at left, #a8b1b88c, #d7dadf62);
    margin-top: 10px;
    padding-left: 10px;
    margin-left: -34px;
}
.ellipses {
    padding: 0;
    display: none;
}

a:hover {
    color: rgb(34, 33, 33);
    text-decoration: none;
}

 a:hover + .ellipses {
    display: inline-block;
    text-decoration: none;
}

span {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 15px;
    padding-left: 15px;
}

section {
    display: none;
}

/* @media screen and (max-width: 500px) {
    section img {
        width: 30px;
    }

    section {
        display: block;
        position: absolute;
        color: aliceblue;
        z-index: 111;
        width: 15%;
        height: 8%;
        padding: 10px;
    }

    .slider-position {
        transition: transform 0.5s, width 0.5s, height 0.5s;
    }

    .slider-position.full-screen {
        transform: rotate(90deg);
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100vh;
        max-height: 100vw;
        transform-origin: center;
        transform: translate(-50%, -50%) rotate(90deg);
    }
} */
</style>
