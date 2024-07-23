<template>
    <Dialog v-if="selectElement">
        <p class="title">{{ selectElement.Name }}</p>
        <hr>

        <div class="block-image-colors">
            <img v-if="selectedColor" :src="colorizedImage" :alt="selectedColor?.Name" />
            <img v-else-if="modelImages.length === 0" :src="selectedElementImage" :alt="selectedColor?.Name" />
            <ObjectsSlider v-else :slides="modelImages" :slideComponent="image_slide" />
        </div>

        <select class="form-select select-descript" :class="{ selected: selectedModelCode }" aria-label="Default select example" @change="selectModel($event)">
            <option selected disabled>Выбрать модель</option>
            <option v-for="model in models" :value="model.Code">{{ model.Name }}</option>
        </select>

        <div v-if="selectedModelCode" class="select">
            <div v-if="params.Sizes?.length > 0" class="select-wrapper size">
                <select class="form-select select-descript" :class="{ selected: selectedSizeCode }" aria-label="Default select example"
                    @change="selectSize($event)">
                    <option selected disabled>Размеры</option>
                    <option v-for="size in params.Sizes" :value="size.Code">
                        {{ `${size.LenX}/${size.LenZ}/${size.LenY} мм` }}
                    </option>
                </select>
            </div>

            <div v-if="params.Colors?.length > 0" class="select-wrapper size">
                <ImageSelect placeholder="Цвет" :value="selectedColor?.Description" :items="params.Colors" :onSelect="selectColor" />
            </div>

            <div class="select-container">
                <div v-if="params.Perforations?.length > 0" class="select-wrapper">
                    <ImageSelect placeholder="Тип перфорации" :value="selectedPerforation?.Description" :items="params.Perforations"
                        :onSelect="selectPerforation" />
                    <img v-if="selectedPerforation" class="add-image" :src="getImgSrc(selectedPerforation.Img)"
                        :alt="selectedPerforation?.Name" />
                    <img v-if="selectedPerforation && selectedPerforation.SectionImg" class="add-image"
                        :src="getImgSrc(selectedPerforation.SectionImg)" :alt="selectedPerforation?.Name" />
                </div>
                
                <div v-if="params.EdgesTypes?.length > 0" class="select-wrapper">
                    <ImageSelect placeholder="Тип кромки" :value="selectedEdgeType?.Name" :items="params.EdgesTypes"
                        :onSelect="selectEdgeType" />
                    <img v-if="selectedEdgeType" class="add-image" :src="getImgSrc(selectedEdgeType.Img)"
                        :alt="selectedEdgeType?.Name" />
                </div>
            </div>
        </div>
        <hr>
        <template v-if="!selectedModelCode">
            <span style="color: black;" v-html="selectElement?.Description"></span>
        </template>
        <template v-else>
            <span v-html="selectedModelDescription"></span>
        </template>
    </Dialog>
</template>

<script>
import Dialog from '../../../../components/Dialog.vue';
import ImageSelect from '../../../../components/ImageSelect.vue';
import ObjectsSlider from '../../../../components/Slider/ObjectsSlider.vue'
import ImageSlide from '../../../../components/Slider/ImageSlide.vue'
import { API_SERVER, API_URL_PARAMS_BY_MODEL, API_PANELS_INFO_MODELS_BY_BRAND, API_URL_IMG } from '../../../../config';
import { mapGetters } from 'vuex';

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
            selectedEdgeType: null,
            image_slide: ImageSlide
        };
    },
    components: {
        Dialog,
        ImageSelect,
        ObjectsSlider,
        ImageSlide
    },
    computed: {
        ...mapGetters(['selectAcousticCategories']),
        selectElement() {
            const id = this.$route.params.id;
            return this.selectAcousticCategories.find(({ ShortName }) => ShortName === id) || {};
        },
        isSaveButtonVisible() {
            return this.selectedModelCode && this.selectedSizeCode && this.selectedColor && this.selectedPerforation && this.selectedEdgeType;
        },
        selectedElementImage() {
            return this.getImgSrc(this.selectElement.Img);
        },
        modelImages() {
            if (this.selectedModelCode) {
                const selectedModel = this.models.find(model => model.Code === this.selectedModelCode);

                if (selectedModel) {
                    return [this.getImgSrc(selectedModel.Img)];
                }
            }

            return [];
        },
        colorizedImage() {
            if (this.selectedColor && this.selectedColor.Img) {
                return this.getImgSrc(this.selectedColor.Img);
            }
            return this.selectedElementImage;
        },
        selectedModelDescription() {
            const selectedModel = this.models.find(model => model.Code === this.selectedModelCode);
            return selectedModel ? selectedModel.Description : '';
        }
    },
    methods: {
        async fetchData(id) {
            const modelsResponse = await fetch(`${API_SERVER}/${API_PANELS_INFO_MODELS_BY_BRAND}/${id}`);
            const modelsData = await modelsResponse.json();
            this.models = modelsData.data;

            console.log('Models data:', this.models);
        },
        async selectModel(event) {
            this.selectedModelCode = event.target.value;
            const paramsResponse = await fetch(`${API_SERVER}/${API_URL_PARAMS_BY_MODEL}/${event.target.value}`);
            const paramsData = await paramsResponse.json();
            this.params = paramsData.data;

            this.selectedColor = null; 

            console.log('Params data:', this.params);
        },
        selectSize(event) {
            this.selectedSizeCode = event.target.value;
        },
        selectColor(color) {
            this.selectedColor = color;
        },
        selectPerforation(perforation) {
            this.selectedPerforation = perforation;
        },
        selectEdgeType(edgeType) {
            this.selectedEdgeType = edgeType;
        },
        getImgSrc(Img) {
            return `${API_SERVER}/${API_URL_IMG}` + Img;
        }
    },
    created() {
        this.$watch(() => this.$route.params.id, this.fetchData, { immediate: true });
    },
};
</script>

<style scoped>
.add-image {
    margin-top: 10px;
}

.title {
    margin-top: 20px;
    font-weight: 600;
    width: 80%;
}

.block-image-colors img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

.size {
    width: 100%;
}

.select-descript {
    background: rgb(232, 232, 232);
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
}
.selected {
    background-color: rgb(173, 173, 173);
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
