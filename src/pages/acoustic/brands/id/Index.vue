<template>
  <MainPageLayout :breadcrumbs="breadcrumbs()" :hiddenSearch="true" />
  <div class="content" v-if="selectElement">
    <!-- <p class="title">{{ selectElement.Name }}</p> -->

    <div class="block-image-colors">
      <img
        v-if="selectedColor"
        :src="filesApi.getImageFileUrl(colorizedImage())"
        :alt="selectedColor?.Name"
      />
      <img
        v-else-if="modelImages().length === 0"
        :src="filesApi.getImageFileUrl(selectElement.Img)"
        :alt="selectedColor?.Name"
      />
      <ObjectsSlider
        v-else
        :slides="modelImages()"
        :slideComponent="ImageSlide"
      />
    </div>

    <div class="select-container models">
      <select
        class="form-select select-descript"
        :class="{ selected: selectedModelCode }"
        aria-label="Default select example"
        v-model="selectedModelCode"
        @change="selectModel"
      >
        <option value="null" disabled>Выбрать модель</option>
        <option v-for="model in models" :value="model.Code">
          {{ model.Name }}
        </option>
      </select>
    </div>

    <div class="select-container colorsizes">
      <div v-if="params.Sizes?.length > 0" class="select-wrapper size">
        <select
          class="form-select select-descript"
          :class="{ selected: selectedSizeCode }"
          v-model="selectedSizeCode"
          aria-label="Default select example"
          @change="selectSize($event)"
        >
          <option value="null" disabled>Размеры</option>
          <option v-for="size in params.Sizes" :value="size.Code">
            {{ `${size.LenX}/${size.LenZ}/${size.LenY} мм` }}
          </option>
        </select>
      </div>

      <div v-if="params.Colors?.length > 0" class="select-wrapper colors">
        <ImageSelect
          placeholder="Цвет"
          :value="selectedColor?.Description"
          :items="params?.Colors"
          :onSelect="selectColor"
        />
      </div>
    </div>

    <div v-if="selectedModelCode" class="select">
      <div class="select-container perforation">
        <div v-if="params.Perforations?.length > 0" class="select-wrapper">
          <ImageSelect
            placeholder="Тип перфорации"
            :value="selectedPerforation?.Description"
            :items="params?.Perforations"
            :onSelect="selectPerforation"
          />
          <img
            v-if="selectedPerforation"
            class="add-image"
            :src="filesApi.getImageFileUrl(selectedPerforation.Img)"
            :alt="selectedPerforation?.Name"
          />
          <img
            v-if="selectedPerforation && selectedPerforation.SectionImg"
            class="add-image"
            :src="filesApi.getImageFileUrl(selectedPerforation.SectionImg)"
            :alt="selectedPerforation?.Name"
          />
        </div>

        <div v-if="params.EdgesTypes?.length > 0" class="select-wrapper">
          <ImageSelect
            placeholder="Тип кромки"
            :value="selectedEdgeType?.Name"
            :items="params?.EdgesTypes"
            :onSelect="selectEdgeType"
          />
          <img
            v-if="selectedEdgeType"
            class="add-image"
            :src="filesApi.getImageFileUrl(selectedEdgeType.Img)"
            :alt="selectedEdgeType?.Name"
          />
        </div>
      </div>
    </div>
    <div class="block-span2">
      <template v-if="!selectedModelCode">
        <span class="span" v-html="selectElement?.Description"></span>
      </template>

      <template v-else>
        <span v-html="selectedModelDescription()"></span>
      </template>

      <button class="copy-link" @click="copyLink">
        <div class="icon-img">
          <img src="/share_icon_grey.svg" alt="" />
        </div>
        копировать ссылку
      </button>
    </div>
    <!-- <hr> -->

    <div class="block-span1">
      <template v-if="!selectedModelCode">
        <span class="span" v-html="selectElement?.Description"></span>
      </template>
      <template v-else>
        <span v-html="selectedModelDescription()"></span>
      </template>
      <button class="copy-link" @click="copyLink">
        <div class="icon-img">
          <img src="/share_icon_grey.svg" alt="" />
        </div>
        копировать ссылку
      </button>

      <div>
        <table>
          <SelectMaterialRow
            v-for="item in tableWithData"
            :key="item.id"
            :items="item.items"
            :selectedArticul="selectedArticuls[item.id]"
            :on-change="changeArticul(item.id)"
          />
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import ImageSelect from "../../../../components/ImageSelect/ImageSelect.vue";
import ObjectsSlider from "../../../../components/Slider/ObjectsSlider.vue";
import ImageSlide from "../../../../components/Slider/ImageSlide.vue";
import { filesApi, modelsApi } from "../../../../config";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SelectMaterialRow from "../../../../components/SelectMaterialRow.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const models = ref([]);
const params = ref({});
const selectedModelCode = ref(null);
const selectedColor = ref(null);
const selectedSizeCode = ref(null);
const selectedPerforation = ref(null);
const selectedEdgeType = ref(null);

