<template>
  <VoiceSearch />
  <div class="go-to-calc">
    <RouterLink class="btn" to="/calc">
      <img class="calc-block-image" src="/Acufon_NG/calc.png" frameborder="0" width="50px">
      <!-- <H6>КАЛЬКУЛЯТОР</H6> -->
    </RouterLink>
  </div>
  <div class="sc accordion-flush" id="accordionFlushExample">

    <AccordionItem accordionId="flush-headingOne" parentId="accordionFlushExample" header="ЗВУКОИЗОЛЯЦИЯ">
      <!-- <VoiceSearch /> -->
      <ListItem name="КОНСТРУКЦИИ" to="/soundproof/constructions" :items="selectAllIsolationConstrSound" :onOpen="getAllIsolationConstr" />
      <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/soundproof/materials" :items="selectMaterials" />
    </AccordionItem>

    <AccordionItem accordionId="flush-headingTwo" parentId="accordionFlushExample" header="АКУСТИКА">
      <!-- <VoiceSearch /> -->
      <AcousticMaterial />
      <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/soundproof/materials" :items="selectMaterials" />
      <!-- <SoundproofMaterial /> -->
    </AccordionItem>

    <AccordionItem accordionId="flush-headingThree" parentId="accordionFlushExample" header="ВИБРОИЗОЛЯЦИЯ">
      <!-- <VoiceSearch /> -->
      <!-- <SoundproofMaterial /> -->
      <ListItem name="СПИСОК МАТЕРИАЛОВ" to="/soundproof/materials" :items="selectMaterials" />
    </AccordionItem>

    <AccordionItem accordionId="flush-headingFour" parentId="accordionFlushExample" header="ДОКУМЕНТЫ">
      <!-- <VoiceSearch /> -->
      <ListItem name="СЕРТИФИКАТЫ" to="/documents/certificates" :items="selectMaterialsWithCerts" />
      <ListItem name="ТЕХ.КАРТЫ" to="/documents/techcard" :items="selectMaterialsWithCerts" />
      <ListItem name="МОНТАЖНЫЕ СХЕМЫ" to="/documents/hookup" :items="selectMaterialsWithCerts" />
    </AccordionItem>

    <AccordionItem accordionId="flush-headingFive" parentId="accordionFlushExample" header="НАШИ ОБЪЕКТЫ">
      <!-- <VoiceSearch /> -->
      <!-- <OurObjects /> -->
      <TestObject />
    </AccordionItem>

  </div>

  <RouterView />

</template>

<script>

import { mapGetters } from 'vuex'

import VoiceSearch from "./components/VoiceSearch.vue";
import OurObjects from "./components/OurObjects.vue";
import TestObject from "./components/TestObject.vue";
import AccordionItem from "./components/AccordionItem.vue";
import AcousticMaterial from "./components/AcousticMaterial.vue";
import SoundproofMaterial from "./old-components/SoundproofMaterial.vue";

import ListItem from "./components/ListItem.vue";

export default {
  components: {
    AcousticMaterial,
    VoiceSearch,
    OurObjects,
    TestObject,
    AccordionItem,
    ListItem,
    SoundproofMaterial
  },
  computed: mapGetters(['selectAllIsolationConstrSound', 'selectMaterials', 'selectAllIsolationConstrAcoustic', 'selectMaterials', 'selectMaterialsWithCerts']),
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

.svg-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.svg-button:hover {
  opacity: 0.8;
}

.coll-11 {
  filter: drop-shadow(2px 4px 6px gray);
}

.btn-registration {
  position: absolute;
  top: 2%;
  right: 9%;
}

hr {
  filter: drop-shadow(1px 2px 1px);
  background: #000;
  width: 95%;
}

.calc {
  text-decoration: none;
  color: white;
}

.calc:hover {
  color: white;
}

.btn {
  border-radius: 8px;
}

.accordion-header {
  background: rgb(241, 237, 237);
}

.accordion-flush .accordion-item .accordion-button {
  border-radius: 15px;
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
  border-radius: 15px;
}

.accordion-flush {
  width: 90%;
  margin-left: 5%;
}

@media screen and (min-width: 1120px) {
  .accordion-flush {
    width: 30%;
    margin-left: 1%;
  }
}
</style>
