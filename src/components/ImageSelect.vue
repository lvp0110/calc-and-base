<template>
    <div class="select">
        <div class="form-select value" @click="onToggle">{{ value?.Name || placeholder }}</div>
        <ul class="dropdown" v-if="open">
            <li v-for="item in items" :key="item.Code" class="dropdown__item" @click="select(item)">
                <img class="dropdown__item__image" :src="getImgSrc(item)" />
                <div>{{ item.Name }}</div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        placeholder: String,
        items: Array,
        value: Object,
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
        getImgSrc(item) {
            return `http://51.250.123.41:3005/api/v1/constr/` + item.Img;
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
.dropdown {
    position: absolute;
    max-height: 300px;
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
