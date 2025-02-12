<template>
  <div v-if="open" class="backdrop" @click="onClose">
    <div class="dialog" @click.stop>
      <div class="title">
        <button @click="onClose" class="close-button">&#x2715;</button>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const { open, onClose } = defineProps(["open", "onClose"]);
</script>

<style scoped>
.close-button {
  font-size: 30px;
  border: 1px solid gray;
  width: 50px;
  color: gray;
  border-radius: 20%;
  background: none;
}
.backdrop {
  background-color: rgba(255, 255, 255, 0.2);
  position: fixed;
  inset: 0;
  z-index: 999;
}

.dialog {
  position: absolute;
  inset: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 2px;
  z-index: 1000;
}

.title {
  padding:8px 8px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.content {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
@media (prefers-color-scheme: dark) {
  .dialog {
    color: rgb(95, 94, 94);
  }  
}
@media screen and (min-width: 1024px) {
  .dialog {
    border-radius: 8px;
    inset: 16px;
  }
}
</style>
