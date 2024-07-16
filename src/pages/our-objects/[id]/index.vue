<template>
    <Dialog back-link="/our-objects" v-if="selectElement">

        <div class="title">{{ selectElement.images[0].name }} </div>
        <hr>
        <ul>
            <li v-if="selectElement.images[0].address">{{ selectElement.images[0].address }}</li>
            <li v-if="selectElement.images[0].objectname">{{ selectElement.images[0].objectname }}</li>
            <li v-if="selectElement.images[0].customer">{{ selectElement.images[0].customer }}</li>
            <li v-if="selectElement.images[0].designers">{{ selectElement.images[0].designers }}</li>
            <li v-if="selectElement.images[0].generalcontractor">{{ selectElement.images[0].generalcontractor }}</li>
            <li v-if="selectElement.images[0].areaobject">{{ selectElement.images[0].areaobject }}</li>
            <li v-if="selectElement.images[0].constructiontime">{{ selectElement.images[0].constructiontime }}</li>
            <li v-if="selectElement.images[0].projectdescription">{{ selectElement.images[0].projectdescription }}</li>
        </ul>
   
        <!-- <div>
            <img style="width: 100%;" :src="selectElement.src" alt="">
        </div> -->
        <Slider :images="selectElement.images[0].imagesSet[0]" />
 
        <span>Используемые материалы :</span>
        <ul>
            <li v-for="(material, index) in extractMaterials(selectElement.images[0].usedmaterials[0])" :key="index">
                {{ material }}
            </li>
        </ul>
 
    </Dialog>
</template>
<script>
import Slider from '../../../components/Slider.vue'
import Dialog from '../../../components/Dialog.vue'
import { mapGetters } from 'vuex';

export default {
    components: {
        Dialog,
        Slider
    },
    computed: {
        ...mapGetters(['selectImages']),
        selectElement() {
            const id = this.$route.params.id

            return this.selectImages.find(image => image.id === id)
        },
        objectName() {
            if (this.selectElement && this.selectElement.images && this.selectElement.images.length > 0) {
                return this.selectElement.images[0].name;
            }
            return '';
        },
    },
    methods: {
        extractMaterials(usedMaterials) {
            return Object.values(usedMaterials);
        },
    }
}
</script>

<style scoped>
.title {
    margin-top: 15px;
    width: 80%;
    font-weight: 600;
}
</style>