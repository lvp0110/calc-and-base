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

<style>
.img {
    width: 100%;
}
</style>
