<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="sections.length > 0">
    <template #sidebar>
      <List
        :items="filteredConstructions"
        keyPath="code"
        namePath="name"
        to="/soundproof/constructions"
      />
    </template>
    <template #content>
      <Sections :sections="sections" :enableCalc="true" />
    </template>
  </SidebarLayout>
</template>

<script setup>
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import Sections from "../../../../components/Sections/index.vue";
import { useRoute } from "vue-router";
import { computed, ref, watch, onMounted } from "vue";
import { isolationConstructionsApi } from "../../../../config";
import { useStore } from "vuex";
import { searchFilter } from "../../../../utils/search-filter";

const route = useRoute();
const store = useStore();

const constructions = ref([]);
const sections = ref([]);
const filteredConstructions = computed(() =>
  searchFilter(constructions.value, store.getters["selectSearchString"])
);

const fetchConstructions = async () => {
  const response = await isolationConstructionsApi.getIsolationConstructions();

  constructions.value = response.data.data ?? [];
};

const fetchSections = async (id) => {
  if (!id) {
    return;
  }

  try {
    const response =
      await isolationConstructionsApi.getIsolationConstructionProps(id);

    sections.value = response.data.data ?? [];
  } catch {}
};

watch(() => route.params.id, fetchSections);
onMounted(() => {
  fetchConstructions();
  fetchSections(route.params.id);
});

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/soundproof", title: " ⟪⟪ | " },
    { link: "/soundproof/constructions", title: "КОНСТРУКЦИИ" },
  ];

  if (route.params.id) {
    breadcrumbs.push({ title: route.params.id });
  }

  return breadcrumbs;
});
</script>

<style scoped>
* {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}
.show-hidden-list {
  font-size: large;
  color: var(--link-text);
  color: var(--link-text);
}
.span {
  padding-right: 10px;
}
.image-block {
  display: flex;
  margin-bottom: 20px;
}

ul li {
  background: radial-gradient(circle at left, #8992998c, #d7dadf62);
  margin-top: 5px;
  padding-right: 10px;
  padding-left: 10px;
}

.ellipses {
  display: none;
  font-weight: 500;
}

a {
  text-decoration: none;
  color: var(--link-text);
}
a:hover {
  color: var(--link-text-hover);
}
a:hover + .ellipses {
  display: inline-block;
  text-decoration: none;
}

.span {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

.ul-descript {
  margin-top: 15px;
}

.title-construction {
  width: 100%;
  text-transform: uppercase;
  border-radius: 5px;
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  padding: 10px;
  text-align: center;
}

.title-construction:hover {
  background: radial-gradient(circle at center, #d7dadf62, #8992998c);
}

.calculate {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background: radial-gradient(circle at center, #d7dadf62, #8992998c);
}

.calculate:hover {
  background: radial-gradient(circle at center, #19191a62, #9fa4a88c);
}

.image-descript {
  border-top: solid 1px rgba(128, 128, 128, 0.738);
  border-bottom: solid 1px rgba(128, 128, 128, 0.738);
  margin: 15px 0px 5px 0px;
  padding: 15px 0px 0px 0px;
}

.img1,
.img2 {
  width: 50%;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.img1.active {
  transform: translateX(50%) translateY(50%) scale(2);
  border-radius: 3px;
}
.img2.active {
  transform: translateX(-50%) translateY(50%) scale(2);
  border-radius: 3px;
}
@media screen and (max-width: 1024px) {
  .image-block {
    display: block;
  }
}
@media screen and (min-width: 1024px) {
  .img1,
  .img2 {
    flex-grow: 1;
    width: 25%;
  }

  .img1.active {
    transform: translateX(50%) translateY(50%) scale(2);
  }
  .img2.active {
    transform: translateX(-50%) translateY(50%) scale(2);
  }
}
</style>
