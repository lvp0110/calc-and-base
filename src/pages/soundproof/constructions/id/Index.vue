<template>
    <Fragment v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />

        <div class="title-construction">{{ selectElement.Description }}</div>

        <div class="image-descript">
            <div class="image-block">
                <img
                    class="img1"
                    :class="{ active: isActive1 }"
                    :src="filesApi.getImageFileUrl(selectElement.Img)"
                    @click="toggleActive('img1')"
                />
                <img
                    class="img2"
                    :class="{ active: isActive2 }"
                    :src="filesApi.getImageFileUrl(selectElement.CadImg)"
                    @click="toggleActive('img2')"
                />
            </div>
            <ul class="ul-descript">
                <li v-if="selectElement.SoundIndex != 'неопределен'">Индекс звукоизоляции воздушного шума, Rw = {{
                selectElement.SoundIndex }} дБ. </li>
                <li v-if="selectElement.ImpactNoseIndex != 0">Индекс звукоизоляции ударного шума, Lnw = {{
                selectElement.ImpactNoseIndex }} дБ. </li>
                <li>Толщина: {{ selectElement.Thickness }} мм.</li>
            </ul>
        </div>

        <span class="span"> {{ selectElement.Specification }}</span>
        <RouterLink :to="`/calc/${selectElement.Code}`" class="btn btn-outline-secondary calculate">РАССЧИТАТЬ
            КОЛИЧЕСТВО МАТЕРИАЛОВ</RouterLink>
    </Fragment>
</template>

<script setup>
import { ref, computed } from 'vue';
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import { filesApi } from '../../../../config';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const id = route.params.id;
store.dispatch('getAllIsolationConstr');

const selectElement = computed(() => store.getters['selectAllIsolationConstrSound'].find(({ Code }) => Code === id));

const breadcrumbs = computed(() => [
    { link: '/soundproof', title: '...' },
    { link: '/soundproof/constructions', title: 'КОНСТРУКЦИИ' },
    { title: selectElement.value?.Code }
]);

const isActive1 = ref(false);
const isActive2 = ref(false);

function toggleActive(img) {
    if (img === 'img1') {
        isActive1.value = !isActive1.value;
    } else if (img === 'img2') {
        isActive2.value = !isActive2.value;
    }
}
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}

ul li {
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    margin-top: 5px;
    padding-left: 10px;
}

.span {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}

.ul-descript {
    margin-top: 15px;
}

.title-construction {
    width: 100%;
    text-transform: uppercase;
    border-radius: 5px;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    padding: 10px;
    text-align: center;
}

.title-construction:hover {
    background: radial-gradient(circle at center, #d7dadf62, #8992998c);
}

.calculate {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    background: radial-gradient(circle at center, #d7dadf62, #8992998c);
}

.calculate:hover {
    background: radial-gradient(circle at center, #19191a62, #9fa4a88c);
}

.image-descript {
    border-top: solid 1px rgba(128, 128, 128, 0.738);
    border-bottom: solid 1px rgba(128, 128, 128, 0.738);
    margin: 15px 0px 5px 0px;
    padding: 15px 0px 0px 0px;
}

.img1, .img2 {
    width: 50%;
    border-radius: 5px;
    transition: all .3s ease;
}

.img1.active{
    transform: translateX(50%) translateY(50%) scale(2);
    border-radius: 3px;
}
 .img2.active {
    transform: translateX(-50%) translateY(50%) scale(2);
    border-radius: 3px;
}
@media screen and (min-width: 1024px) {
    .img1, .img2 {
        flex-grow: 1;
        width: 25%;
    }

    .img1.active {
        transform: translateX(50%) translateY(50%) scale(2);
    }
     .img2.active {
        transform: translateX(-50%) translateY(50%) scale(2);
    }
}
</style>
