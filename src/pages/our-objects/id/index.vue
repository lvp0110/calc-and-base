<template>
    <div v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" />
        <div class="title">{{ selectElement.Name }} </div>
        <hr>
        <ul>
            <li v-if="selectElement.Location">{{ selectElement.Location }}</li>
            <!-- <li v-if="selectElement.Cover">{{ selectElement.Cover }}</li> -->
            <li v-if="selectElement.Contractor">{{ selectElement.Contractor }}</li>
            <li v-if="selectElement.Designer">{{ selectElement.Designer }}</li>
            <li v-if="selectElement.ProjectOwner">{{ selectElement.ProjectOwner }}</li>
            <li v-if="selectElement.TotalArea">{{ selectElement.TotalArea }} м2</li>
            <li v-if="selectElement.CompletionYear">{{ selectElement.CompletionYear }} г.</li>
            <li v-if="selectElement.PerformedWorks">{{ selectElement.PerformedWorks }}</li>
            <li v-if="selectElement.Description">{{ selectElement.Description }}</li>
        </ul>

        <ObjectsSlider :slides="selectElement.Images.map(({ File }) => filesApi.getImageFileUrl(File))" :slideComponent="ImageSlide" />

        <span>Используемые материалы :</span>
        <!-- <ul>
            <li v-for="(material, index) in extractMaterials(selectElement.images[0].usedmaterials[0])" :key="index">
                {{ material }}
            </li>
        </ul> -->
       
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
import { ref } from 'vue';
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

const breadcrumbs = [
    { link: '/', title: "..." },
    { title: code }
]
</script>

<style scoped>
.title {
    margin-top: 15px;
    width: 80%;
    font-weight: 600;
}
</style>

