<template>
  <div class="sections">
    <template v-for="section in sections">
      <Section v-if="section.type === 'Title'">
        <p class="title-materials">
          {{ section.title }}
        </p>
        <div
          v-if="section.content"
          class="list-content"
          v-html="unescapeHTML(section.content)"
        />
        <RouterLink to="/calc" v-if="enableCalc"
          ><img
            class="calc-button"
            src="https://db.acoustic.ru:3005/api/v1/constr/calc.svg"
            alt=""
        /></RouterLink>
      </Section>

      <Section v-else-if="section.type === 'Image'">
        <div v-if="Array.isArray(section.file)">
          <swiper :slides-per-view="1" :loop="true" class="mySwiper">
            <swiper-slide v-for="(file, index) in section.file" :key="index">
              <img
                class="img"
                :src="filesApi.getImageFileUrl(file)"
                alt="Слайд"
              />
            </swiper-slide>
          </swiper>
        </div>
        <div v-else>
          <img
            class="img"
            :src="section.file && filesApi.getImageFileUrl(section.file)"
            alt="Изображение"
          />
        </div>
      </Section>

      <Section v-else-if="section.type === 'ImageWithTitle'">
        <img
          class="img"
          :src="section.file && filesApi.getImageFileUrl(section.file)"
          alt="wwwww"
        />
      </Section>

      <Section
        v-else-if="section.type === 'Materials'"
        :title="section.title"
        :image="section.img && filesApi.getImageFileUrl(section.img)"
      >
        <ul class="list-content">
          <li v-for="item in section.constr_materials">
            <RouterLink
              :to="`/soundproof/materials/${encodeURIComponent(item.code)}`"
              >{{ item.name ?? item.code }}</RouterLink
            >
          </li>
        </ul>
      </Section>

      <Section
        v-else-if="section.type === 'Documents'"
        :title="section.title"
        :image="section.img && filesApi.getImageFileUrl(section.img)"
      >
        <ul class="list-content">
          <li
            style="padding-top: 6px"
            v-for="[type, items] in Object.entries(section.content).filter(
              ([_, items]) => items?.length > 0
            )"
          >
            <img
              src="https://db.acoustic.ru:3005/api/v1/constr/i_pdf.svg"
              alt=""
              style="width: 30px; margin-right: 10px"
            />
            {{ DocumentTypeNames[SectionDocumentType[type]] }}
            <ul class="list-content">
              <li v-for="item in items">
                <RouterLink
                  :to="`/documents/${
                    DocumentTypeLink[SectionDocumentType[type]]
                  }/${encodeURIComponent(item.code)}`"
                  >{{ item.name ?? item.code }}</RouterLink
                >
              </li>
            </ul>
          </li>
          <li v-if="hasArticul()" @click="copyData(section.content)">
            Номенклатура 1С ✏️
          </li>
        </ul>
      </Section>

      <Section
        v-else
        :title="section.title"
        :image="section.img && filesApi.getImageFileUrl(section.img)"
      >
        <span v-html="section.content" />
      </Section>
    </template>
  </div>
</template>

<script setup>
import { filesApi } from "../../config";
import { defineProps, onMounted, ref } from "vue";
import Section from "../Section/index.vue";
import { marked } from "marked";

import { Swiper, SwiperSlide } from "swiper/vue";
import {
  SectionDocumentType,
  DocumentTypeNames,
  DocumentTypeLink,
} from "../../types";
import "swiper/css";

const { sections, enableCalc = false } = defineProps([
  "sections",
  "enableCalc",
]);

function unescapeHTML(html) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

function hasArticul() {
  return !!document.querySelector("[data-articul]");
}

function copyData(content) {
  const element = document.querySelector("[data-articul]");
  if (element) {
    const articul = element.getAttribute("data-articul");
    navigator.clipboard
      .writeText(articul)
      .then(() => {
        alert(`Данные скопированы в буфер обмена! ${articul}`);
      })
      .catch((err) => {
        console.error("Ошибка при копировании:", err);
      });
  } else {
    console.warn("Атрибут data-articul не найден.");
  }
}

// onMounted(async () => {
//   for (const section of props.sections) {
//     if (section.content) {
//       section.content = await marked(section.content);
//     }

//     sections.value.push(section);
//   }
// });
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
  color: var(--section-text-color);
}

.calc-button {
  width: 50px;
  margin-top: 10px;
  padding: 6px;
  background: grey;
  border-radius: 20%;
}
.calc-button:hover {
  border-radius: 30%;
  border: solid 1px white;
}

.title-materials {
  text-transform: uppercase;
  width: 100%;
  background: radial-gradient(circle at center, #b0b8be8c, #d7dadf62);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

:deep .list-content li {
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  margin-top: 5px;
  padding-left: 10px;
  border-radius: 5px;
}
:deep .list-content li a {
  text-decoration: none;
  color: var(--section-text-color);
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
</style>
