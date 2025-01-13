<template>
  <MainPageLayout :breadcrumbs="breadcrumbs()" :hiddenSearch="true" />
  <div class="content" v-if="selectElement">
    <!-- <p class="title">{{ selectElement.Name }}</p> -->
    <div class="left">
      <div class="block-image-colors">
        <img
          v-if="selectedColor"
          :src="filesApi.getImageFileUrl(colorizedImage())"
          :alt="selectedColor?.Name"
          class="model-image"
        />
        <img
          v-else-if="modelImages().length === 0"
          :src="filesApi.getImageFileUrl(selectElement.Img)"
          :alt="selectedColor?.Name"
          class="model-image"
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
      <div v-if="isAvailableCalculated && isAvailableSizes()" class="form">
        <div class="form-header">
          <div>
            <button
              @click="selectSquare"
              class="form-toggle"
              :class="{ 'form-toggle--active': isSquare }"
            >
              Площадь
            </button>
            <button
              @click="selectSizes"
              class="form-toggle"
              :class="{ 'form-toggle--active': !isSquare }"
            >
              Размеры
            </button>
          </div>
          <label class="form-label">
            <select v-model="type">
              <option value="wall">Стена</option>
              <option value="ceiling">Потолок</option>
            </select>
          </label>
        </div>
        <div class="form-content">
          <label v-if="isSquare" class="form-label">
            <span>Площадь</span>
            <input type="number" inputmode="decimal" v-model="square" />
          </label>
          <template v-else>
            <label class="form-label">
              <span>Длина</span>
              <input type="number" inputmode="decimal" v-model="length" />
            </label>
            <label class="form-label">
              <span>Высота (Ширина)</span>
              <input type="number" inputmode="decimal" v-model="height" />
            </label>
          </template>
        </div>
        <button class="form-button" @click="calculate">Расчет</button>
      </div>
    </div>

    <div class="right">
      <div class="description">
        <template v-if="!selectedModelCode">
          <span class="span" v-html="selectElement?.Description"></span>
        </template>
        <template v-else>
          <span v-html="selectedModelDescription()"></span>
        </template>
      </div>
      <div class="action-buttons">
        <button class="copy-link" @click="copyLink">
          <div class="icon-img">
            <img src="/share_icon_grey.svg" alt="" />
          </div>
        </button>
        <button
          v-if="chartResponse"
          class="copy-link"
          style="background-color: rgb(32, 145, 197)"
          @click="handleOpenChartDialog"
        >
          <div class="icon-img">
            <img
              width="30px"
              src="https://db.acoustic.ru:3005/api/v1/constr/acoustic_prop_icon.png"
              alt=""
            />
          </div>
        </button>
        <a
          v-if="calculationsTableColumns.length > 0"
          class="copy-link"
          target="_blank"
          :href="exportExcelLink"
        >
          <div class="icon-img">
            <img
              width="30px"
              src="https://db.acoustic.ru:3005/api/v1/constr/Excel_icon.png"
              alt=""
            />
          </div>
        </a>
      </div>

      <!-- <div v-if="isAvailableSizes()" class="form">
        <div class="form-header">
          <div>
            <button
              @click="selectSquare"
              class="form-toggle"
              :class="{ 'form-toggle--active': isSquare }"
            >
              Площадь
            </button>
            <button
              @click="selectSizes"
              class="form-toggle"
              :class="{ 'form-toggle--active': !isSquare }"
            >
              Размеры
            </button>
          </div>
          <label class="form-label">
            <select v-model="type">
              <option value="wall">Стена</option>
              <option value="ceiling">Потолок</option>
            </select>
          </label>
        </div>
        <div class="form-content">
          <label v-if="isSquare" class="form-label">
            <span>Площадь</span>
            <input type="number" inputmode="decimal" v-model="square" />
          </label>
          <template v-else>
            <label class="form-label">
              <span>Длина</span>
              <input type="number" inputmode="decimal" v-model="length" />
            </label>
            <label class="form-label">
              <span>Высота</span>
              <input type="number" inputmode="decimal" v-model="height" />
            </label>
          </template>
        </div>
        <button class="form-button" @click="calculate">Рассчитать</button>
      </div> -->

      <div v-if="calculationsTableColumns.length > 0">
        <table id="table">
          <tr>
            <th v-for="column in calculationsTableColumns">
              {{ column.name }}
            </th>
          </tr>
          <SelectMaterialRow
            v-for="row in calculationsTableRows"
            :key="row.id"
            :columns="calculationsTableColumns"
            :items="row.items"
            :selectedArticul="selectedArticuls[row.id]"
            :on-change="changeArticul(row.id)"
          />
        </table>
      </div>
    </div>
  </div>
  <!-- <button @click="exportToFile">export</button> -->
  <Dialog :open="openChartDialog" :on-close="handleCloseChartDialog">
    <Chart
      :items="chartResponse.items"
      :diagram_params="chartResponse.diagram_params"
    />
  </Dialog>
