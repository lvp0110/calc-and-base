<template>
  <div class="multiselect-container">
    <label class="item" v-for="item in items">
      <div
        class="square"
        :style="`background-color: ${item.color}`"
      />
      <input
        type="checkbox"
        :name="item.name"
        :checked="selectedItems.includes(item.name)"
        @change="handleChange"
      />
      <span>{{ item.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const { items, selectedItems, onChange } = defineProps([
  "items",
  "selectedItems",
  "onChange",
]);

const handleChange = (event) => {
  onChange(event.target.name, event.target.checked);
};
</script>

<style scoped>
.multiselect-container {
  overflow: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.square {
  min-width: 20px;
  height: 20px;
}

.item {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
