<template>

  
  <RouterLink to = "/our-objects"
  class="btn btn-outline-secondary" 
  type="button" style="width: 100%;">ВСЕ ОБЪЕКТЫ</RouterLink>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <span class="navbar-filter">ФИЛЬТР</span>
    </div>
  </nav>
  <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
    <div class="bg-light p-4">
    <select class="form-select select-descript" 
            aria-label="Default select example" 
            v-model="selectedMaterial" 
            @change="addDiv(selectedMaterial)">
        <option selected >МАТЕРИАЛЫ</option>
        <option v-for="material in selectAcousticCategories" :key="material.Code" :value="material">
          {{ material.Name }}
        </option>
      </select> 
      <select class="form-select select-descript" aria-label="Default select example">
        <option selected>АДРЕС</option>

      </select>
      <select class="form-select select-descript" aria-label="Default select example">
        <option selected>НАЗНАЧЕНИЕ</option>

      </select>
      <select class="form-select select-descript" aria-label="Default select example">
        <option selected>ДАТА</option>
        >
      </select>
      <select class="form-select select-descript" aria-label="Default select example">
        <option selected>ЗАКАЗЧИК</option>

      </select>
    </div>
  </div>
  <div class="list-group" v-show="isSoundInsulationVisible">
    <button v-for="elem in selectAcousticCategories" :key="elem.Code" type="button"
      class="list-group-item list-group-item-action" aria-current="true" @click="addDiv(elem)">
      {{ elem.Name }}
    </button>
    <ListObjects v-if="selectedElement" :data="selectedElement" :info="infoData" @hide="hideDiv" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ListObjects from './ListObjects.vue';

import { API_PANELS_INFO_BY_BRAND, API_TESTSERVER } from '../config'

export default {
  components: {
    ListObjects
  },

  computed: {
    ...mapGetters(['selectAcousticCategories']),
  },
  data() {
    return {
      isSoundInsulationVisible: false,
      selectedMaterial: null,
      selectedElement: null,
      selectedElementTop: 0,
      infoData: null,
    }
  },
  methods: {
    // toggleSoundInsulation() {
    //   this.isSoundInsulationVisible = !this.isSoundInsulationVisible;
    // },
    async addDiv(elem) {
      if (!elem) return;

      let res = await fetch(`${API_TESTSERVER}/${API_PANELS_INFO_BY_BRAND}/${elem.Name}`)
      let resData = await res.json()

      console.log(resData)
      this.infoData = resData.data
      this.selectedElement = elem;
      this.isSoundInsulationVisible = true;

    },

    hideDiv() {
      this.selectedElement = null;
      this.isSoundInsulationVisible = false;
    }
  }
}

</script>

<style scoped>
.navbar {
  padding: 0;
  margin-top: 5px;
  border: solid 1px gray;
  border-radius: 4px;
}
.navbar-toggler {
  border: none;
  
}
.navbar-filter {
  color: #6c757d;
}
</style>