<template>
    <div v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" />
        <div class="title">{{ selectElement.Name }} </div>
        <hr>
        <ul>
            <li v-if="selectElement.Location">{{ locationPrefix}} {{ selectElement.Location }}</li>
            <!-- <li v-if="selectElement.Cover">{{ selectElement.Cover }}</li> -->
            <li v-if="selectElement.Contractor">{{ selectElement.Contractor }}</li>
            <li v-if="selectElement.Designer">{{ selectElement.Designer }}</li>
            <li v-if="selectElement.ProjectOwner">{{ selectElement.ProjectOwner }}</li>
            <li v-if="selectElement.TotalArea">{{ selectElement.TotalArea }} м2</li>
            <li v-if="selectElement.CompletionYear">{{ selectElement.CompletionYear }} г.</li>
            <li v-if="selectElement.PerformedWorks">{{ selectElement.PerformedWorks }}</li>
            <li v-if="selectElement.Description">{{ selectElement.Description }}</li>
        </ul>
        <span>Используемые материалы :</span>
        <ul>
            <li v-for="(material, index) in selectElement.UsedMaterials" :key="index">
                {{ material.Name }}
            </li>
        </ul>
        <ObjectsSlider :slides="selectElement.Images.map(({ File }) => filesApi.getImageFileUrl(File))" :slideComponent="ImageSlide" />

       
       
    </div>
</template>

 <!-- Code     string
 Name     string
 Location string
 Cover    string
 Contractor     string
 Designer       string
 ProjectOwner   string
 TotalArea      string
 CompletionYear int
 PerformedWorks int
 Description    int
 Images [{ File: string }] -->

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

const breadcrumbs = computed(() =>[
    { link: '/', title: "..." },
    { title: selectElement.value?.Name }
])

</script>

<style scoped>
.title {
    margin-top: 15px;
    width: 100%;
    font-weight: 400;
    text-transform: uppercase;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    padding: 5px;
    text-align: center;
}
ul li {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    background: radial-gradient(circle at left, #a8b1b88c, #d7dadf62);
    margin-top: 5px;
    padding-left: 10px;
}

@media screen and (min-width: 1280px) {


} 
</style>

