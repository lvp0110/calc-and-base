<template>
<AccordionItem header="ЗВУКОИЗОЛЯЦИЯ" name="soundproof" :open="opened === 'soundproof'" :onToggle="onToggle"
src="https://db.acoustic.ru:3005/api/v1/constr/soundproof.svg" >
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
            МАТЕРИАЛЫ
            </RouterLink>
        </li>
    </ul>
</AccordionItem>

<AccordionItem header="АКУСТИКА" name="acoustic" :open="opened === 'acoustic'" :onToggle="onToggle" src="https://db.acoustic.ru:3005/api/v1/constr/acoustic.svg">
    <ul class="list_sound">
        <li>
            <RouterLink to="/acoustic/brands">
              АКУСТИКА ПО БРЕНДАМ
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/acoustic/materials">
              МАТЕРИАЛЫ
            </RouterLink>
        </li>
    </ul>
</AccordionItem>

<AccordionItem header="ВИБРОИЗОЛЯЦИЯ" name="vibration_isolation" :open="opened === 'vibration_isolation'" :onToggle="onToggle" src="https://db.acoustic.ru:3005/api/v1/constr/vibroisolanion.svg">
    <ul class="list_sound">
        <li>
            <RouterLink to="/vibration_isolation/materials">
              МАТЕРИАЛЫ
            </RouterLink>
        </li>
    </ul>
</AccordionItem>

<AccordionItem header="ДОКУМЕНТЫ" name="documents" :open="opened === 'documents'" :onToggle="onToggle" src="https://db.acoustic.ru:3005/api/v1/constr/documents.svg" >
    <ul class="list_sound">
        <li>
            <RouterLink to="/documents/certificates">
              СЕРТИФИКАТЫ
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/documents/air">
              АЛЬБОМЫ ИНЖЕНЕРНЫХ РЕШЕНИЙ
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/documents/techcard">
              ТЕХ.КАРТЫ
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/documents/hookup">
              МОНТАЖНЫЕ СХЕМЫ
            </RouterLink>
        </li>
    </ul>
</AccordionItem>

<RouterLink to="/our-objects">
  <AccordionItem header="НАШИ ОБЪЕКТЫ" src="https://db.acoustic.ru:3005/api/v1/constr/object.svg" />
</RouterLink>

</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import AccordionItem from "./AccordionItem.vue";

const store = useStore()

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
ul li{
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
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
@media screen and ( min-width: 768px) {
  ul li a {
    width: 310px;
  }
  .object {
    width: 310px;
  }
}

</style>