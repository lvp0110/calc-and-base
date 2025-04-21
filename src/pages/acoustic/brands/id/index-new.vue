<template>
  <MainPageLayout :breadcrumbs="breadcrumbs()" :hiddenSearch="true" />
  <div class="content" v-if="selectElement">
    <!-- <p class="title">{{ selectElement.Name }}</p> -->
    <div class="left">
      <div class="block-image-colors">
        <img
          v-if="selectedColorImage"
          :src="filesApi.getImageFileUrl(selectedColorImage)"
          class="model-image"
        />
        <img
          v-else-if="modelImages().length === 0"
          :src="filesApi.getImageFileUrl(selectElement.Img)"
          class="model-image"
        />
        <ObjectsSlider
          v-else
          :slides="modelImages()"
          :slideComponent="ImageSlide"
        />
      </div>

      <div class="selects-grid">
        <div v-for="brandParam in brandParams">
          <select
            v-if="brandParam.type === 'select'"
            class="form-select select-descript"
            :name="brandParam.code"
            :class="{ selected: selectedBrandParams[brandParam.code] != null }"
            v-model="selectedBrandParams[brandParam.code]"
            @change="selectBrandParam($event)"
          >
            <option value="undefined" disabled>{{ brandParam.name }}</option>
            <option v-for="item in brandParam.list" :value="item.code">
              {{ item.name }}
            </option>
          </select>
          <div v-else>
            <ImageSelect
              :placeholder="brandParam.name"
              :value="
                brandParam.list.find(
                  ({ code }) => selectedBrandParams[brandParam.code] === code
                )?.name
              "
              :items="brandParam.list"
              :onSelect="selectImageBrandParam(brandParam.code)"
            />
              <img
                v-if="
                  selectedBrandParams[brandParam.code] &&
                  brandParam.code !== BrandParamPossibleCode.Color
                "
                class="add-image"
                :src="
                  filesApi.getImageFileUrl(
                    brandParam.list.find(
                      ({ code }) =>
                        code === selectedBrandParams[brandParam.code]
                    )?.img
                  )
                "
              />
          </div>
        </div>
      </div>

      <div v-if="isAvailableCalculated" class="form">
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
              <option v-for="type in types" :value="type.Code">
                {{ type.Name }}
              </option>
            </select>
          </label>
        </div>
        <div class="form-content">
          <label v-if="isSquare" class="form-label">
            <span>Площадь, <small>м</small><sup>2</sup></span>
            <input type="number" inputmode="decimal" v-model="square" />
          </label>
          <template v-else>
            <label class="form-label">
              <span>Длина, <small>мм</small></span>
              <input type="number" inputmode="decimal" v-model="length" />
            </label>
            <label class="form-label">
              <span>Высота (Ширина), <small>мм</small></span>
              <input type="number" inputmode="decimal" v-model="height" />
            </label>
          </template>
        </div>
        <button class="form-button" @click="calculate">Расчет</button>
      </div>
    </div>

    <div class="right">
      <div class="description">
        <template v-if="!selectedBrandParams[BrandParamPossibleCode.Model]">
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
            :selectedArticuls="selectedArticuls"
            :on-change="changeArticul(row.id)"
          />
        </table>
        <span style="color: #ff9009"
          >Внимание !!!<br />Представленные в таблице расчеты материалов
          производятся по коэффициентам и имеют приближенный характер.</span
        >
      </div>
    </div>
  </div>
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
import { BrandParamPossibleCode } from "../../../../types";

const store = useStore();
const route = useRoute();
const router = useRouter();

const brandParams = ref([]);
const selectedBrandParams = ref({});
const isLoadingParams = ref(false);

const selectedColorImage = computed(() => {
  return brandParams.value
    .find(({ code }) => code === BrandParamPossibleCode.Color)
    ?.list?.find(
      ({ code }) =>
        code === selectedBrandParams.value[BrandParamPossibleCode.Color]
    )?.img;
});

const types = ref([]);

const isAvailableCalculated = computed(() => types.value.length > 0);
const isAllBrandParamsSelected = computed(() => {
  if (isLoadingParams.value) {
    return false;
  }

  const paramsCount = brandParams.value.length;
  const selectedParamsCount = Object.values(selectedBrandParams.value).filter(
    Boolean
  ).length;

  return selectedParamsCount >= paramsCount;
});

const exportExcelLink = ref(constructionsApi.exportExcelUrl(route.params.id));

const isSquare = ref(true);
const square = ref("");
const length = ref("");
const height = ref("");
const type = ref();

const openChartDialog = ref(false);

const calculationsTableColumns = ref([]);
const calculationsTableRows = ref([]);

const chartResponse = ref(null);

const handleOpenChartDialog = () => {
  openChartDialog.value = true;
};

const handleCloseChartDialog = () => {
  openChartDialog.value = false;
};

const selectedArticuls = ref([]);

const selectBrandParam = async (event) => {
  if (event.target.name === BrandParamPossibleCode.Model) {
    selectedBrandParams.value = { [event.target.name]: event.target.value };
  } else {
    selectedBrandParams.value[event.target.name] = event.target.value;
  }

  await replaceLocation();

  fetchBrandInitial();
};

const selectImageBrandParam = (name) => async (value) => {
  if (name === BrandParamPossibleCode.Model) {
    selectedBrandParams.value = { [name]: value.code };
  } else {
    selectedBrandParams.value[name] = value.code;
  }

  await replaceLocation();

  fetchBrandInitial();
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
  type.value = null;
};

