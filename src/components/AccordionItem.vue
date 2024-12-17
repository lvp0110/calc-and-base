<template>
  <RouterLink :to="path === to ? '/' : to" class="button">
    <h5 class="h5">{{ header }}</h5>
    <img v-if="src" class="icon" :src="src" alt="image" />
    <span v-if="description" class="text">{{ description }} </span>
  </RouterLink>
  <section class="section" v-if="path === to">
    <slot />
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const { header, src, description, to } = defineProps([
  "header",
  "description",
  "src",
  "to",
]);

const route = useRoute();

const path = computed(() => route.path);
</script>

<style scoped>
.icon {
  position: absolute;
  width: 100px;
  right: 1%;
  padding-bottom: 6px;
}

.h5 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  width: 18%;
}

.button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 10px 0px;
  font-size: 1.3rem;
  color: #fff;
  text-align: left;
  background: linear-gradient(
    to right,
    rgba(10, 115, 160, 0.9),
    rgb(87, 177, 218)
  ); /* rgba(73, 77, 78,.5) #8992998c*/
  border: 0;
  overflow-anchor: none;
  border-radius: 10px;
  height: 100px;
  margin-top: 8px;
  box-shadow: 2px -3px 5px 1px rgb(167, 163, 163);
  text-decoration: none;
  transition: height 0.5s;
}

.button:active {
  background: linear-gradient(to left, rgb(23, 125, 169), rgb(87, 177, 218));
  box-shadow: 0px -2px 3px 0px rgb(167, 163, 163);
}

.section {
  padding: 16px;
}

.section a {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
  transition: all 0.4s;
}

.section a:hover {
  background: radial-gradient(circle at center, #6c757d, #bdbfc2);
  transition: all 0.4s;
}
.text {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.1s ease-in-out, opacity 0.1s ease-in-out;
}
@media screen and (min-width: 1024px) {
  .icon {
    position: relative;
    width: 100px;
    left: 10px;
    margin-right: 10px;
  }
  .button {
    width: 100%;
    height: 18%;
    background: linear-gradient(
    to right,
    rgba(10, 115, 160, 0.9),
    rgba(78, 139, 154, 0.829)
  ); /* rgba(73, 77, 78,.5) #899299fa*/
  }
  .h5 {
    width: 300px;
  }
  .text {
    display: flex;
    width: 100%;
    height: 80%;
    text-align: left;
    align-items: center;
    font-weight: 100;
    font-size: 17px;
    text-transform: uppercase;
    color: white;
    opacity: 1;
    max-height: 200px;
    transition: max-height 0.9s ease-in-out, opacity 0.9s ease-in-out;
    border-left: 1px solid #fff;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 8px;
  }
}
</style>
