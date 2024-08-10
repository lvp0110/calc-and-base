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
    h6 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 250;
    }
    .header {
        background-color: rgb(36, 140, 185);
        color: white;
        height: 42px;
        padding-top: 12px;
        padding-left: 168px;
        border-radius: 5px;
        margin-bottom: 60px;
        margin-top: -50px;
    }
  .back {
    position: absolute;
    color: white;
    margin-top: -15px;
    margin-left: 30px;
    font-size: 20px;
  }
  @media screen and (max-width: 500px) {
    .header {
        padding-left: 168px;
    }
    .back {
    position: absolute;
    color: white;
    margin-top: -15px;
    margin-left: 33px;
    font-size: 20px;
  }
 }
</style>