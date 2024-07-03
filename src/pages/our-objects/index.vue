<template>
    <Dialog>

        <div class="gallery">
            <div v-for="(image, index) in selectImages" :key="index" class="gallery-item">
                <div>
                    <RouterLink :to="`/our-objects/${index}`">
                        <img :src="image.src" alt="" @click="openDialog(image)" role="button" />
                    </RouterLink>
                </div>
                <div class="image-text-object">
                    {{ image.text }}
                </div>
            </div>
        </div>

    </Dialog>
</template>
<script>

import { RouterLink } from 'vue-router';
import Dialog from '../../components/Dialog.vue'
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {
        Dialog
    },
    computed: {
        ...mapGetters(['selectAcousticCategories','selectImages']),
    },
    methods: {
        openDialog(image) {
            
        }
    }
  
}
</script>

<style scoped>
.download-btn {
    margin-top: 15px;
    background-color: rgb(236, 230, 230);
    color: black;
    border: solid 1px gray;
    /* padding: 10px 20px; */
    border-radius: 5px;
    cursor: pointer;
}

select {
    background-color: whitesmoke;
}

.image-text-object {

    position: absolute;
    bottom: 15px;
    left: 20px;
    filter: drop-shadow(2px 1px 3px rgb(255, 254, 254));
    background: rgba(255, 253, 253, 0.5);
    color: black;
    padding: 3px 10px 3px 10px;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.gallery-item {
    position: relative;
    margin-top: 30px;
}

.gallery-item img {
    max-width: 100%;
}

@media screen and (min-width: 1024px) {
    .gallery-item {
        width: calc((100% - 30px) / 2);
    }
}

.image-container {
    position: relative;
    display: inline-block;
}

.image-text {
    position: absolute;
    top: 2%;
    left: 2%;
    padding: 10px;
    color: antiquewhite;
}

.swip-object {
    width: 100%;
}

.img2 {
    width: 100%;
    opacity: 0.9;
}

.image-object {
    display: flex;
    margin-right: 10px;
}

.select-object {
    margin-top: 5px;
    margin-left: 10px;
    width: 100%;
    background: rgb(232, 232, 232);
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
    white-space: normal;
}

.select-object option {
    word-wrap: break-word;
}
</style>