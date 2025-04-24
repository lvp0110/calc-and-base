<template>
    <MainPageLayout :breadcrumbs="breadcrumbs()" :hiddenSearch="true" />
    <Chart />
</template>

<script setup>
import MainPageLayout from "../../../../../../components/Layouts/MainPageLayout.vue";
import Chart from '../../../../../../components/Chart/index.vue'
import { useRoute } from "vue-router";

const route = useRoute()

const breadcrumbs = () => {
  return [
    { link: "/acoustic", title: "..." },
    { link: "/acoustic/brands", title: "БРЕНДЫ" },
    { link: `/acoustic/brands/${route.params.id}`, title: route.params.id },
    { title: "График" },
  ];
};
</script>