<template>
    <Dialog>
        <nav class="navbar navbar-light bg-light">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <span class="navbar-filter">ФИЛЬТР</span>
            </div>
        </nav>
        <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
            <div class="select-descript-wrapper">
                <select class="form-select select-descript" aria-label="Default select example" @change="selectAddress($event)">
                    <option selected disabled>АДРЕС</option>
                    <option v-for="(image, index) in selectImages" :key="index" :value="image.text">
                        {{ image.text }}
                    </option>
                </select>
            </div>

            <div class="select-descript-wrapper">
                <select class="form-select select-descript" aria-label="Default select example">
                    <option selected disabled>НАЗНАЧЕНИЕ</option>
                </select>
            </div>

            <div class="select-descript-wrapper">
                <select class="form-select select-descript" aria-label="Default select example">
                    <option selected disabled>ДАТА</option>
                </select>
            </div>

            <div class="select-descript-wrapper">
                <select class="form-select select-descript" aria-label="Default select example">
                    <option selected disabled>ЗАКАЗЧИК</option>
                </select>
            </div>
        </div>

        <div class="list-group" v-show="isSoundInsulationVisible">
            <button v-for="elem in selectAcousticCategories" :key="elem.Code" type="button"
                class="list-group-item list-group-item-action" aria-current="true" @click="addDiv(elem)">
                {{ elem.Name }}
            </button>
        </div>
        <div class="gallery">
            <div v-for="(image, index) in sortedImages" :key="index" class="gallery-item">
                <div>
                    <RouterLink :to="`/our-objects/${image.id}`">
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
import Dialog from '../../components/Dialog.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            selectedAddress: null,
        };
    },
    components: {
        Dialog,
    },
    computed: {
        ...mapGetters(['selectAcousticCategories', 'selectImages']),
        sortedImages() {
            if (this.selectedAddress == null) {
                return this.selectImages;
            }
            return this.selectImages.filter((image) => image.text === this.selectedAddress);
        },
    },
    methods: {
        selectAddress(event) {
            this.selectedAddress = event.target.value;
        },
        openDialog(image) {},
        hideDiv() {
            this.selectedElement = null;
            this.isSoundInsulationVisible = false;
        },
    },
};
</script>

<style scoped>
.select-descript-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.select-descript {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.navbar {
    padding: 0;
    margin-top: 70px;
    border: solid 1px #6c757d;
    border-radius: 4px;
}

.navbar-toggler {
    border: none;
}

.navbar-filter {
    color: #6c757d;
}

.download-btn {
    margin-top: 15px;
    background-color: rgb(236, 230, 230);
    color: black;
    border: solid 1px gray;
    border-radius: 5px;
    cursor: pointer;
}

select {
    background-color: whitesmoke;
}

.image-text-object {
    position: absolute;
    bottom: 15px;
    left: 0px;
    width: 100%;
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
</style>
