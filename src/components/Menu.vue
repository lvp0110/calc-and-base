<template>
    
  <div class="menu-container">
    <AccordionItem
      v-for="category in generalCategories"
      :header="category.name"
      :description="category.description"
      :src="filesApi.getImageFileUrl(category.img)"
      :to="`/${PathByCategory[category.type]}`"
    >
      <ul class="list_sound">
        <li v-for="subCategory in SubCategoriesByCategory[category.type]">
          <RouterLink
            :to="`/${PathByCategory[category.type]}/${subCategory.code}`"
          >
            {{ subCategory.name }}
          </RouterLink>
        </li>
      </ul>
    </AccordionItem>
  </div>
</template>

<script setup>
import AccordionItem from "./AccordionItem.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { SubCategoriesByCategory, PathByCategory } from "../types";
import { filesApi } from "../config";

const store = useStore();

const generalCategories = computed(() => store.getters["generalCategories"]);
</script>

<style scoped>
.menu-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

}
::-webkit-scrollbar {
  width: 0px;
}
a {
  text-decoration: none;
}
.object {
  width: 100%;
}
ul {
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}
ul li {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}
ul li a {
  color: var( --list-categogy-color);
  text-decoration: none;
  margin-bottom: 1px;
  border: solid 1px #6c757d;
  border-radius: 5px;
  padding: 6px;
  display: block;
  width: 100%;
  text-align: center;
  background:var(--list-categogy-background);
  transition: all 0.4s;
}

ul li a:hover {
  background: var(--list-categogy-background-hover);
  transition: all 0.4s;
  color: white;
  border: solid 1px rgb(173, 170, 170);
}

@media screen and (min-width: 1024px) {
  ul li a {
    width: auto;
    text-align: start;
  }
  .object {
    width: 310px;
  }
}

@media screen and (max-width: 370px) and (min-height: 700px) {
  .menu-container {
    overflow: hidden;
  }
}
</style>