</template>

<script setup>
import ImageSelect from "../../../../components/ImageSelect/ImageSelect.vue";
import ObjectsSlider from "../../../../components/Slider/ObjectsSlider.vue";
import ImageSlide from "../../../../components/Slider/ImageSlide.vue";
import {
  filesApi,
  modelsApi,
  constructionsApi,
  dataV2Api,
} from "../../../../config";
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SelectMaterialRow from "../../../../components/SelectMaterialRow.vue";
import Dialog from "../../../../components/Dialog/index.vue";
import Chart from "../../../../components/Chart/index.vue";
import { getColorByIndex } from "../../../../utils/colors";
import { exportToCsv } from "../../../../utils/files";

const store = useStore();
const route = useRoute();
const router = useRouter();

const models = ref([]);
const params = ref({});
const isLoadingParams = ref(false);
const selectedModelCode = ref(null);
const selectedColor = ref(null);
const selectedSizeCode = ref(null);
const selectedPerforation = ref(null);
const selectedEdgeType = ref(null);

const exportExcelLink = ref(constructionsApi.exportExcelUrl(route.params.id));

const isAvailableCalculated = ref(true);
const isSquare = ref(true);
const square = ref("");
const length = ref("");
const height = ref("");
const type = ref("wall");

const openChartDialog = ref(false);

const availableParamsNames = ["Colors", "EdgesTypes", "Perforations", "Sizes"];

const calculationsTableColumns = ref([]);
const calculationsTableRows = ref([]);

const chartResponse = ref(null);

const handleOpenChartDialog = () => {
  openChartDialog.value = true;
};

const handleCloseChartDialog = () => {
  openChartDialog.value = false;
};

const selectedArticuls = computed(() =>
  Object.fromEntries(
    calculationsTableRows.value.map(({ id, items }) => [id, items[0]?.code])
  )
);

const isAvailableSizes = () => {
  if (isLoadingParams.value) {
    return false;
  }

  const paramsCount =
    Object.entries(params.value).filter(
      ([key, value]) =>
        availableParamsNames.includes(key) &&
        Array.isArray(value) &&
        value.length > 0
    ).length + 1;

  const selectedParamsCount = [
    selectedModelCode.value,
    selectedColor.value,
    selectedSizeCode.value,
    selectedPerforation.value,
    selectedEdgeType.value,
  ].filter(Boolean).length;

  return selectedParamsCount >= paramsCount;
};

const selectSquare = () => {
  isSquare.value = true;
};

const selectSizes = () => {
  isSquare.value = false;
};

const resetForm = () => {
  isSquare.value = true;
  square.value = "";
  length.value = "";
  height.value = "";
  type.value = "wall";
};

const validateForm = () => {
  if (isSquare.value) {
    return square.value !== "";
  } else {
    return length.value !== "" && height.value !== "";
  }
};

const calculate = async () => {
  if (!validateForm()) {
    return;
  }

  replaceLocation();

  const response = await constructionsApi.constructionsCalculate(
    route.params.id,
    getLocationParams()
  );

  calculationsTableColumns.value = response.data.data.columns.filter(
    ({ id }) => id !== "code"
  );
  calculationsTableRows.value = response.data.data.rows;

  updateExcelLink();
};

const updateExcelLink = () => {
  const urlSearchParams = new URLSearchParams(getLocationParams());

  Object.values(selectedArticuls.value).forEach((articul) => {
    urlSearchParams.append("articuls", articul);
  });

  exportExcelLink.value = `${constructionsApi.exportExcelUrl(
    route.params.id
  )}?${urlSearchParams.toString()}`;
};

