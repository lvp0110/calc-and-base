<template>
    <header class="header">
        <section v-for="(breadcrumb, index) in breadcrumbs" class="section">
            <h6 v-if="breadcrumb.link">
                <RouterLink :to="breadcrumb.link" class="back">
                    {{ breadcrumb.title }}
                </RouterLink>
            </h6>
            <h6 v-else class="text">{{ breadcrumb.title }}</h6>
            <span v-if="breadcrumbs.length > index + 1" class="text">&nbsp;/</span>
        </section>
    </header>
    <VoiceSearch  />
    <slot />
</template>

<script setup>
import VoiceSearch from '../VoiceSearch.vue'
const { breadcrumbs } = defineProps(['breadcrumbs'])
</script>
<style scoped>
h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}

.header {
    display: flex;
    align-items: center;
    gap: 2px;
    justify-content: flex-start;
    background-color:  rgb(36, 140, 185);
    color: white;
    height: 42px;
    border-radius: 5px;
    margin-bottom: 60px;
    margin-top: -50px;
    padding-left: 5px;
    padding-top: 5px;
}

.section {
    display: flex;
    align-items: baseline;
}

.back {
    color: white;
    margin-top: -15px;
    font-size: 15px;
}

.text {
    font-size: 15px;
}

@media screen and (max-width: 768px) {

    .back {
        color: white;
        /* margin-top: -10px; */
        font-size: 15px;
    }
}
</style>