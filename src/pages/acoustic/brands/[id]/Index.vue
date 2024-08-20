<template>
    <div v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" />
        <!-- <p class="title">{{ selectElement.Name }}</p> -->
        <hr>

        <div class="block-image-colors">
            <img v-if="selectedColor" :src="filesApi.getImageFileUrl(colorizedImage)" :alt="selectedColor?.Name" />
            <img v-else-if="modelImages.length === 0" :src="filesApi.getImageFileUrl(selectElement.Img)" :alt="selectedColor?.Name" />
            <ObjectsSlider v-else :slides="modelImages" :slideComponent="image_slide" />
        </div>

        <select class="form-select select-descript" :class="{ selected: selectedModelCode }" aria-label="Default select example" v-model="selectedModelCode" @change="selectModel($event)">
            <option value="null" disabled>Выбрать модель</option>
            <option v-for="model in models" :value="model.Code">{{ model.Name }}</option>
        </select>

        <div v-if="selectedModelCode" class="select">
            <div v-if="params.Sizes?.length > 0" class="select-wrapper size">
                <select class="form-select select-descript" :class="{ selected: selectedSizeCode }" v-model="selectedSizeCode" aria-label="Default select example"
                    @change="selectSize($event)">
                    <option value="null" disabled>Размеры</option>
                    <option v-for="size in params.Sizes" :value="size.Code">
                        {{ `${size.LenX}/${size.LenZ}/${size.LenY} мм` }}
                    </option>
                </select>
            </div>

            <div v-if="params.Colors?.length > 0" class="select-wrapper size">
                <ImageSelect placeholder="Цвет" :value="selectedColor?.Description" :items="params?.Colors" :onSelect="selectColor" />
            </div>

            <div class="select-container">
                <div v-if="params.Perforations?.length > 0" class="select-wrapper">
                    <ImageSelect placeholder="Тип перфорации" :value="selectedPerforation?.Description" :items="params?.Perforations"
                        :onSelect="selectPerforation" />
                    <img v-if="selectedPerforation" class="add-image" :src="filesApi.getImageFileUrl(selectedPerforation.Img)"
                        :alt="selectedPerforation?.Name" />
                    <img v-if="selectedPerforation && selectedPerforation.SectionImg" class="add-image"
                        :src="filesApi.getImageFileUrl(selectedPerforation.SectionImg)" :alt="selectedPerforation?.Name" />
                </div>
                
                <div v-if="params.EdgesTypes?.length > 0" class="select-wrapper">
                    <ImageSelect placeholder="Тип кромки" :value="selectedEdgeType?.Name" :items="params?.EdgesTypes"
                        :onSelect="selectEdgeType" />
                    <img v-if="selectedEdgeType" class="add-image" :src="filesApi.getImageFileUrl(selectedEdgeType.Img)"
                        :alt="selectedEdgeType?.Name" />
                </div>
            </div>
        </div>
        <hr>
        <template v-if="!selectedModelCode">
            <span class="span"  v-html="selectElement?.Description"></span>
        </template>
        <template v-else>
            <span v-html="selectedModelDescription"></span>
        </template>
        <button class="copy-link" @click="copyLink">копировать ссылку</button>
    </div>
</template>

