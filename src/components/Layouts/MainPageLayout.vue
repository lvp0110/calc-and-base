<template>
    <!-- <section class="header"> -->
        <RouterLink v-if="backLink" :to="backLink" class="back">
            <h6>{{ title }} </h6>  
        </RouterLink>
        <section class="header">
            <h6> / {{ subtitle }}</h6>
        </section>
        <VoiceSearch />
    <!-- </section> -->
    <slot />
</template>

<script setup>
import VoiceSearch from '../VoiceSearch.vue'
const { title, subtitle, backLink } =  defineProps(['title', 'subtitle', 'backLink'])

</script>
<style scoped>
    .header {
        font-family: 'Montserrat', sans-serif;
        background-color: rgb(36, 140, 185);
        color: white;
        height: 40px;
        padding-top: 12px;
        padding-left: 168px;
        border-radius: 5px;
    }
  .back {
    position: absolute;
    color: white;
    margin-top: 72px;
    margin-left: -64px;
    font-size: 20px;
  }
</style>