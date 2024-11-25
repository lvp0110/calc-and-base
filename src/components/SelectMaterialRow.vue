<template>
  <tr>
    <td>
      <span v-if="items.length === 1">{{ selectedItem.name }}</span>
      <select v-else :value="selectedArticul" @change="change">
        <option v-for="option in items" :value="option.articul">
          {{ option.name }}
        </option>
      </select>
    </td>
    <td>
      {{ selectedItem.amount }}
    </td>
    <td>
      {{ selectedItem.units }}
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";

const { items, selectedArticul, onChange } = defineProps([
  "items",
  "selectedArticul",
  "onChange",
]);

const selectedItem = computed(() =>
  items.find(({ articul }) => articul === selectedArticul)
);

const change = (event) => {
  onChange(event.target.value);
};
</script>
