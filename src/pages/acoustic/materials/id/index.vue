<template>
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <SidebarLayout :hasContent="selectElement">
        <template #sidebar>
            <List :items="selectMaterialsAc" to="/acoustic/materials" />
        </template>
        <template #content>
            <Sections :sections="sections" />
        </template>
    </SidebarLayout>
</template>

<script setup>
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import SidebarLayout from '../../../../components/Layouts/SidebarLayout.vue';
import List from '../../../../components/List/List.vue';
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { materialsApi } from '../../../../config';
import Sections from '../../../../components/Sections/index.vue'

const store = useStore()
const route = useRoute()

store.dispatch('getMaterialsAc')

const selectMaterialsAc = computed(() => store.getters['selectMaterialsAc'])
const selectElement = computed(() => store.getters['selectMaterialsAc'].find(({ Code }) => Code === route.params.id))

const sections = ref([]);

const fetchSections = async () => {
  try {
    if (!route.params.id) {
      return;
    }

    const response = await materialsApi.getSections(route.params.id);

    sections.value = response.data.data;
  } catch {}
}

onMounted(fetchSections)
watch(() => route.params.id, fetchSections);

const breadcrumbs = computed(() => {
    const breadcrumbs = [
        { link: '/acoustic', title: '⟪⟪ |' },
        { link: '/acoustic/materials', title: 'МАТЕРИАЛЫ' },
    ]

    // if (route.params.id) {
    //     breadcrumbs.push({ title: route.params.id })
    // }

    return breadcrumbs
})
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}
.title-materials {
    text-transform: uppercase;
    margin-top: 5px;
    width: 100%;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
ul li {
    
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    margin-top: 5px;
}
ul {
    margin-top: 15px;
}
.span1 {
  
  display: none;
}
img {
    width: 100%;
}
@media screen and (min-width: 768px) {
    .img {
    width: 50%;
}
}
@media screen and (min-width: 1024px) {
    .img {
        width: 40%;
    }
    ul {
        width: 40%;
    }
    .span1 {
        display: inline-flex;
        width: 50%;
        position: absolute;
        margin-left: 15px;
    }
    .span2 {
        display: none;
    }
}
</style>