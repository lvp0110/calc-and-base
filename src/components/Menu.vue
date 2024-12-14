<template>
  <AccordionItem
    header="ЗВУКОИЗОЛЯЦИЯ"
    to="/soundproof"
    src="https://db.acoustic.ru:3005/api/v1/constr/soundproof.svg"
  >
    <ul class="list_sound">
      <li>
        <RouterLink to="/soundproof/constructions"> КОНСТРУКЦИИ </RouterLink>
      </li>
      <li>
        <RouterLink to="/soundproof/materials"> МАТЕРИАЛЫ </RouterLink>
      </li>
    </ul>
  </AccordionItem>

  <AccordionItem
    header="АКУСТИКА"
    to="/acoustic"
    src="https://db.acoustic.ru:3005/api/v1/constr/acoustic.svg"
  >
    <ul class="list_sound">
      <li>
        <RouterLink to="/acoustic/brands"> АКУСТИКА ПО БРЕНДАМ </RouterLink>
      </li>
      <li>
        <RouterLink to="/acoustic/materials"> МАТЕРИАЛЫ </RouterLink>
      </li>
    </ul>
  </AccordionItem>

  <AccordionItem
    header="ВИБРОИЗОЛЯЦИЯ"
    to="/vibration_isolation"
    src="https://db.acoustic.ru:3005/api/v1/constr/vibroisolanion.svg"
  >
    <ul class="list_sound">
      <li>
        <RouterLink to="/vibration_isolation/materials"> МАТЕРИАЛЫ </RouterLink>
      </li>
    </ul>
  </AccordionItem>

  <AccordionItem
    header="ДОКУМЕНТЫ"
    to="/documents"
    src="https://db.acoustic.ru:3005/api/v1/constr/documents.svg"
  >
    <ul class="list_sound">
      <li>
        <RouterLink to="/documents/certificates"> СЕРТИФИКАТЫ </RouterLink>
      </li>
      <li>
        <RouterLink to="/documents/air">
          АЛЬБОМЫ ИНЖЕНЕРНЫХ РЕШЕНИЙ
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/documents/techcard"> ТЕХ.КАРТЫ </RouterLink>
      </li>
      <li>
        <RouterLink to="/documents/hookup"> МОНТАЖНЫЕ СХЕМЫ </RouterLink>
      </li>
    </ul>
  </AccordionItem>

  <AccordionItem
    header="НАШИ ОБЪЕКТЫ"
    to="/our-objects"
    src="https://db.acoustic.ru:3005/api/v1/constr/object.svg"
  />

  <AccordionItem v-for="category in generalCategories" 
    :header="category.name" 
    :description="category.description" 
    :src="category.img"
    :to="`/${category.type}`"
  >
    <ul class="list_sound">
      <li v-for="subCategory in SubCategoriesByCategory[category.type]">
        <RouterLink :to="`/${category.type}/${subCategory.code}`"> {{ subCategory.name }} </RouterLink>
      </li>
    </ul>
  </AccordionItem>
</template>

<script setup>
import AccordionItem from "./AccordionItem.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { SubCategoriesByCategory } from '../types'

const store = useStore();

const generalCategories = computed(() => store.getters["generalCategories"]);
</script>

<style scoped>
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
  color: #6c757d;
  text-decoration: none;
  margin-bottom: 1px;
  border: solid 1px #6c757d;
  border-radius: 5px;
  padding: 6px;
  display: block;
  width: 100%;
  text-align: center;
  background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
  transition: all 0.4s;
}

ul li a:hover {
  background: radial-gradient(circle at center, #6c757d, #bdbfc2);
  transition: all 0.4s;
  color: aliceblue;
  border: solid 1px rgb(173, 170, 170);
}
@media screen and (min-width: 1024px) {
  ul li a {
    width: 270px;
  }
  .object {
    width: 310px;
  }
}
</style>
