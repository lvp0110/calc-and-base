<template>
    <MainPageLayout :breadcrumbs="breadcrumbs" />
    <SidebarLayout :hasContent="selectElement">
        <template #sidebar>
            <List :items="selectMaterials" to="/soundproof/materials" />
        </template>
        <template #content>
            <div class="sections">
                <Section>
                    <p class="title-materials">{{ selectElement.Description }}</p>
                </Section>
                <Section>
                    <div>
                        <img class="img" :src="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img"
                            alt="wwwww">
                    </div>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <ul class="ul-descript">
                        <li v-if="selectElement.Length != 0">Длина: {{ selectElement.Length }} мм</li>
                        <li v-if="selectElement.Width != 0"> Ширина: {{ selectElement.Width }} мм</li>
                        <li v-if="selectElement.Height != 0">Толщина: {{ selectElement.Height }} мм</li>
                        <li v-if="selectElement.Weight != 'неопределен'">{{ selectElement.Weight }} </li>
                        <li>Аpтикул: {{ selectElement.Code }}</li>
                    </ul>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
                <Section title="TITLE" :image="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img">
                    <span>{{ selectElement.Specification }}</span>
                </Section>
            </div>
            <!-- <p class="title-materials">{{ selectElement.Description }}</p>
            <hr>
            <div class="image-descript">
                <div>
                    <img class="img" :src="'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img" alt="wwwww">
                </div>
                <ul class="ul-descript">
                    <li v-if="selectElement.Length != 0">Длина: {{ selectElement.Length }} мм</li>
                    <li v-if="selectElement.Width != 0"> Ширина: {{ selectElement.Width }} мм</li>
                    <li v-if="selectElement.Height != 0">Толщина: {{ selectElement.Height }} мм</li>
                    <li v-if="selectElement.Weight != 'неопределен'">{{ selectElement.Weight }} </li>
                    <li>Аpтикул: {{ selectElement.Code }}</li>
                </ul>
            </div>
            <hr>
            <span>{{ selectElement.Specification }}</span> -->
        </template>
    </SidebarLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MainPageLayout from '../../../../components/Layouts/MainPageLayout.vue';
import SidebarLayout from '../../../../components/Layouts/SidebarLayout.vue';
import List from '../../../../components/List/List.vue';
import Section from '../../../../components/Section/index.vue'

const store = useStore()
const route = useRoute()

store.dispatch('getMaterials')

const selectMaterials = computed(() => store.getters['selectMaterials'])
const selectElement = computed(() => store.getters['selectMaterials'].find(({ Code }) => Code === route.params.id))
const breadcrumbs = computed(() => {
    const breadcrumbs = [
        { link: '/soundproof', title: '...' },
        { link: '/soundproof/materials', title: 'МАТЕРИАЛЫ' }
    ]

    if (route.params.id) {
        breadcrumbs.push({ title: route.params.id })
    }

    return breadcrumbs
})
</script>

<style scoped>
.sections {
    display: grid;
    gap: 26px;
    grid-template-columns: 1fr; /* Default, one column */
}

* {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}

.title-materials {
    text-transform: uppercase;
    width: 100%;
    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}

ul li {

    background: radial-gradient(circle at center, #8992998c, #d7dadf62);
    margin-top: 5px;
    padding-left: 10px;
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

@media screen and (min-width: 1024px) {
    .sections {
        grid-template-columns: repeat(2, 1fr); /* Two columns */
    }
}

@media screen and (min-width: 1400px) {
    .sections {
        grid-template-columns: repeat(3, 1fr); /* Three columns */
    }
}
/* @media screen and (min-width: 768px) {
    .img {
        width: 50%;
    }
}

@media screen and (min-width: 1024px) {
    .img {
        width: 40%;
    }
} */
</style>