const changeArticul = (id) => (articul) => {
  calculationsTableRows.value = calculationsTableRows.value.map((row) => {
    if (row.id === id) {
      const selectedItem = row.items.find(({ code }) => code === articul);
      const items = row.items.filter(({ code }) => code !== articul);

      items.unshift(selectedItem);

      return {
        id: row.id,
        items: items,
      };
    }
    return row;
  });
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

const fetchChart = async () => {
  const response = await dataV2Api.getMeasurements(
    route.params.id.toLowerCase()
  );

  const itemsWithColors = response.data.data.items.map((item, index) => ({
    ...item,
    color: getColorByIndex(index),
  }));

  chartResponse.value = {
    ...response.data.data,
    items: itemsWithColors,
  };
};

const fetchBrand = async () => {
  const response = await modelsApi.getModelsByBrand(route.params.id);

  // FIXME: Убрать старую реализацию
  if (Array.isArray(response.data.data)) {
    models.value = response.data.data
  } else {
    models.value = response.data.data.models_list;
    isAvailableCalculated.value = response.data.data.is_calculated
  }

  selectedModelCode.value = route.query.model ?? null;

  square.value = route.query.square;
  length.value = route.query.length;
  height.value = route.query.height;

  if (route.query.type) {
    type.value = route.query.type;
  }

  if (square.value == null && (length.value != null || height.value != null)) {
    isSquare.value = false;
  }

  if (route.query.model) {
    selectModelInitial();
  }
};

const selectModel = async (event) => {
  selectedModelCode.value = event.target.value;

  isLoadingParams.value = true;

  const response = await modelsApi.getModelParams(event.target.value);

  isLoadingParams.value = false;

  params.value = response.data.data;

  if (response.data.data?.Sizes?.length === 1) {
    selectedSizeCode.value = response.data.data?.Sizes?.[0]?.Code;
  } else {
    selectedSizeCode.value = null;
  }

  selectedPerforation.value = null;
  selectedColor.value = null;
  selectedEdgeType.value = null;
  calculationsTableColumns.value = [];
  calculationsTableRows.value = [];

  resetForm();

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
      (perforation) => perforation.Name === route.query.perf
    ) ?? null;
  selectedEdgeType.value =
    params.value?.EdgesTypes?.find(
      (edgeType) => edgeType.Name === route.query.edge
    ) ?? null;

  calculate();
};

const selectColor = (color) => {
  selectedColor.value = color;

  replaceLocation();

  calculate();
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

  calculate();
};

const selectPerforation = (perforation) => {
  selectedPerforation.value = perforation;

  replaceLocation();

  calculate();
};

const selectEdgeType = (edgeType) => {
  selectedEdgeType.value = edgeType;

  replaceLocation();

  calculate();
};

const getLocationParams = () => {
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
    query.perf = selectedPerforation.value.Name;
  }

  if (selectedEdgeType.value) {
    query.edge = selectedEdgeType.value.Name;
  }

  if (type.value) {
    query.type = type.value;
  }

  if (isSquare.value) {
    if (square.value) {
      query.square = square.value;
    }
  } else {
    if (length.value) {
      query.length = length.value;
    }

    if (height.value) {
      query.height = height.value;
    }
  }

  return query;
};

const replaceLocation = () => {
  router.replace({
    path: router.options.history.location,
    query: getLocationParams(),
  });
};

const breadcrumbs = () => {
  return [
    { link: "/acoustic", title: "..." },
    { link: "/acoustic/brands", title: "БРЕНДЫ" },
    { title: selectElement.value.Name },
  ];
};

fetchBrand();
fetchChart();

watch(
  () => route.params.id,
  () => {
    fetchBrand();
    fetchChart();
  }
);

watch(selectedArticuls, updateExcelLink);

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* .model-image {
  width: 100%;
  aspect-ratio: 500 / 270;
  object-fit: contain;
} */

.form {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 16px;
  gap: 8px;
  box-shadow: 5px 5px 2px #c7ced4;
  font-family: Montserrat, sans-serif;
  margin-top: 4px;
  text-transform: uppercase;
  font-size: 14px;
}

.form-toggle {
  background-color: transparent;
  border-radius: 8px;
  border: none;
  transition: all 300ms;
  padding: 9px 16px;
  margin: 0;
  text-transform: uppercase;
  font-size: 14px;
}

.form-toggle--active {
  background-color: rgb(36, 140, 185);
  color: white;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.form-label {
  display: flex;
  flex-direction: column;
}
.form-label input {
  width: 50%;
  padding: 6px;
  font-size: 18px;
}
.form-label select {
  padding: 10px;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 14px;
}
.form-button {
  align-self: flex-end;
  border: 1px solid grey;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 14px;
  padding: 6px;
  width: 110px;
}

.form-button:hover {
  border: 1px solid rgba(128, 128, 128, 0);
  background: rgb(36, 140, 185);
  color: white;
}

table {
  border: 1px solid;
}

th {
  font-weight: bold;
  padding: 8px;
  border: 1px solid;
}

option {
  color: gray;
}

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
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px;
  /* background: radial-gradient(circle at center, #c7ced4, #f9f9fa00); */
  margin-bottom: 15px;
  padding: 8px;
  color: #575656;
  display: flex;
  align-items: center;
  justify-content: center;
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
.right {
  margin-top: 10px;
}
.right .description {
  margin-bottom: 16px;
}

@media screen and (min-width: 1024px) {
  .left {
    min-width: 500px;
    max-width: 500px;
  }

  .right {
    flex-grow: 1;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }

  .colorsizes {
    display: flex;
    justify-content: space-between;
  }
}
</style>
