<template>
    <swiper-container ref="mySwiper" 
                    class="slider"
                     :slides-per-view="1" 
                     :space-between="10" 
                     :centered-slides="true" 
                     :scrollbar="{ clickable: true }" 
                     :breakpoints="{ 768: { slidesPerView: 1 } }"
                      @swiperprogress="onProgress" 
                      @swiperslidechange="onSlideChange">
        <swiper-slide v-for="(slide, index) in slides" :key="index" @click="goToNextSlide">
            <component :is="slideComponent" :slide="slide" />
        </swiper-slide>
    </swiper-container>
</template>

<script>
import { register } from 'swiper/element/bundle';
register();

export default {
    props: {
        slides: Array,
        slideComponent: Object
    },
    data() {
        return {
            swiper: null,
        }
    },
    setup() {
        const onProgress = (e) => {
            const [swiper, progress] = e.detail;
            // console.log(progress)
        }

        const onSlideChange = (e) => {
            // console.log('slide changed')
        }

        return {
            onProgress,
            onSlideChange,
        };
    },
    mounted() {
        this.swiper = this.$refs.mySwiper.swiper;
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
        formatTime(value) {
            const data = new Date(value)
            return data.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
        },
    }
}
</script>

<style scoped>
swiper-container::part(scrollbar) {
    background-color: aliceblue;
    height: 7px;
    
}
</style>