const validateForm = () => {
  if (isSquare.value) {
    return square.value != null && square.value !== "";
  } else {
    return (
      length.value != null &&
      length.value !== "" &&
      height.value != null &&
      height.value !== ""
    );
  }
};

const calculate = async (isInitial = true) => {
  if (!validateForm()) {
    return;
  }

  if (!(isAvailableCalculated.value && isAllBrandParamsSelected.value)) {
    return;
  }

  await replaceLocation();

  try {
    const response = await constructionsApi.constructionsCalculate(
      route.params.id,
      getLocationParams()
    );

    calculationsTableColumns.value = response.data.data.columns.filter(
      ({ id }) => id !== "code"
    );
    calculationsTableRows.value = response.data.data.rows;

    selectedArticuls.value = calculationsTableRows.value.map(
      ({ items }) => items[0]?.code
    );

    await replaceLocation();

    updateExcelLink();
  } catch {}
};

const updateExcelLink = () => {
  const urlSearchParams = new URLSearchParams(getLocationParams());

  selectedArticuls.value.forEach((articul) => {
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
  selectedArticuls.value = calculationsTableRows.value.map(
    ({ items }) => items[0]?.code
  );

  calculate(false);
};

const selectElement = computed(() =>
  store.getters["selectAcousticCategories"].find(
    ({ ShortName }) => ShortName === route.params.id
  )
);

const modelImages = () => {
  const selectedModelCode =
    selectedBrandParams.value[BrandParamPossibleCode.Model];
  const selectedModel = brandParams.value
    .find(({ code }) => code === BrandParamPossibleCode.Model)
    ?.list.find(({ code }) => code === selectedModelCode);

  if (selectedModel) {
    return [filesApi.getImageFileUrl(selectedModel.img)];
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

const fetchBrandInitial = async () => {
  isLoadingParams.value = true;

  const response = await modelsApi.getBrandParams(
    route.params.id,
    Object.entries(route.query).reduce((accumulate, [key, value]) => {
      if (typeof value === "string") {
        return { ...accumulate, [key]: value };
      }

      return accumulate;
    }, {})
  );

  brandParams.value = response.data.data;
  isLoadingParams.value = false;

  let isAutoSelectedParams = false;

  response.data.data.forEach(({ code, list }) => {
    const value = route.query[code];
    const hasValue = list.find(({ code }) => code === value);

    if (hasValue) {
      if (value) {
        selectedBrandParams.value[code] = value;
      } else if (list.length === 1 && selectedBrandParams.value[code] == null) {
        selectedBrandParams.value[code] = list[0]?.code;

        isAutoSelectedParams = true;
      }
    } else {
      selectedBrandParams.value[code] = undefined;
    }
  });

  square.value = route.query.square;
  length.value = route.query.length;
  height.value = route.query.height;

  if (route.query.type) {
    type.value = route.query.type;
  }

  if (square.value == null && (length.value != null || height.value != null)) {
    isSquare.value = false;
  }

  if (isAllBrandParamsSelected.value) {
    await getCalculationTypes();
  } else {
    types.value = [];
    type.value = null;
  }

  await calculate();

  if (isAutoSelectedParams) {
    await replaceLocation();

    fetchBrandInitial();
  }
};

const getCalculationTypes = async () => {
  try {
    const response = await constructionsApi.getPrecalcParams(
      route.params.id,
      getLocationParams()
    );

    const responseTypes = response.data.data.SurfacesTypes ?? [];

    if (responseTypes.length === 0) {
      throw new Error("Not available for calculate");
    }

    types.value = responseTypes;
    type.value = responseTypes[0].Code;
  } catch {
    types.value = [];
    type.value = null;
  }
};

const selectedModelDescription = () => {
  return brandParams.value
    .find(({ code }) => code === BrandParamPossibleCode.Model)
    ?.list?.find(
      ({ code }) =>
        code === selectedBrandParams.value[BrandParamPossibleCode.Model]
    )?.description;
};

const getBrandParams = () => {
  let query = {};

  Object.entries(selectedBrandParams.value).forEach(([key, value]) => {
    query[key] = value;
  });

  return query;
};

const getLocationParams = () => {
  let query = getBrandParams();

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

  let articuls = selectedArticuls.value;

  if (articuls.length > 0) {
    query.articuls = articuls;
  }

  return query;
};

const replaceLocation = async () => {
  await router.replace({
    path: router.options.history.location,
    query: getLocationParams(),
  });
};

const breadcrumbs = () => {
  return [
    { link: "/acoustic", title: "⟪⟪ |" },
    { link: "/acoustic/brands", title: "БРЕНДЫ" },
    { title: selectElement.value?.Name },
  ];
};

fetchBrandInitial();
fetchChart();

watch(
  () => route.params.id,
  () => {
    fetchBrandInitial();
    fetchChart();
  }
);

watch(selectedArticuls, updateExcelLink);

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
};
</script>

<style scoped>
.selects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 4px;
}

.selects-grid > :first-child {
  grid-column: 1 / span 2;
}

.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 16px;
  gap: 8px;
  box-shadow: var(--form-box-shadow);
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
  color: var(--form-toggle-color);
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
  width: 100%;
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
  object-fit: cover;
  width: 98%;
  margin-top: 10px;
  background-color: var(--add-image-background);
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
  background: radial-gradient(circle at right, #f9f9fa00, #8e9092);
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
  color: var(--select-descript-color);
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

.colorsizes {
  display: flex;
  justify-content: space-between;
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
}
</style>
