<template>
    <img class="img" :src="slide" alt="">
</template>

<script>
export default {
    props: {
        slide: String
    }
}
</script>

<style scoped>
.img {
    width: 100%;
    margin-bottom: 10px;
}
</style>
