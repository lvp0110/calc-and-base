<template>
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <div class="content">
    <div class="list">
        <ul>
            <li v-for="item in selectAllIsolationConstrSound" :key="item.Code">
                <RouterLink :to="'/soundproof/constructions/' + item.Code">
                    {{ item.Name }}
                </RouterLink>
            </li>
        </ul>
    </div>
    <div class="collage-container">
        <div class="custom-collage">
            <img src="/Img_constr/floor/100G_K.png" alt="Photo 1" class="img1">
            <img src="/Img_constr/ceiling/ceiling_130.webp" alt="Photo 2" class="img2">
            <img src="/Img_constr/frame/frame_IIIUltra.webp" alt="Photo 3" class="img3">
            <img src="/Img_constr/frame/frame_connect_kc.webp" alt="Photo 4" class="img4">
            <img src="/Img_constr/partition/partition_50_2.webp" alt="Photo 5" class="img5">
            <img src="/Img_constr/floor/termo.png" alt="Photo 6" class="img6">
            <img src="/Img_constr/floor/acuflexLP.png" alt="Photo 7" class="img7">
        </div>
        </div>
    </div>
</template>


<script setup>
import MainPageLayout from '../../../components/Layouts/MainPageLayout.vue'
import { useStore } from 'vuex';
import { computed } from 'vue'

const store = useStore()

store.dispatch('getAllIsolationConstr')

const selectAllIsolationConstrSound = computed(() => store.getters['selectAllIsolationConstrSound'])

const breadcrumbs = computed(() => [
    { link: '/', title: 'ЗВУКОИЗОЛЯЦИЯ' },
    { title: 'КОНСТРУКЦИИ' }
])
</script>

<style scoped>
.content {
    display: flex;
    justify-content: flex-start;
}

ul {
    list-style: none;
    padding: 0;
}

ul li {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}

ul li a {
    color: rgb(58, 57, 57);
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    padding: 4px;
    display: block;
    width: 100%;
    margin-bottom: 1px;
    background: radial-gradient(circle at left, #c7ced4, #f9f9fa00);
    transition: all .5s;
}

ul li a:hover {
    background: radial-gradient(circle at left, #6c757d, #bdbfc2);
    transition: all .5s;
    color: rgb(255, 255, 255);
}

.collage-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}

.custom-collage {
    display: none;
}

@media screen and (min-width: 1024px) {
    .content {
        align-items: flex-start;
    }

    ul li a {
        width: 300px;
    }

    .custom-collage {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        grid-template-rows: repeat(4, 100px);
        gap: 20px;
        position: fixed;

    }

    .custom-collage img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        border: solid 1px lightgray;
        box-shadow: 2px 2px 5px gray;
    }

    .img1 {
        grid-area: 1 / 1 / 3 / 3;
    }

    .img2 {
        grid-area: 1 / 3 / 2 / 5;
    }

    .img3 {
        grid-area: 2 / 3 / 4 / 4;
    }

    .img4 {
        grid-area: 3 / 4 / 5 / 5;
    }

    .img5 {
        grid-area: 3 / 1 / 5 / 3;
    }
}

@media screen and (min-width: 1280px) {
    .custom-collage {
        grid-template-columns: repeat(4, 150px);
        grid-template-rows: repeat(4, 150px);
        gap: 20px;
    }
}
</style>
