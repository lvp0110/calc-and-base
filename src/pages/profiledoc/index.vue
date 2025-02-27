<template>
  <div>
    <div class="block">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="section"
        :style="{ transform: `translateX(${index * 50}px)` }"
        @click="bringToFront(index)"
      >
        <span
          style="
            display: block;
            position: absolute;
            color: white;
            padding-left: 4px;
            padding-top: 15px;
            background-color: rgba(10, 115, 160, 0.9);
            width: 50px;
            height: 100vh;
            border-top-left-radius: 20px;
          "
          >{{ section.content }}</span
        >

        <span
          style="
            display: block;
            text-align: center;
            margin: 150px;
            font-size: 100px;
          "
          >{{ section.content }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sections = ref([
  { id: 1, label: 'Your calculation', content: 'CALC' },
  { id: 2, label: 'Your photos', content: 'FOTO' },
  { id: 3, label: 'Your documents', content: 'DOC' },
]);

const bringToFront = (selectedIndex) => {
  const selectedSection = sections.value.splice(selectedIndex, 1)[0];
  sections.value.push(selectedSection);
};
</script>

<style scoped>
.block {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: flex-start;
}

.section {
  width: 100%;
  height: 100vh;
  border: solid 2px;
  border-top-left-radius: 20px;
  position: absolute;
  top: 0;
  transition: all 0.7s ease;
  background: gray;
}

.section:nth-child(1) {
  background: rgba(130, 130, 130);
}

.section:nth-child(2) {
  background: rgba(130, 130, 130);
}

.section:nth-child(3) {
  background: rgba(130, 130, 130);
}
</style>
