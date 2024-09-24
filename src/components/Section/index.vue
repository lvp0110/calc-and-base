<template>
    <section class="section">
        <div v-if="title" class="section-header">
            <img v-if="image" class="section-image" :src="image" alt="">
            <h6 class="section-title">{{ title }}</h6>
        </div>
        <div class="section-content">
            <slot />
        </div>
    </section>
</template>

<script setup>
const { title, image } = defineProps(['title', "image"])
</script>

<style>
.section {
    /* border-right: solid 2px rgb(32, 145, 197);*/
    position: relative;
}

.section::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0%;
    width: 0;
    height: 0;
    border-right: 2px solid rgb(32, 145, 197);
    transition: height 0.3s, top 0.3s, right 0.3s;
}

.section:hover::after {
    height: 100%;
    right: 0;
    top: 0;
}

.section-image {
    width: 30px;
    height: 30px;
    object-fit: contain;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    background-color: rgb(32, 145, 197);
    color: white;
}

.section-title {
    margin: 0;
    font-family: 'Montserrat', sans-serif;

}

.section-content {
    /* padding: 8px; */
}
</style>