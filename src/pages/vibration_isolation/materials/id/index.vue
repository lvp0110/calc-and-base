<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List :items="selectMaterials" to="/vibration_isolation/materials" />
    </template>
    <template #content>
      <Sections :sections="sections" />
      
    </template>
  </SidebarLayout>
</template>

<script setup>
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import List from "../../../../components/List/List.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import Sections from "../../../../components/Sections/index.vue";
import { computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { materialsApi } from "../../../../config";

const store = useStore();
const route = useRoute();

store.dispatch("getMaterialsVi");

const sections = ref([]);

const fetchSections = async () => {
  try {
    if (!route.params.id) {
      return;
    }

    const response = await materialsApi.getSections(route.params.id);

    sections.value = response.data.data;
  } catch {}
};

const selectMaterials = computed(() => store.getters["selectMaterialsVi"]);
const selectElement = computed(() =>
  store.getters["selectMaterialsVi"].find(
    ({ Code }) => Code === route.params.id
  )
);
const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/vibration_isolation", title: "..." },
    { link: "/vibration_isolation/materials", title: "МАТЕРИАЛЫ" },
  ];

  if (route.params.id) {
    breadcrumbs.push({ title: route.params.id });
  }

  return breadcrumbs;
});

onMounted(fetchSections);
watch(() => route.params.id, fetchSections);
</script>

<style scoped>
.list-block {
  width: 100%;
  margin-left: 10px;
}
.image-descript {
  display: flex;
}
ul li {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  margin-top: 5px;
  padding-left: 10px;
}
ul {
  margin-top: 15px;
  width: 100%;
}
.span1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  display: none;
}

.span2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}
.img {
  width: 100%;
}
.title-materials {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  width: 100%;
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
@media screen and (min-width: 768px) {
  .img {
    width: 50%;
    height: 100%;
  }
}
@media screen and (max-width: 1024px) {
  .image-descript {
    display: block;
  }
  .list-block {
    width: 100%;
    margin-left: -12px;
  }
  .img {
    width: 100%;
  }
  ul {
    width: 100%;
  }
  .span1 {
    display: inline-flex;
    width: 50%;
    position: absolute;
    margin-left: 15px;
    margin-top: -5px;
    font-size: 15.5px;
  }
  .span2 {
    display: none;
  }
}
</style>
