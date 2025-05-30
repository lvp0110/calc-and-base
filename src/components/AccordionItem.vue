<template>
  <RouterLink :to="path === to ? '/' : to" class="button">
    <div class="icon">
      <h5 class="h5">{{ header }}</h5>
      <img v-if="src" :src="src" alt="image" />
      <span v-if="description" class="text">{{ description }}</span>
    </div>
  </RouterLink>
  <section class="section" v-if="path === to">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.text }}</li>
    </ul>
    <slot />
  </section>
</template>


<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const { header, src, description, to, items } = defineProps([
  "header",
  "description",
  "src",
  "to",
  "items"
]);

const route = useRoute();
const path = computed(() => route.path);
</script>

<style scoped>
html, body, #app {
  height: 100%;
}
.button {
  flex: 1 1 0;
  min-width: 100px;
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  margin: 2px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px 0px;
  background: linear-gradient(
    to right,
    rgba(10, 115, 160, 0.8),
    rgba(78, 139, 154, 0.829)
  );

  text-decoration: none;
  color: #fff;
  transition: background 0.5s;
  font-size: clamp(14px, 2vw, 22px);
}

.section {
  /* height: auto; — по умолчанию */
  overflow-y: hidden;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.h5 {
  flex: 1 1 0;
  margin-right: 10px;
  font-size: 1em;
  font-weight: 100;
}

.icon img {
  flex: 0 0 auto;
  object-fit: contain;
  max-width: 5em;
  max-height: 5em;
  margin-bottom: 12px;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 80%;
  text-align: left;
  font-weight: 100;
  font-size: .55em;
  text-transform: uppercase;
  color: white;
  opacity: 1;
  max-height: 200px;
  transition: max-height 0.9s ease-in-out, opacity 0.9s ease-in-out;
  border-left: 1px solid #fff;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
}

@media screen and (max-width: 1024px){
  .text {
    display: none;
  }
  
}


</style>
