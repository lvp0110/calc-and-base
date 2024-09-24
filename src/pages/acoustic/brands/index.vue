<template>
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <List :items="selectAcousticCategories" to="/acoustic/brands" keyPath="ShortName" />
</template>

<script setup>
import MainPageLayout from '../../../components/Layouts/MainPageLayout.vue'
import List from '../../../components/List/List.vue';
import { useStore } from 'vuex';
import { computed } from 'vue'

const store = useStore()

store.dispatch('getAcousticCategories')

const selectAcousticCategories = computed(() => store.getters['selectAcousticCategories'])

const breadcrumbs = computed(() => [
    { link: '/acoustic', title: 'АКУСТИКА' }, 
    { title: 'БРЕНДЫ' }
])
</script>

<style scoped>
</style>