<template>
    <Fragment v-if="selectElement">
        <MainPageLayout :breadcrumbs="breadcrumbs" />
        
        <div class="title-construction">{{ selectElement.Description }}</div>
        <hr>
        <div class="image-descript">
            <div>
                <img class="img" :src="filesApi.getImageFileUrl(selectElement.Img)" alt="wwwww" />
            </div>
            <ul class="ul-descript">
                <li v-if="visiblRw">Индекс звукоизоляции воздушного шума, Rw = {{ selectElement.SoundIndex }} дБ. </li>
                <li v-if="visiblLnw">Индекс звукоизоляции ударного шума, Lnw = {{ selectElement.ImpactNoseIndex }} дБ.
                </li>
                <li>Толщина: {{ selectElement.Thickness }} мм.</li>
            </ul>
        </div>
        <hr>
        <span class="span">{{ selectElement.Specification }}</span>
        <RouterLink :to="`/calc/${selectElement.Code}`" class="btn btn-outline-secondary calculate">РАССЧИТАТЬ
            КОЛИЧЕСТВО МАТЕРИАЛОВ</RouterLink>
    </Fragment>
</template>

<script setup>
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue'
import { filesApi } from '../../../../config';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const store = useStore()
const route = useRoute()

const id = route.params.id

store.dispatch('getAllIsolationConstr')

const selectElement = computed(() => store.getters['selectAllIsolationConstrSound'].find(({ Code }) => Code === id))

const breadcrumbs = computed(() => [
    { link: '/', title: 'ЗВУКОИЗОЛЯЦИЯ' },
    { link: '/soundproof/constructions', title: 'КОНСТРУКЦИИ' },
    { title: selectElement.value?.Code }
])

const visiblLnw = () => {
    if (selectElement.ImpactNoseIndex != 0)
        return true;
}

const visiblRw = () => {
    if (selectElement.SoundIndex != 'неопределен')
        return true;
}
</script>

<style scoped>
.span {
    font-family: 'Montserrat', sans-serif;
    font-weight: 250;
}

.ul-descript {
    margin-top: 15px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 250;
}

.title-construction {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    width: 100%;
    text-transform: uppercase;
    border-radius: 5px;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    padding: 10px;
    text-align: center;
}
.title-construction:hover {
    background: radial-gradient(circle at center,#d7dadf62, #8992998c);
}
.calculate {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.img {
    flex-grow: 1;
    width: 50%;
    border-radius: 5px;
    transition: all .5s ease;
}
.img:hover {
    width: 100%;
}
</style>