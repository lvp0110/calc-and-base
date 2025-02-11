<template>
  <div class="select">
    <div
      class="form-select value"
      :class="{ selected: value }"
      @click="onToggle"
    >
      {{ value || placeholder }}
    </div>
    <ImageDropdown
      v-if="open"
      :items="items"
      :onSelect="onSelect"
      :onClose="onClose"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ImageDropdown from "./ImageDropdown.vue";

const open = ref(false);

const { placeholder, items, value, onSelect } = defineProps([
  "placeholder",
  "items",
  "value",
  "onSelect",
]);

const onClose = () => {
  open.value = false;
};

const onToggle = (event) => {
  if (!open.value) {
    event.stopPropagation();
  }

  open.value = !open.value;
};
</script>

<style scoped lang="scss">
.select {
  position: relative;
}

.value {
  background: radial-gradient(circle at right, #8e9092, #f9f9fa00);
  box-shadow: 2px 3px 3px rgb(161, 160, 160);
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

.selected {
  background: radial-gradient(circle at left, #8e9092, #f9f9fa00);
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

@media (prefers-color-scheme: dark) {
  .value {
    color: aliceblue;
  }
}
</style>
