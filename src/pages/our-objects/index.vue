<template>
  <div>
    <MainPageLayout :breadcrumbs="breadcrumbs" :hiddenSearch="true" />
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <span class="navbar-filter">ФИЛЬТР</span>
      </div>
    </nav>
    <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
      <div class="select-descript-wrapper">
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
      </div>
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
      <div v-for="(item, index) in filteredObjects" :key="index" class="gallery-item">
        <div>
          <RouterLink :to="`/our-objects/${item.Code}`">
            <img :src="filesApi.getImageFileUrl(item.Cover)" alt="" role="button" />
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
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { filesApi } from '../../config';
import MainPageLayout from '../../components/Layouts/MainPageLayout.vue'

const store = useStore()

const nameModel = ref(null)
const locationModel = ref(null)

store.dispatch('getObjects')

const objects = computed(() => store.getters.selectObjects)

const names = computed(() => objects.value?.filter(({ Location }) => locationModel.value ? Location === locationModel.value : true).map(({ Name }) => Name))
const locations = computed(() => objects.value?.filter(({ Name }) => nameModel.value ? Name === nameModel.value : true).map(({ Location }) => Location))

const filteredObjects = computed(() => {
  if (nameModel.value || locationModel.value) {
    return objects.value?.filter(({ Name, Location }) => Name === nameModel.value || Location === locationModel.value)
  }

  return objects.value
})

const breadcrumbs = [
  { link: '/', title: "НАШИ ОБЪЕКТЫ" },
]

</script>

<!-- <script>
import { RouterLink } from 'vue-router';
import Dialog from '../../components/Dialog.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedAddress: null,
      selectedMaterials: null,
    };
  },
  components: {
    Dialog,
  },
  computed: {
    ...mapGetters(['selectAcousticCategories', 'selectImages']),
    // Сгенерируем динамический список материалов, зависящий от выбранного адреса
    dynamicMaterials() {
      if (!this.selectedAddress) {
        return this.uniqueMaterials;
      }
      const addressImages = this.selectImages.filter(image => image.text === this.selectedAddress);
      const materials = addressImages.flatMap(image =>
        image.images.flatMap(img =>
          Object.values(img.usedmaterials).flatMap(mat => Object.values(mat)).filter(Boolean)
        )
      );
      return Array.from(new Set(materials));
    },
    // Сгенерируем динамический список адресов, зависящий от выбранного материала
    dynamicAddresses() {
      if (!this.selectedMaterials) {
        return this.uniqueAddresses;
      }
      const materialImages = this.selectImages.filter(image =>
        image.images.some(img =>
          Object.values(img.usedmaterials).flatMap(mat => Object.values(mat)).includes(this.selectedMaterials)
        )
      );
      return Array.from(new Set(materialImages.map(image => image.text)));
    },
    uniqueMaterials() {
      const materials = this.selectImages.flatMap(image =>
        image.images.flatMap(img =>
          Object.values(img.usedmaterials).flatMap(mat => Object.values(mat)).filter(Boolean)
        )
      );
      return Array.from(new Set(materials));
    },
    uniqueAddresses() {
      return Array.from(new Set(this.selectImages.map(image => image.text)));
    },
    filteredImages() {
      return this.selectImages.filter(image => {
        const matchesAddress = this.selectedAddress ? image.text === this.selectedAddress : true;
        const matchesMaterial = this.selectedMaterials ? 
          image.images.some(img => 
            Object.values(img.usedmaterials).flatMap(mat => Object.values(mat)).includes(this.selectedMaterials)
          ) 
          : true;
        return matchesAddress && matchesMaterial;
      });
    },
  },
  methods: {
    selectAddress(event) {
      this.selectedAddress = event.target.value;
      this.selectedMaterials = null;
    },
    selectMaterials(event) {
      this.selectedMaterials = event.target.value;
      this.selectedAddress = null;
    },
    openDialog(image) {
      // Functionality to open dialog
    },
    hideDiv() {
      this.selectedElement = null;
      this.isSoundInsulationVisible = false;
    },
  },
};
</script> -->

<style scoped>
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
  margin-top: 70px;
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