const response = ref({
  items: {
    "articul 1": {
      articul: "articul 1",
      name: "name 1",
      amount: "10 шт",
      units: "unit 1",
    },
    "articul 2": {
      articul: "articul 2",
      name: "name 2",
      amount: "2 шт",
      units: "unit 2",
    },
    "articul 3": {
      articul: "articul 3",
      name: "name 3",
      amount: "3 шт",
      units: "unit 3",
    },
  },
  table: [
    {
      id: "1",
      articuls: ["articul 1"],
    },
    {
      id: "2",
      articuls: ["articul 2", "articul 3"],
    },
  ],
})

const selectedArticuls = ref(
  Object.fromEntries(
    response.value.table.map(({ id, articuls }) => [id, articuls[0]])
  )
);

const tableWithData = computed(() => response.value.table.map(({ id, articuls }) => ({
  id,
  items: articuls.map((articul) => response.value.items[articul]),
})))

const changeArticul = (id) => (articul) => {
  selectedArticuls.value[id] = articul;
};

const selectElement = computed(() =>
  store.getters["selectAcousticCategories"].find(
    ({ ShortName }) => ShortName === route.params.id
  )
);

const colorizedImage = () => {
  if (selectedColor.value && selectedColor.value.Img) {
    return selectedColor.value.Img;
  }

  return selectElement.value.Img;
};

const modelImages = () => {
  if (selectedModelCode.value) {
    const selectedModel = models.value.find(
      (model) => model.Code === selectedModelCode.value
    );

    if (selectedModel) {
      return [filesApi.getImageFileUrl(selectedModel.Img)];
    }
  }

  return [];
};

const fetchBrand = async () => {
  const response = await modelsApi.getModelsByBrand(route.params.id);

  models.value = response.data.data;
  selectedModelCode.value = route.query.model ?? null;

  if (route.query.model) {
    selectModelInitial();
  }
};

const selectModel = async (event) => {
  selectedModelCode.value = event.target.value;

  const response = await modelsApi.getModelParams(event.target.value);

  params.value = response.data.data;

  selectedSizeCode.value = null;
  selectedPerforation.value = null;
  selectedColor.value = null;
  selectedEdgeType.value = null;

  replaceLocation();
};

const selectModelInitial = async () => {
  const response = await modelsApi.getModelParams(selectedModelCode.value);

  params.value = response.data.data;

  selectedSizeCode.value = route.query.size ?? null;
  selectedColor.value =
    params.value?.Colors?.find((color) => color.Name === route.query.color) ??
    null;
  selectedPerforation.value =
    params.value?.Perforations?.find(
      (perforation) => perforation.Name === route.query.perforation
    ) ?? null;
  selectedEdgeType.value =
    params.value?.EdgesTypes?.find(
      (edgeType) => edgeType.Name === route.query.edgeType
    ) ?? null;
};

const selectColor = (color) => {
  selectedColor.value = color;

  replaceLocation();
};

