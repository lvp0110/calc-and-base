<template>
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <div class="list">
        <ul>
            <li v-for="item in selectMaterialsAc" >
                <RouterLink :to="'/acoustic/materials/' + item.Code">
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

store.dispatch('getMaterialsAc')

const selectMaterialsAc = computed(() => store.getters['selectMaterialsAc'])

const breadcrumbs = computed(() => [
    { link: '/acoustic', title: 'АКУСТИКА' }, 
    { title: 'МАТЕРИАЛЫ' }
])
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}

ul li{
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
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
@media screen and ( min-width: 1024px) {
  ul li a {
    width: 310px;
  }
  
}
</style>