<script>
import ImageSelect from '../../../../components/ImageSelect.vue';
import ObjectsSlider from '../../../../components/Slider/ObjectsSlider.vue'
import ImageSlide from '../../../../components/Slider/ImageSlide.vue'
import { filesApi, modelsApi } from '../../../../config';
import { mapGetters } from 'vuex';
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue'

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
            image_slide: ImageSlide,
            filesApi
        };
    },
    components: {
        ImageSelect,
        ObjectsSlider,
        ImageSlide,
        MainPageLayout
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
        modelImages() {
            if (this.selectedModelCode) {
                const selectedModel = this.models.find(model => model.Code === this.selectedModelCode);

                if (selectedModel) {
                    return [filesApi.getImageFileUrl(selectedModel.Img)];
                }
            }

            return [];
        },
        colorizedImage() {
            if (this.selectedColor && this.selectedColor.Img) {
                return this.selectedColor.Img;
            }
            return this.selectElement.Img;
        },
        selectedModelDescription() {
            const selectedModel = this.models.find(model => model.Code === this.selectedModelCode);
            return selectedModel ? selectedModel.Description : '';
        },
        breadcrumbs() {
            return [
                { link: '/', title: 'АКУСТИКА' }, 
                { link: '/acoustic/brands', title: 'БРЕНДЫ' },
                { title: this.selectElement.Name },
            ]
        }
    },
    methods: {
        
        async fetchData(id) {
            const response = await modelsApi.getModelsByBrand(id);
            this.models = response.data.data;

            console.log('Models data:', this.models);

            this.selectedModelCode = this.$route.query.model ?? null

            if (this.selectedModelCode) {
                this.selectModelInitial()
            }
        },
        async selectModelInitial() {
            const response = await modelsApi.getModelParams(this.selectedModelCode)

            this.params = response.data.data;

            this.selectedSizeCode = this.$route.query.size ?? null
            this.selectedColor = this.params?.Colors.find((color) => color.Name === this.$route.query.color) ?? null
            this.selectedPerforation = this.params?.Perforations.find((perforation) => perforation.Name === this.$route.query.perforation) ?? null
            this.selectedEdgeType = this.params?.EdgesTypes.find((edgeType) => edgeType.Name === this.$route.query.edgeType) ?? null

            console.log('Params data:', this.params);
        },
        async selectModel(event) {
            this.selectedModelCode = event.target.value;

            const response = await modelsApi.getModelParams(event.target.value)

            this.params = response.data.data;
            this.selectedColor = null;
            this.selectedSizeCode = null
            this.selectedPerforation = null
            this.selectedEdgeType = null

            this.replaceLocation()

            console.log('Params data:', this.params);
        },
        selectSize(event) {
            this.selectedSizeCode = event.target.value;

            this.replaceLocation()
        },
        selectColor(color) {
            this.selectedColor = color;

            this.replaceLocation()
        },
        selectPerforation(perforation) {
            this.selectedPerforation = perforation;

            this.replaceLocation()
        },
        selectEdgeType(edgeType) {
            this.selectedEdgeType = edgeType;

            this.replaceLocation()
        },
        replaceLocation() {
            let query = {}

            if (this.selectedModelCode) {
                query.model = this.selectedModelCode
            }

            if (this.selectedSizeCode) {
                query.size = this.selectedSizeCode
            }

            if (this.selectedColor) {
                query.color = this.selectedColor.Name
            }

            if (this.selectedPerforation) {
                query.perforation = this.selectedPerforation.Name
            }

            if (this.selectedEdgeType) {
                query.edgeType = this.selectedEdgeType.Name
            }

            this.$router.replace({ path: this.$router.options.history.location, query })
        },
        copyLink() {
            navigator.clipboard.writeText(window.location.href)
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
    background: radial-gradient(circle at right, #8e9092, #f9f9fa00);
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
    font-family: 'Montserrat', sans-serif;
    font-weight:300;
}
.selected {
    background: radial-gradient(circle at left, #8e9092, #f9f9fa00);
    color: aliceblue;
    font-family: 'Montserrat', sans-serif;
    font-weight:300;
}
.copy-link {
    width: 300px;
    margin-left: 15px;
    border: 1px solid gray;
    border-radius: 5px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    padding: 5px;
    background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
}
.copy-link:hover {
    background: radial-gradient(circle at left, #c7ced4, #f9f9fa00);
    border-radius: 10px;
}
.copy-link:focus {
    background: radial-gradient(circle at right, #c7ced4, #f9f9fa00);
    color: rgb(158, 161, 163);
}
.img{
       width: 100%;
    }
span {
    font-family: 'Montserrat', sans-serif;
    font-weight:300;
}
.select {
        display: block;
        margin-top: 5px;
        
    }
@media screen and (min-width: 500px) {
    .image-descript {
       width: 100%;
    }
   
}
</style>
