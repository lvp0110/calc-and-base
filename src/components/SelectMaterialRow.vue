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
import { computed, toRefs } from "vue";

const props = defineProps(["items", "selectedArticul", "onChange"]);

const { items, selectedArticul } = toRefs(props);

const selectedItem = computed(() =>
  items.value.find(({ articul }) => articul === selectedArticul.value)
);

const change = (event) => {
  props.onChange(event.target.value);
};
</script>
