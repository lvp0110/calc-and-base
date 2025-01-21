
<!-- <template>
    <div>
        <ul>
            <li v-for="item in items" >
                <RouterLink :to="`${to}/${item[keyPath ?? 'Code']}`">
                    {{ item.Name }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
const { items, to, keyPath } = defineProps(['items', 'to', 'keyPath'])
</script>

<style scoped lang="scss">
ul {
    list-style: none;
    padding: 0;
    margin-right: 3px;
    li {
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;

        a {
            color: #6c757d;
            text-decoration: none;
            margin-bottom: 1px;
            border: solid 1px #6c757d;
            border-radius: 5px;
            padding: 6px;
            display: block;
            width: 100%;
            text-align: left;
            background: radial-gradient(circle at right, #c7ced4, #f9f9fa00);
            transition: all .4s;

            &:hover {
                background: radial-gradient(circle at left, #6c757d, #bdbfc2);
                transition: all .4s;
                color: aliceblue;
                border: solid 1px rgb(173, 170, 170);
            }
        }
    }
}
</style> -->

<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item[keyPath ?? 'Code']"
                :class="{ selected: selectedItem === item }"
                @click="selectItem(item)">
                <RouterLink :to="`${to}/${item[keyPath ?? 'Code']}`">
                    {{ item.Name }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const { items, to, keyPath } = defineProps(['items', 'to', 'keyPath']);
const selectedItem = ref(null);

function selectItem(item) {
    selectedItem.value = item;
}
</script>

<style scoped lang="scss">
ul {
    list-style: none;
    padding: 0;
    margin-right: 3px;
    li {
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;

        a {
            color: #6c757d;
            text-decoration: none;
            margin-bottom: 1px;
            border: solid 1px #6c757d;
            border-radius: 5px;
            padding: 6px;
            display: block;
            width: 100%;
            text-align: left;
            background: radial-gradient(circle at right, #c7ced4, #f9f9fa00);
            transition: all .4s;

            &:hover {
                background: radial-gradient(circle at left, #6c757d, #bdbfc2);
                transition: all .4s;
                color: aliceblue;
                border: solid 1px rgb(173, 170, 170);
            }
        }
    }

    .selected > a {
        background: radial-gradient(circle at left, #6c757d, #bdbfc2);
        color: aliceblue;
        border: solid 1px rgb(173, 170, 170);
    }
}
</style>
