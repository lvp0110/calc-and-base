<template>
    <div class="select">
        <div class="form-select value" @click="onToggle">{{ value?.Name || placeholder }}</div>
        <ul class="dropdown" v-if="open">
            <li v-for="item in items" class="dropdown__item" @click="select(item)">
                <img class="dropdown__item__image" :src="item.Img" />
                <div>{{ item.Name }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: String,
        items: [Object],
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
            this.$props.onSelect(item)
            this.onToggle()
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
            background-color: aliceblue;
            cursor: pointer;
        }

        &__image {
            width: 100%;
            height: 100px;
            object-fit: contain;
        }
    }
}

</style>