<template>
  <div class="sections">
    <template v-for="section in sections">
      <Section v-if="section.type === 'Title'">
        <p class="title-materials">
          {{ section.title }}
        </p>
        <div style="white-space: pre-wrap" v-html="section.content" />
      </Section>

      <Section v-else-if="section.type === 'Image'">
        <img
          class="img"
          :src="section.file && filesApi.getImageFileUrl(section.file)"
          alt="wwwww"
        />
      </Section>

      <Section v-else-if="section.type === 'ImageWithTitle'" :title="section.title" :image="section.img && filesApi.getImageFileUrl(section.img)">
        <img
          class="img"
          :src="section.file && filesApi.getImageFileUrl(section.file)"
          alt="wwwww"
        />
      </Section>

      <Section v-else :title="section.title" :image="section.img && filesApi.getImageFileUrl(section.img)">
        <span style="white-space: pre-wrap" v-html="section.content" />
      </Section>
    </template>
  </div>
</template>

<script setup>
import { filesApi } from "../../config";
import { defineProps } from "vue";
import Section from "../Section/index.vue";

const { sections } = defineProps(["sections"]);
</script>

<style scoped>
.sections {
  display: grid;
  gap: 26px;
  grid-template-columns: 1fr;
}

* {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

.title-materials {
  text-transform: uppercase;
  width: 100%;
  background: radial-gradient(circle at center, #b0b8be8c, #d7dadf62);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

ul li {
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  margin-top: 5px;
  padding-left: 10px;
}

ul {
  margin-top: 15px;
}

.span1 {
  display: none;
}

img {
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .sections {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1400px) {
  .sections {
    grid-template-columns: repeat(3, 1fr);
  }
}
/* @media screen and (min-width: 768px) {
    .img {
        width: 50%;
    }
}

@media screen and (min-width: 1024px) {
    .img {
        width: 40%;
    }
} */
</style>
