<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />
  <div class="content" v-if="selectElement">
    
    <div class="title">{{ selectElement.Name }}</div>
    <hr />
    <ul>
      <li class="list-item" v-if="selectElement.Location">
        <p>Адрес:</p>
        {{ selectElement.Location }}
      </li>
      <!-- <li v-if="selectElement.Cover">{{ selectElement.Cover }}</li> -->
      <li class="list-item" v-if="selectElement.Contractor">
        <p>Заказчик:</p>
        {{ selectElement.Contractor }}
      </li>
      <li class="list-item" v-if="selectElement.Designer">
        <p>Проектировщик:</p>
        {{ selectElement.Designer }}
      </li>
      <li class="list-item" v-if="selectElement.ProjectOwner">
        <p>Ген.подрядчик :</p>
        {{ selectElement.ProjectOwner }}
      </li>
      <li class="list-item" v-if="selectElement.TotalArea">
        <p>Площадь:</p>
        {{ selectElement.TotalArea }} м2
      </li>
      <li class="list-item" v-if="selectElement.CompletionYear">
        <p>Год:</p>
        {{ selectElement.CompletionYear }} г.
      </li>
      <li class="list-item" v-if="selectElement.PerformedWorks">
        <p>Выполненные работы :</p>
        <p v-html="selectElement.PerformedWorks"></p>
      </li>
    </ul>
    <span>Используемые материалы :</span>
    <ul v-if="selectElement?.UsedBrands?.length > 0">
      <li
        class="list-materials list-item"
        v-for="(material, index) in selectElement.UsedBrands"
        :key="index"
      >
        <RouterLink :to="`/acoustic/brands/${material.Code}`">
          {{ material.Name }}<span class="ellipses">...</span> </RouterLink
        ><span class="ellipses">...</span>
      </li>
    </ul>
    <ul v-if="selectElement?.UsedMaterials?.length > 0">
      <li
        class="list-materials list-item"
        v-for="(material, index) in selectElement.UsedMaterials"
        :key="index"
      >
        <RouterLink :to="`/soundproof/materials/${material.Code}`">
          {{ material.Name }}<span class="ellipses">...</span> </RouterLink
        ><span class="ellipses">...</span>
      </li>
    </ul>
    <div :class="['slider-position', { 'full-screen': fullScreen }]">
      <section @click="toggleFullScreen">
        <img src="/increase_white.svg" alt="" />
      </section>
      <ObjectsSlider
        :slides="
          selectElement.Images.map(({ file }) => filesApi.getImageFileUrl(file))
        "
        :slideComponent="ImageSlide"
      />
    </div>

    <p class="block-description" v-if="selectElement.Description">
      {{ selectElement.Description }}
    </p>
  </div>
</template>

<script setup>
import MainPageLayout from "../../../components/Layouts/MainPageLayout.vue";
import ObjectsSlider from "../../../components/Slider/ObjectsSlider.vue";
import ImageSlide from "../../../components/Slider/ImageSlide.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { objectsApi } from "../../../config";
import { filesApi } from "../../../config";

const selectElement = ref(null);
const route = useRoute();

const code = route.params.id;

const fetchObject = async (code) => {
  const response = await objectsApi.getObject(code);

  selectElement.value = response.data.data;
};

fetchObject(code);

const breadcrumbs = computed(() => [
  { link: "/our-objects", title: " НАШИ ОБЪЕКТЫ " },
  { title: selectElement.value?.Name },
]);

const fullScreen = ref(false);

const toggleFullScreen = () => {
  fullScreen.value = !fullScreen.value;
};
</script>

<style scoped>

.content {
  flex-grow: 1;
  overflow: auto;
}
* {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

.list-materials a {
  color: var(--list-materials-color);
  text-decoration: none;
}

.block-description {
  margin-top: 15px;
  color: var(--block-description-color);
}

.title {
  margin-top: 15px;
  width: 100%;
  font-weight: 400;
  text-transform: uppercase;
  background: radial-gradient(circle at center, #8992998c, #dfe1e662);
  padding: 5px;
  text-align: center;
}
p {
  background: #dfdbdb;
  padding-left: 10px;
  margin-left: -8px;
  margin-bottom: 0;
  color: black;
}
.list-item {
  list-style-type: none;
  background: radial-gradient(circle at left, #a8b1b88c, #d7dadf62);
  margin-top: 10px;
  padding-left: 10px;
  margin-left: -34px;
}
.ellipses {
  padding: 0;
  display: none;
}

a {
  color: var(--link-text);
}

a:hover {
  color: var(--link-text-hover);
  text-decoration: none;
}

a:hover + .ellipses {
  display: inline-block;
  text-decoration: none;
}

span {
  text-transform: uppercase;
  font-weight: 300;
  font-size: 15px;
  padding-left: 15px;
}

section {
  display: none;
}
</style>
