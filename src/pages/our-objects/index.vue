<template>
  <div class="content">
    <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />
    <!-- <nav class="navbar navbar-light bg-light">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <span class="navbar-filter">ФИЛЬТР</span>
      </div>
    </nav> -->

    <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
      <div
        v-for="filter in filters"
        :key="filter.key"
        class="select-descript-wrapper"
      >
        <select
          class="form-select select-descript"
          aria-label="Default select example"
          :name="filter.key"
          :value="appliedFilters[filter.key]"
          @change="applyFilter"
        >
          <option disabled value="null">{{ filter.name }}</option>
          <option
            v-for="value in filter.values"
            :key="value.value"
            :value="value.value"
          >
            {{ value.name }}
          </option>
        </select>
      </div>
      <!-- <div class="select-descript-wrapper">
        <select class="form-select select-descript" aria-label="Default select example" v-model="nameModel">
          <option disabled value="null">НАЗВАНИЕ</option>
          <option v-for="(name, index) in names" :key="index" :value="name">
            {{ name }}
          </option>
        </select>
      </div>
      <div class="select-descript-wrapper">
        <select class="form-select select-descript" aria-label="Default select example" v-model="locationModel">
          <option disabled value="null">АДРЕС</option>
          <option v-for="(address, index) in locations" :key="index" :value="address">
            {{ address }}
          </option>
        </select>
      </div> -->
      <!-- <div class="select-descript-wrapper">
        <select class="form-select select-descript" aria-label="Default select example" @change="selectMaterials">
          <option selected disabled>МАТЕРИАЛЫ</option>
          <option v-for="(material, index) in dynamicMaterials" :key="index" :value="material">
            {{ material }}
          </option>
        </select>
      </div>
     <div class="select-descript-wrapper">
        <select class="form-select select-descript" aria-label="Default select example">
          <option selected disabled>ДАТА</option>
        </select>
      </div>
      <div class="select-descript-wrapper">
        <select class="form-select select-descript" aria-label="Default select example">
          <option selected disabled>ЗАКАЗЧИК</option>
        </select>
      </div> -->
    </div>
    <!-- <div class="list-group" v-show="isSoundInsulationVisible">
      <button v-for="elem in selectAcousticCategories" :key="elem.Code" type="button"
        class="list-group-item list-group-item-action" aria-current="true" @click="addDiv(elem)">
        {{ elem.Name }}
      </button>
    </div> -->
    <div class="gallery">
      <div
        v-for="(item, index) in filteredObjects"
        :key="index"
        class="gallery-item"
      >
        <div>
          <RouterLink :to="`/our-objects/${item.Code}`">
            <img
              :src="filesApi.getImageFileUrl(item.Cover)"
              alt=""
              role="button"
            />
          </RouterLink>
        </div>
        <div class="image-text-object">
          {{ item.Name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { filesApi } from "../../config";
import MainPageLayout from "../../components/Layouts/MainPageLayout.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const filters = ref([
  {
    key: "materials",
    name: "Материалы",
    values: [
      {
        name: "Материал 1",
        value: "material_1",
        count: 10,
      },
      {
        name: "Материал 2",
        value: "material_2",
        count: 4,
      },
    ],
  },
  {
    key: "cities",
    name: "Города",
    values: [
      {
        name: "Город 1",
        value: "city_1",
      },
      {
        name: "Город 2",
        value: "sity_2",
      },
    ],
  },
]);
const appliedFilters = computed(() => route.query);

const nameModel = ref(null);
const locationModel = ref(null);

const applyFilter = (event) => {
  const newAppliedFilters = {
    ...appliedFilters.value,
    [event.target.name]: event.target.value,
  };

  router.push({ path: route.path, query: newAppliedFilters });
};

store.dispatch("getObjects");

const objects = computed(() => store.getters.selectObjects);

const names = computed(() =>
  objects.value
    ?.filter(({ Location }) =>
      locationModel.value ? Location === locationModel.value : true
    )
    .map(({ Name }) => Name)
);
const locations = computed(() =>
  objects.value
    ?.filter(({ Name }) => (nameModel.value ? Name === nameModel.value : true))
    .map(({ Location }) => Location)
);

const filteredObjects = computed(() => {
  if (nameModel.value || locationModel.value) {
    return objects.value?.filter(
      ({ Name, Location }) =>
        Name === nameModel.value || Location === locationModel.value
    );
  }

  return objects.value;
});

const breadcrumbs = [{ link: "/", title: "НАШИ ОБЪЕКТЫ" }];
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
.select-descript-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.select-descript {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar {
  padding: 0;
  margin-top: 10px;
  border: solid 1px #6c757d;
  border-radius: 4px;
}

.navbar-toggler {
  border: none;
}

.navbar-filter {
  color: #6c757d;
}

.download-btn {
  margin-top: 15px;
  background-color: rgb(236, 230, 230);
  color: black;
  border: solid 1px gray;
  border-radius: 5px;
  cursor: pointer;
}

select {
  background-color: whitesmoke;
}

.image-text-object {
  position: relative;
  bottom: 30px;
  left: 0px;
  width: 100%;
  filter: drop-shadow(2px 1px 3px rgb(255, 254, 254));
  background: rgba(255, 253, 253, 0.5);
  color: black;
  padding: 3px 10px 3px 10px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
img {
  width: 100%;
}
.gallery-item {
  position: relative;
  margin-top: 10px;
  margin-bottom: -15px;
}

.gallery-item img {
  max-width: 100%;
}

@media screen and (min-width: 1024px) {
  .gallery-item {
    width: calc((100% - 30px) / 2);
  }
}
</style>
