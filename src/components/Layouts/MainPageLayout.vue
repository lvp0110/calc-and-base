<template>
    <!-- <section class="header"> -->
    <Fragment v-if="breadcrumbs">
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
    </Fragment>
    <Fragment v-else>
        <RouterLink v-if="backLink" :to="backLink" class="back">
            <h6>{{ title }} </h6>
        </RouterLink>
        <section class="header">
            <h6> / {{ subtitle }}</h6>
        </section>
    </Fragment>
    <VoiceSearch />

    <!-- </section> -->
    <slot />
</template>

<script setup>
import VoiceSearch from '../VoiceSearch.vue'
const { title, subtitle, backLink } = defineProps(['title', 'subtitle', 'backLink', 'breadcrumbs'])

</script>
<style scoped>
h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 250;
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
    .header {}

    .back {
        color: white;
        /* margin-top: -10px; */
        font-size: 15px;
    }
}
</style>