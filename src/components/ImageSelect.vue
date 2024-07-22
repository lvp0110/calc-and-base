<template>
    <div class="select">
        <div class="form-select value" :class="{ selected: value }" @click="onToggle">{{ value || placeholder }}</div>
        <ul class="dropdown" v-if="open">
            <li v-for="item in items" :key="item.Code" class="dropdown__item" @click="select(item)">
                <img class="dropdown__item__image" :src="getImgSrc(item.Img)" />
                <img v-if="item.SectionImg" class="dropdown__item__image" :src="getImgSrc(item.SectionImg)" />
                <div>{{ item.Name }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { API_SERVER } from '../config'

export default {
    props: {
        placeholder: String,
        items: Array,
        value: String,
        onSelect: Function
    },
    data() {
        return {
            open: false,
        }
    },
    methods: {
        onToggle() {
            this.open = !this.open
        },
        select(item) {
            this.onSelect(item)
            this.onToggle()
        },
        getImgSrc(Img) {
            return `${API_SERVER}/api/v1/constr/` + Img;
        }
    } 
}
</script>

<style scoped lang="scss">
.select {
    position: relative;
}
.value {
    background: rgb(232, 232, 232);
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
}
.selected {
    background-color: rgb(173, 173, 173);
}
.dropdown {
    position: absolute;
    height: 500px;
    width: 100%;
    margin: 4px;
    padding: 4px;
    background-color: white;
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
    overflow: auto;
    z-index: 999;
    list-style-type: none;

    &__item {
        padding: 4px;

        &:hover {
            background-color: rgb(213, 220, 226);
            cursor: pointer;
        }

        &__image {
            width: 100%;
            object-fit: contain;
        }
    }
}
</style>
