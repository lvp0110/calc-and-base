<template>
      <VoiceSearch />
  <div>
    <ul>
      <li
        v-for="item in items"
        :key="item[keyPath ?? 'Code']"
        :class="{ selected: selectedItem === item }"
        @click="selectItem(item)"
      >
        <RouterLink :to="`${to}/${item[keyPath ?? 'Code']}`">
          {{ item[namePath ?? "Name"] }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VoiceSearch from "../VoiceSearch.vue";
 
const { items, to, keyPath, namePath } = defineProps([
  "items",
  "to",
  "keyPath",
  "namePath",
]);
const selectedItem = ref(null);

function selectItem(item) {
  selectedItem.value = item;
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  margin-right: 3px;
  li {
    font-family: "Montserrat", sans-serif;
    font-weight: 300;

    a {
      text-decoration: none;
      margin-bottom: 1px;
      border: solid 1px #6c757d;
      border-radius: 5px;
      padding: 6px;
      display: block;
      width: 100%;
      text-align: left;
      transition: all 0.4s;

      background: var(--list-background);
      color: var(--list-color);
      opacity: var(--list-opacity);

      &:hover {
        background: radial-gradient(circle at left, #6c757d, #bdbfc2);
        transition: all 0.4s;
        color: aliceblue;
        border: solid 1px rgb(173, 170, 170);
      }
    }
  }

  .selected > a {
    background: var(--list-background-selected);
    color: var(--list-color-selected);
    border: solid 1px rgb(173, 170, 170);
  }
}
</style>
