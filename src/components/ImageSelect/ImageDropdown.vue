<template>
    <ul class="dropdown">
        <li v-for="item in items" :key="item.Code" class="dropdown__item" @click="select(item)">
            <img class="dropdown__item__image" :src="filesApi.getImageFileUrl(item.Img)" />
            <img v-if="item.SectionImg" class="dropdown__item__image" :src="filesApi.getImageFileUrl(item.SectionImg)" />
            <div>{{ item.Description }}</div>
        </li>
    </ul>
    <div class="backdrop" @click="onClose" />
</template>

<script setup>
import { filesApi } from '../../config'

const { items, onSelect, onClose } = defineProps(["items", "onSelect", "onClose"])

const select = (item) => {
    onSelect(item)
    onClose()
}
</script>

<style scoped lang="scss">
.backdrop {
    background-color: transparent;
    position: fixed;
    inset: 0;
    z-index: 500;
}

.dropdown {
    position: absolute;
    height: 500px;
    width: 100%;
    margin: 4px;
    padding: 4px;
    background: url('https://db.acoustic.ru:3005/api/v1/constr/back_ground.jpg');
    background-size: 400%;
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
    overflow: auto;
    z-index: 999;
    list-style-type: none;

    &__item {
        padding: 4px;

        &:hover {
            background-color: rgb(213, 220, 226);
            border: solid 1px gray;
            cursor: pointer;
        }

        &__image {
            width: 100%;
            object-fit: contain;
        }
    }
}
</style>
