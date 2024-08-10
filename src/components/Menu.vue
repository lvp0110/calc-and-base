<template>
<AccordionItem header="ЗВУКОИЗОЛЯЦИЯ" name="soundproof" :open="opened === 'soundproof'" :onToggle="onToggle"
src="/волна.svg" >
    <!-- <ListItem name="КОНСТРУКЦИИ" to="/soundproof/constructions" :items="selectAllIsolationConstrSound" />
    <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/soundproof/materials" :items="selectMaterials" /> -->

    <ul class="list_sound">
        <li>
            <RouterLink to="/soundproof/constructions">
            КОНСТРУКЦИИ
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/soundproof/materials">
            СПИСОК МАТЕРИАЛОВ
            </RouterLink>
        </li>
    </ul>
</AccordionItem>

<AccordionItem header="АКУСТИКА" name="acoustic" :open="opened === 'acoustic'" :onToggle="onToggle" src="/волна и стена.svg">
    <ListItem name="АКУСТИКА ПО БРЕНДАМ" to="/acoustic/brands" :items="selectAcousticCategories" />
    <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/acoustic/materials" :items="selectMaterialsAc" />
</AccordionItem>

<AccordionItem header="ВИБРОИЗОЛЯЦИЯ" name="vibration_isolation" :open="opened === 'vibration_isolation'" :onToggle="onToggle" src="/пружина.svg">
    <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/vibration_isolation/materials" :items="selectMaterialsVi" />
</AccordionItem>

<AccordionItem header="ДОКУМЕНТЫ" name="documents" :open="opened === 'documents'" :onToggle="onToggle" src="public/файл.svg" >
    <ListItem name="СЕРТИФИКАТЫ" to="/documents/certificates" :items="selectMaterialsWithCerts" />
    <ListItem name="АЛЬБОМЫ ИНЖЕНЕРНЫХ РЕШЕНИЙ" to="/documents/air" :items="selectAlbums" />
    <ListItem name="ТЕХ.КАРТЫ" to="/documents/techcard" :items="selectMaterialsWithTechCards" />
    <ListItem name="МОНТАЖНЫЕ СХЕМЫ" to="/documents/hookup" :items="selectBrandsInstalSchemas" />
    <!-- <ListItem name="ПРОТОКОЛЫ" to="/documents/protocol" /
    <ListItem name="BIM" to="/documents/bim"  /> -->
</AccordionItem>

<AccordionItem header="НАШИ ОБЪЕКТЫ" name="our-objects" :open="opened === 'our-objects'" :onToggle="onToggle" src="public/зданиия.svg" >
  <RouterLink to="/our-objects" class="btn btn-outline-secondary" type="button" style="width: 100%;">
    ВСЕ ОБЪЕКТЫ
  </RouterLink>
</AccordionItem>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import AccordionItem from "./AccordionItem.vue";
import ListItem from "./ListItem.vue";

const store = useStore()
const selectAcousticCategories = computed(() => store.getters['selectAcousticCategories'])
const selectMaterialsAc = computed(() => store.getters['selectMaterialsAc'])
const selectAlbums = computed(() => store.getters['selectAlbums'])
const selectMaterialsWithTechCards = computed(() => store.getters['selectMaterialsWithTechCards'])
const selectBrandsInstalSchemas = computed(() => store.getters['selectBrandsInstalSchemas'])

const opened = ref()

const onToggle = (name) => {
  if (name === opened.value) {
    opened.value = undefined
  } else {
    opened.value = name
  }
}
</script>

<style scoped>

ul {
    list-style: none;
    padding: 0;
    margin-bottom: 0;
}
ul li{
  font-family: 'Montserrat', sans-serif;
  font-weight:300;
}
ul li a{ 
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
    transition: all .4s;
}

ul li a:hover {
    background: radial-gradient(circle at center, #6c757d, #bdbfc2);
    transition: all .4s;
    color: aliceblue;
    border: solid 1px rgb(173, 170, 170);

}

hr {
  filter: drop-shadow(1px 3px 1px);
  background: #000;
  width: 100%;
  margin-top: 25px;
}

.accordion-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 1.3rem;
  color: #fff;
  text-align: left;
  background-color: rgb(36, 140, 185);
  border: 0;
  overflow-anchor: none;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;
  border-radius: 10px;
  height: 110px;
  margin-top: 5px;
  box-shadow: 1px -3px 5px 1px rgb(167, 163, 163);
}

.accordion-button:not(.collapsed) {
  color: white;
  background-color: rgb(80, 159, 190);

}

.accordion-body {
  margin: 10px;
  padding: 0;
}


@media screen and (min-width: 1120px) {
  .accordion-flush {
    width: 30%;
  }
}

@media screen and (max-height: 720px) {
  .accordion-flush .accordion-item .accordion-button {
    border-radius: 10px;
    height: 75px;
    margin-top: 5px;
    box-shadow: 1px -3px 5px 1px rgb(167, 163, 163);
  }

}
</style>