<template>
  <ul class="dropdown">
    <li class="dropdown__item">
      <input
        type="text"
        class="form-control"
        id="result_voice"
        placeholder="Поиск..."
        :value="value"
        @input="handleInput"
      />
    </li>
    <li
      v-for="item in filteredItems"
      :key="item.code"
      class="dropdown__item"
      @click="select(item)"
    >
      <img
        class="dropdown__item__image"
        :src="filesApi.getImageFileUrl(item.img)"
      />
      <img
        v-if="item.section_img"
        class="dropdown__item__image"
        :src="filesApi.getImageFileUrl(item.section_img)"
      />
      <div>{{ item.name }}</div>
    </li>
  </ul>
  <div class="backdrop" @click="onClose" />
</template>

<script setup>
import { ref, computed } from "vue";
import { filesApi } from "../../config";
const { items, onSelect, onClose } = defineProps([
  "items",
  "onSelect",
  "onClose",
]);

const value = ref("");

const filteredItems = computed(() => {
  if (!value.value.length) {
    return items;
  }

  return items.filter((item) =>
    item.name?.toLowerCase().includes(value.value.toLowerCase())
  );
});

const handleInput = (event) => {
  value.value = event.target.value;
};

const select = (item) => {
  onSelect(item);
  onClose();
};
</script>

<style scoped lang="scss">
.form-control {
  width: 100%;
  height: 45px;
}

.backdrop {
  background-color: transparent;
  position: fixed;
  inset: 0;
  z-index: 500;
}

.dropdown {
  position: fixed;
  inset: 0;
  height: calc(100% - 55px);
  width: calc(545px - 40px);
  margin: 53px auto 120px 80px;
  padding: 4px;
  background: radial-gradient(circle at center, #9a9ea3, rgb(244 244 246 / 86%));
  overflow: auto;
  z-index: 999;
  list-style-type: none;


  &__item {
    padding: 4px;
    color: rgb(58, 57, 57);  

    &:hover {
      background-color: rgba(220, 220, 220, 0.63);
      border: solid 2px white;
      border-radius: 5px;
      cursor: pointer;
      color: var(--select-color);
    }

    &__image {
      width: 100%;
      object-fit: contain;
      margin-bottom: 6px;
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: lightgray;
  }

  @media screen and (max-width: 1024px) {
    position: fixed;
    inset: 0;
    height: calc(100% - 55px);
    width: auto;
    margin: 53px auto 120px 80px;
  }

  @media screen and (max-width: 500px) {
    position: fixed;
    inset: 0;
    height: calc(100% - 70px);
    width: calc(100% - 20px);
    margin: 53px auto 120px auto;
  }
}
</style>
