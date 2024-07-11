<template>
  
  <div class="go-to-calc">
    <RouterLink class="btn" to="/calc">
      <img class="calc-block-image" src="/calc.png" frameborder="0" width="50px">
    </RouterLink>
  </div>
  <div class="sc accordion-flush" id="accordionFlushExample">
    <VoiceSearch />

    <AccordionItem accordionId="flush-headingOne" parentId="accordionFlushExample" header="ЗВУКОИЗОЛЯЦИЯ">
      <ListItem name="КОНСТРУКЦИИ" to="/soundproof/constructions" :items="selectAllIsolationConstrSound" :onOpen="getAllIsolationConstr" />
      <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/soundproof/materials" :items="selectMaterials" />
    </AccordionItem>

    <AccordionItem accordionId="flush-headingTwo" parentId="accordionFlushExample" header="АКУСТИКА">
      <ListItem name="АКУСТИКА ПО БРЕНДАМ" to="/acoustic/brands" :items="selectAcousticCategories" />
      <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/acoustic/materials" :items="selectMaterialsAc" />
    </AccordionItem>

    <AccordionItem accordionId="flush-headingThree" parentId="accordionFlushExample" header="ВИБРОИЗОЛЯЦИЯ">
      <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/vibration_isolation/materials" :items="selectMaterialsVi" />
    </AccordionItem>

    <AccordionItem accordionId="flush-headingFour" parentId="accordionFlushExample" header="ДОКУМЕНТЫ">
      <ListItem name="СЕРТИФИКАТЫ" to="/documents/certificates" :items="selectMaterialsWithCerts" />
      <ListItem name="ТЕХ.КАРТЫ" to="/documents/techcard" :items="selectMaterialsWithTechCards" />
      <ListItem name="МОНТАЖНЫЕ СХЕМЫ" to="/documents/hookup" :items="selectBrandsInstalSchemas" />
      <ListItem name="ПРОТОКОЛЫ" to="/documents/protocol" />
      <ListItem name="BIM" to="/documents/bim"  />
      <ListItem name="АЛЬБОМЫ ИНЖЕНЕРНЫХ РЕШЕНИЙ" to="/documents/air" :items="selectMaterialsWithCerts" />
    </AccordionItem>

    <AccordionItem accordionId="flush-headingFive" parentId="accordionFlushExample" header="НАШИ ОБЪЕКТЫ">
      <OurObjects />
    </AccordionItem>

  </div>

  <RouterView />

</template>

<script>

import { mapGetters } from 'vuex'

import VoiceSearch from "./components/VoiceSearch.vue";
import OurObjects from "./components/OurObjects.vue";
import AccordionItem from "./components/AccordionItem.vue";
import ListItem from "./components/ListItem.vue";

export default {
  components: {
    VoiceSearch,
    AccordionItem,
    ListItem,
    OurObjects,
  },
  computed: mapGetters([
    'selectAllIsolationConstrSound', 
    'selectMaterials', 
    'selectMaterialsAc', 
    'selectMaterialsVi', 
    'selectAllIsolationConstrAcoustic', 
    'selectMaterialsWithCerts',
    'selectAcousticCategories',
    'selectMaterialsWithTechCards',
    'selectBrandsInstalSchemas'
  ]),
  methods: {
    getAllIsolationConstr() {
      this.$store.dispatch('getAllIsolationConstr')
    }
  }
}
</script>

<style>
.go-to-calc {
  opacity: 0.7;
  position: absolute;
  top: 5px;
  right: 30px;
}

hr {
  filter: drop-shadow(1px 3px 1px);
  background: #000;
  width: 100%;
  margin-top: 25px;
}

.accordion-header {
  background: rgb(241, 237, 237);
}

.accordion-flush .accordion-item .accordion-button {
  border-radius: 10px;
  height: 110px;
  margin-top: 5px;
  box-shadow: 1px -3px 5px 1px rgb(167, 163, 163);
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
  font-weight: 600;

}

.accordion-button:not(.collapsed) {
  color: white;
  background-color: rgb(80, 159, 190);

}

.accordion-body {
  background: url(/dBase/font1.png);
  border: solid 1px darkgray;
  margin-top: 6px;
  box-shadow: 1px -3px 5px 1px rgb(167, 163, 163);
  border-radius: 5px;
  
}

.list-group-item {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: none;
}

.accordion-item:last-of-type .accordion-button.collapsed {
  border-radius: 10px;
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
