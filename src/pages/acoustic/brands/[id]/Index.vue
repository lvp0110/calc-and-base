<template>
    <Dialog v-if="selectElement">
        <p style="margin-top:60px ; font-weight: 600;width: 80%;">{{ selectElement.Name }}</p>
        <hr>

        <div class="block-image-colors">
            <span v-if="selectedImage" style="position: relative;">Цвет: {{ selectedColor?.Name }}</span>
            <img :src="selectedImageIndex !== null ? params.Colors[selectedImageIndex]?.src : '/BA/bonacoustic_mini.jpg'" alt="NO IMAGE">
        </div>

        <select class="form-select select-descript" aria-label="Default select example" @change="selectModel($event)">
            <option selected disabled>Модель</option>
            <option v-for="model in models" :value="model.Code">{{ model.Name }}</option>
        </select>

        <div class="select">
            <select class="form-select select-descript" aria-label="Default select example"
                @change="selectSize($event)">
                <option selected disabled>Размеры</option>
                <option type="button" v-for="size in params.Sizes ?? []" :value="size.Code">
                    {{ `${size.LenX}/${size.LenZ}/${size.LenY} мм` }}</option>
            </select>
            <ImageSelect placeholder="Цвет" :value="selectedColor" :items="params.Colors ?? []"
                :onSelect="selectColor" />
            <div class="select-container">
                <div class="select-wrapper">
                    <ImageSelect placeholder="Тип перфорации" :value="selectedPerforation"
                        :items="params.Perforations ?? []" :onSelect="selectPerfo" />
                        <img src="" alt="">
                </div>
                <div class="select-wrapper">
                    <ImageSelect placeholder="Тип кромки " :value="selectedEdgeType" :items="params.EdgesTypes ?? []"
                        :onSelect="selectEdgeType" />
                        <img src="" alt="">
                </div>
            </div>
        </div>
        <hr>
        <span style="color: black;">{{ selectElement.Description }} </span>
        <br>
        <button class="btn btn-outline-secondary out-data">СОХРАНИТЬ ДАННЫЕ</button>
    </Dialog>
</template>

<script>
import Dialog from '../../../../components/Dialog.vue'
import ImageSelect from '../../../../components/ImageSelect.vue'
import { API_TESTSERVER, API_URL_PARAMS_BY_MODEL, API_PANELS_INFO_MODELS_BY_BRAND } from '../../../../config';
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
                   
            selectedImageIndex: null,
            selectedImage: null,
            selectedData: [],
            selectedEdge: null,

            models: [],
            params: {},

            selectedModelCode: null,
            selectedSizeCode: null,
            selectedColor: null,
            selectedPerforation: null,
            selectedEdgeType: null
        }
    },
    components: {
        Dialog,
        ImageSelect
    },
    computed: {
        ...mapGetters(['selectAcousticCategories']),
        selectElement() {
            const id = this.$route.params.id
            return this.selectAcousticCategories.find(({ ShortName }) => ShortName === id)
        }
    },
    methods: {
        async fetchData(id) {
            let modelsResponse = await fetch(`${API_TESTSERVER}/${API_PANELS_INFO_MODELS_BY_BRAND}/${id}`)
            let modelsData = await modelsResponse.json()
            this.models = modelsData.data;
        },
        async selectModel(event) {
            this.selectedModelCode = event.target.value
            const paramsResponse = await fetch(`${API_TESTSERVER}/${API_URL_PARAMS_BY_MODEL}/${event.target.value}`);
            const paramsData = await paramsResponse.json()
            this.params = paramsData.data
            console.log(this.params);
        },
        selectSize(event) {
            this.selectedSizeCode = event.target.value
        },
        selectColor(color) {
            this.selectedColor = color
            this.updateImageByColor(color)
        },
        updateImageByColor(color) {
            const colorIndex = this.params.Colors.findIndex(c => c.Code === color.Code)
            this.selectedImageIndex = colorIndex
        },
       
        selectEdgeType(edgeType) {
            this.selectedEdge = edgeType
        },
        
        selectPerfo(perforation) {
            this.selectedPerforation = perforation
        },
       
    },
    created() {
        this.$watch(
            () => this.$route.params.id,
            this.fetchData,
            { immediate: true }
        )
    },
}
</script>

<style scoped>
.block-image-colors img{
    width: 100%;
    margin-bottom: 10px;
}
.out-data {
    width: 100%;
    margin-top: 10px;
}

.select-container {
    display: flex;
    justify-content: space-between;
}

.select-wrapper {
    width: 49%;
}

.select-descript {
    background: rgb(232, 232, 232);
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
}

@media screen and (max-width: 1800px) {

    .image-descript {
        display: block;
        margin-right: 0px;
    }

    .select {
        margin-top: 10px;
    }
}
</style>