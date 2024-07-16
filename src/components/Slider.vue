<template>
    <swiper-container ref="mySwiper" :slides-per-view="1" :space-between="10" :centered-slides="true"
        :scrollbar="{ hideOnClick: true }" :breakpoints="{ 768: { slidesPerView: 1 } }" @swiperprogress="onProgress"
        @swiperslidechange="onSlideChange">

        <swiper-slide v-for="(image, index) in images" :key="index" @click="goToNextSlide">
            <img class="img" :src="image" alt="">
        </swiper-slide>

        <swiper-slide v-for="slide in pdfs" :key="slide.Code" @click="goToNextSlide">
            <div>
                <p style="position: absolute; top:6px;left: 20px; color: black ;">{{ slide.Type }}</p>
                <ul style="border: solid 2px gray;" @click.stop="downloadTextFile(slide)">
                    <li v-if="slide.Type != 0"> Тип: {{ slide.Type }} </li>
                    <li v-if="slide.Code != 0">№ {{ slide.Code }} </li>
                    <li v-if="slide.ValPeriod != 0"> Срок действия: {{ formatTime(slide.ValPeriod) }} </li>
                    <li v-if="slide.Indicators != 0"> Класс пожарной опасности: {{ slide.Indicators }} </li>
                </ul>
                <button class="btn btn-secondary" style="width: 100%;margin-top: -10px;margin-bottom: 5px;"> след. >>>
                </button>
                <div class="pdf-container">
                    <iframe class="pdf-cert" :src="`${API_SERVER}/${API_CERT}/${slide.File}`"
                        @click="goToNextSlide"></iframe>
                </div>
            </div>
        </swiper-slide>

        <swiper-slide v-for="slide in hookup" :key="slide.Code" @click="goToNextSlide">
            <p style="bottom: 20px;"> </p>
            <div>
                <button class="btn btn-secondary"
                    style="width: 100%;margin-top: -41px;margin-bottom: -45px;position: absolute; display: flex;"> 
                    след. >>>
                </button>
                <div class="hookup-container">
                    <iframe class="pdf-cert" :src="`${API_SERVER}/${API_CERT}/${slide.File}`" >
                    </iframe>
                </div>
            </div>

        </swiper-slide>

    </swiper-container>
</template>

<script>
import { API_SERVER, API_CERT } from '../config';
import { register } from 'swiper/element/bundle';
register();

export default {
    props: {
        pdfs: Array,
        images: Array,
        hookup: Array,
    },
    data() {
        return {
            API_SERVER,
            API_CERT,
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
    background-color: rgba(0, 204, 255, .7);
    height: 40px;
    top: 0;
    background: rgba(206, 204, 204, 0.3);
}

.img {
    width: 100%;
}

.pdf-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hookup-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 85px;
}

ul {
    margin-top: 50px;
}

.pdf-cert {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>