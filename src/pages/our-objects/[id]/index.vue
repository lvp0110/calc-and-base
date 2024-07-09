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

        <swiper-container ref="mySwiper" 
                        :slides-per-view="1" 
                        :space-between="spaceBetween" 
                        :centered-slides="true"
                        :scrollbar="{ hideOnClick: true }" 
                        :breakpoints="{ 768: { slidesPerView: 1 } }" 
                        @swiperprogress="onProgress"
                        @swiperslidechange="onSlideChange">
            <swiper-slide v-for="(image, index) in selectElement.images[0].imagesSet[0]"
                        :key="index"
                         @click="goToNextSlide">
                <img class="img2" :src="image" alt="">
            </swiper-slide>
        </swiper-container>
 
        <span>Используемые материалы :</span>
        <ul>
            <li v-for="(material, index) in extractMaterials(selectElement.images[0].usedmaterials[0])" :key="index">
                {{ material }}
            </li>
        </ul>

    </Dialog>
</template>
<script>

import Dialog from '../../../components/Dialog.vue'
import { mapGetters, mapActions } from 'vuex';

import { register } from 'swiper/element/bundle';
register();

export default {
    data() {
        return {
            swiper: null,
        }
    }, 
    setup() {
        const spaceBetween = 10;

        const onProgress = (e) => {
            const [swiper, progress] = e.detail;
            // console.log(progress)
        }

        const onSlideChange = (e) => {
            // console.log('slide changed')
        }

        return {
            spaceBetween,
            onProgress,
            onSlideChange,
        };
    },
    mounted() {
        this.swiper = this.$refs.mySwiper.swiper;
    },

    components: {
        Dialog
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
        goToNextSlide() {
            if (this.swiper) {
                const nextIndex = (this.swiper.realIndex + 1) % this.swiper.slides.length;
                this.swiper.slideTo(nextIndex);
            } else {
                console.error('not found');
            }
        },
        extractMaterials(usedMaterials) {
            return Object.values(usedMaterials);
        },
    }
}
</script>

<style scoped>
swiper-container::part(scrollbar) {
    background-color: rgba(0, 204, 255, .7);
    height: 7px;
}

.swip-object {
    width: 100%;

}

.img2 {
    width: 100%;

}

.title {
    margin-top: 15px;
    width: 80%;
    font-weight: 600;
}
</style>