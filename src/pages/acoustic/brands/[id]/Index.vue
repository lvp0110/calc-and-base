<template>
     <Dialog v-if="selectElement">
        <p class="title">{{ selectElement.Name }}</p>
        <hr>

        <div class="block-image-colors">
            <span v-if="selectedColor" style="position: relative;">
                Цвет: {{ selectedColor?.Description }}
            </span>
            <img :src="currentImageSrc" :alt="selectedColor?.Name" />
        </div>

        <select class="form-select select-descript" aria-label="Default select example" @change="selectModel($event)">
            <option selected disabled>Выбрать модель</option>
            <option v-for="model in models" :value="model.Code">{{ model.Name }}</option>
        </select>

        <div v-if="selectedModelCode" class="select">
            <div v-if="params.Sizes?.length > 0" class="select-wrapper size">
                <select class="form-select select-descript" aria-label="Default select example" @change="selectSize($event)">
                    <option selected disabled>Размеры</option>
                    <option v-for="size in params.Sizes" :value="size.Code">
                        {{ `${size.LenX}/${size.LenZ}/${size.LenY} мм` }}
                    </option>
                </select>
            </div>
            
            <div v-if="params.Colors?.length > 0" class="select-wrapper size">
                <ImageSelect placeholder="Цвет" :value="selectedColor" :items="params.Colors" :onSelect="selectColor" />
            </div>
            
            <div class="select-container">
                <div v-if="params.Perforations?.length > 0" class="select-wrapper">
                    <ImageSelect placeholder="Тип перфорации" :value="selectedPerforation" :items="params.Perforations" :onSelect="selectPerforation" />
                    <img v-if="selectedPerforation" class="add-image" :src="getImgSrc(selectedPerforation)" :alt="selectedPerforation?.Name" />
                </div>
                <div v-if="params.EdgesTypes?.length > 0" class="select-wrapper">
                    <ImageSelect placeholder="Тип кромки" :value="selectedEdgeType" :items="params.EdgesTypes" :onSelect="selectEdgeType" />
                    <img v-if="selectedEdgeType" class="add-image" :src="getImgSrc(selectedEdgeType)" :alt="selectedEdgeType?.Name" />
                </div>
            </div>
        </div>
        <hr>
        <span style="color: black;">{{ selectElement.Description }}</span>
        <br>
        <button v-if="isSaveButtonVisible" class="btn btn-outline-secondary out-data">
            СОХРАНИТЬ ДАННЫЕ
        </button>
    </Dialog>
</template>

<script>
import Dialog from '../../../../components/Dialog.vue';
import ImageSelect from '../../../../components/ImageSelect.vue';
import { API_TESTSERVER, API_URL_PARAMS_BY_MODEL, API_PANELS_INFO_MODELS_BY_BRAND,API_URL_IMG } from '../../../../config';
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
            selectedEdgeType: null
        };
    },
    components: {
        Dialog,
        ImageSelect
    },
    computed: {
        ...mapGetters(['selectAcousticCategories']),
        selectElement() {
            const id = this.$route.params.id;
            return this.selectAcousticCategories.find(({ ShortName }) => ShortName === id);
        },
        isSaveButtonVisible() {
            return this.selectedModelCode && this.selectedSizeCode && this.selectedColor && this.selectedPerforation && this.selectedEdgeType;
        },
        currentImageSrc() {
            if (this.selectedColor) {
                return this.getImgSrc(this.selectedColor);
            } else if (this.selectedModelCode) {
                const selectedModel = this.models.find(model => model.Code === this.selectedModelCode);
                if (selectedModel) {
                    return this.getImgSrc(selectedModel);
                }
            }
            if (this.selectElement && this.selectElement.Img) {
                return this.getImgSrc(this.selectElement);
            }
            return '';
        }
    },
    methods: {
        async fetchData(id) {
            const modelsResponse = await fetch(`${API_TESTSERVER}/${API_PANELS_INFO_MODELS_BY_BRAND}/${id}`);
            const modelsData = await modelsResponse.json();
            this.models = modelsData.data;

            // Логируем модели для проверки
            console.log('Models data:', this.models);
        },
        async selectModel(event) {
            this.selectedModelCode = event.target.value;
            const paramsResponse = await fetch(`${API_TESTSERVER}/${API_URL_PARAMS_BY_MODEL}/${event.target.value}`);
            const paramsData = await paramsResponse.json();
            this.params = paramsData.data;

            this.selectedColor = null; // Для обновления изображения при выборе новой модели

            // Логируем параметры для проверки
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
        getImgSrc(item) {
            return `${API_TESTSERVER}/${API_URL_IMG}` + item.Img;
        }
    },
    created() {
        this.$watch(() => this.$route.params.id, this.fetchData, { immediate: true });
    },
}
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
