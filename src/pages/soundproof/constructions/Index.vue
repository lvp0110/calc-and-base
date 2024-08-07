<template>
    <MainPageLayout title="ЗВУКОИЗОЛЯЦИЯ" subtitle="МАТЕРИАЛЫ" back-link="/" />
<div class="list">
    <ul>
        <li v-for="item in selectAllIsolationConstrSound">
            <RouterLink :to="'/soundproof/constructions/' + item.Code">
                {{ item.Name }}
            </RouterLink>
        </li>
    </ul>
</div>
   
</template>

<script setup>
import MainPageLayout from '../../../components/Layouts/MainPageLayout.vue'
import { useStore } from 'vuex';
import { computed } from 'vue'

const store = useStore()

store.dispatch('getAllIsolationConstr')

const selectAllIsolationConstrSound = computed(() => store.getters['selectAllIsolationConstrSound'])
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    
}

ul li{
    font-family: 'Montserrat', sans-serif;
}
ul li a{ 
    color: rgb(58, 57, 57);
    text-decoration: none;
    border: solid 1px gray;
    border-radius: 3px;
    padding: 4px;
    display: block;
    width: 100%;
    margin-bottom: 1px;
}
ul li a:hover {
    background-color: rgb(210, 210, 210);
}
</style>