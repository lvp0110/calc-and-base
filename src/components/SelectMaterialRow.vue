<template>
  <tr>
    <td v-for="column in columns">
      <template v-if="column.id === 'name'">
        <span v-if="items.length === 1">{{ selectedItem[column.id] }}</span>
        <select v-else :value="selectedArticul" @change="change">
          <option v-for="option in items" :value="option.code">
            {{ option[column.id] }}
          </option>
        </select>
      </template>
      <span v-else>{{ selectedItem[column.id] }}</span>
    </td>
  </tr>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps(["items", "columns", "selectedArticul", "onChange"]);

const { items, columns, selectedArticul } = toRefs(props);

const selectedItem = computed(() =>
  items.value.find(({ code }) => code === selectedArticul.value)
);

const change = (event) => {
  props.onChange(event.target.value);
};
</script>

<style scoped>
td {
  border: 1px solid;
  padding: 8px;
}
</style>