const selectedModelDescription = () => {
  const selectedModel = models.value.find(
    (model) => model.Code === selectedModelCode.value
  );

  return selectedModel ? selectedModel.Description : "";
};

const selectSize = (event) => {
  selectedSizeCode.value = event.target.value;

  replaceLocation();
};

const selectPerforation = (perforation) => {
  selectedPerforation.value = perforation;

  replaceLocation();
};

const selectEdgeType = (edgeType) => {
  selectedEdgeType.value = edgeType;

  replaceLocation();
};

const replaceLocation = () => {
  let query = {};

  if (selectedModelCode.value) {
    query.model = selectedModelCode.value;
  }

  if (selectedSizeCode.value) {
    query.size = selectedSizeCode.value;
  }

  if (selectedColor.value) {
    query.color = selectedColor.value.Name;
  }

  if (selectedPerforation.value) {
    query.perforation = selectedPerforation.value.Name;
  }

  if (selectedEdgeType.value) {
    query.edgeType = selectedEdgeType.value.Name;
  }

  router.replace({ path: router.options.history.location, query });
};

const breadcrumbs = () => {
  return [
    { link: "/acoustic", title: "..." },
    { link: "/acoustic/brands", title: "БРЕНДЫ" },
    { title: selectElement.value.Name },
  ];
};

fetchBrand();

watch(
  () => route.params.id,
  () => fetchBrand()
);

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
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

.icon-img {
  display: flex;
  width: 30px;
  position: absolute;
  margin: -3px;
}

.add-image {
  margin-top: 10px;
}

.title {
  margin-top: 20px;
  font-weight: 600;
  width: 80%;
}

.block-image-colors img {
  width: 100%;
  object-fit: contain;
  margin-bottom: 10px;
}

.perforation {
  display: flex;
  justify-content: space-between;
}

.select-wrapper {
  width: 50%;
  margin-bottom: 4px;
}

.models {
  margin-bottom: 4px;
}

.size {
  width: 100%;
}

.colors {
  width: 100%;
}

.select-descript {
  background: radial-gradient(circle at right, #8e9092, #f9f9fa00);
  box-shadow: 2px 3px 3px rgb(161, 160, 160);
}

.selected {
  background: radial-gradient(circle at left, #8e9092, #f9f9fa00);
  color: aliceblue;
  border: solid 1px rgb(204, 198, 198);
}

.copy-link {
  width: 300px;
  margin-left: 15px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px;
  background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
  margin-bottom: 15px;
  padding: 8px;
  color: #575656;
}

.copy-link:hover {
  background: radial-gradient(circle at left, #c7ced4, #f9f9fa00);
  border-radius: 10px;
}

.copy-link:focus {
  background: radial-gradient(circle at right, #c7ced4, #f9f9fa00);
  color: rgb(158, 161, 163);
  border-radius: 10px;
}

.img {
  width: 100%;
}

.block-span2 {
  display: block;
  margin-top: 10px;
}

.block-span1 {
  display: none;
}

@media screen and (min-width: 768px) {
  .colorsizes {
    display: flex;
    justify-content: space-between;
  }

  .size {
    width: 50%;
  }

  .colors {
    width: 50%;
  }
}

@media screen and (min-width: 1024px) {
  .block-span1 {
    display: block;
    width: 45%;
    margin-left: 46%;
    top: 130px;
    position: absolute;
  }

  .block-span2 {
    display: none;
  }

  .colorsizes {
    width: 50%;
  }

  .perforation {
    width: 50%;
  }

  .block-image-colors {
    width: 50%;
    /* height: 50%; */
  }

  .models {
    width: 50%;
  }

  .select-wrapper {
    width: 50%;
  }

  .size {
    width: 50%;
  }

  .colors {
    width: 50%;
  }
}

@media screen and (min-width: 1240px) {
  .block-span1 {
    display: block;
    width: 43%;
    margin-left: 48%;
    top: 130px;
    position: absolute;
  }
}
</style>
