<template>
  <tr>
    <td v-for="column in columns">
      <template v-if="column.id === 'name'">
        <div v-if="items.length === 1">
          {{ selectedItem?.[column.id] }}
          <div
            v-if="selectedItem?.comment"
            style="font-weight: 10px; color: gray; line-height: 1"
          >
            *{{ selectedItem?.comment }}
          </div>
        </div>
        <select class="test" v-else :value="selectedItem?.code" @change="change">
          <option v-for="option in items" :value="option.code">
            {{ option?.[column.id] }}
          </option>
        </select>
      </template>
      <div v-else>
        <div>{{ selectedItem?.[column.id] }}</div>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps(["items", "columns", "selectedArticuls", "onChange"]);

const { items, columns, selectedArticuls } = toRefs(props);

const selectedItem = computed(() => 
  items.value.find(({ code }) => selectedArticuls.value.includes(code))
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

.test {
  width: 100%;
}
</style>
