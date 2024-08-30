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
        <div class="container">
            <div class="block block-1"> </div>
            <div class="block block-2">2</div>
            <div class="block block-3">3</div>
            <div class="block block-4">4</div>
            <div class="block block-5">5</div>
            <div class="block block-6">6</div>
            <div class="block block-7">7</div>
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

.container {
    display: none;
}

@media (max-width: 1024px) {
    .container {
        width: 90vmin;
        height: 90vmin;
    }

    .block {
        font-size: 1em;
    }
}

@media screen and (min-width: 1024px) {
    .content {
        display: flex;
    }

    .container {
        display: none;
        grid-template-areas:
            "a a b"
            "c d d"
            "e f g";
        width: 80vmin;
        height: 80vmin;
        gap: 10px;
        box-sizing: border-box;
        margin-top: 5px;
    }

    .block {
        background-color: #f0f0f0;
        border: 2px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 1.5em;
    }

    .block-1 {
        grid-area: a;

    }

    .block-2 {
        grid-area: b;
        background: url(/Img_constr/floor/sPlast.png);
    }

    .block-3 {
        grid-area: c;
    }

    .block-4 {
        grid-area: d;
    }

    .block-5 {
        grid-area: e;
    }

    .block-6 {
        grid-area: f;
    }

    .block-7 {
        grid-area: g;
    }

    ul li a {
        width: 350px;
    }

}
</style>
