<template>
    <MainPageLayout title="ЗВУКОИЗОЛЯЦИЯ" subtitle="КОНСТРУКЦИИ" back-link="/" />
<div class="list">
    <ul>
        <li v-for="item in selectAllIsolationConstrSound" >
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
    font-weight: 250;
}
ul li a{ 
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
@media screen and ( min-width: 768px) {
  ul li a {
    width: 310px;
  }
  
}
</style>