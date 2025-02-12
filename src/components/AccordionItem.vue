<template>
  <RouterLink :to="path === to ? '/' : to" class="button">
    <h5 class="h5">{{ header }}</h5>
    <img v-if="src" class="icon" :src="src" alt="image" />
    <span v-if="description" class="text"> {{ description }} </span>
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
    rgba(10, 115, 160, 0.8),
    rgba(78, 139, 154, 0.829)
  );
  border: 0;
  overflow-anchor: none;
  border-radius: 10px;
  height: 25%;
  margin-top: 8px;
  box-shadow: 2px -3px 5px 1px rgb(139, 138, 138);
  text-decoration: none;
  transition: height 0.5s;
  opacity: 1;
}

.button:active {
  background: linear-gradient(to left, rgb(23, 125, 169), rgb(87, 177, 218));
  box-shadow: 0px -2px 3px 0px rgb(167, 163, 163);
}

.section {
  padding: 16px;
}

@media (prefers-color-scheme: dark) {
  .section {
    color: white;
    background: radial-gradient(circle at center, #c7ced464, #f9f9fa01);
  }
  .button {
    opacity: 0.8;
  }
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

@media screen and (min-width: 1024px) and (min-height: 700px) {
  .icon {
    position: relative;
    width: 100px;
    left: 10px;
    margin-right: 10px;
  }
  .button {
    width: 100%;
    height: 25%;
    background: linear-gradient(
      to right,
      rgba(10, 115, 160, 0.9),
      rgba(78, 139, 154, 0.829)
    );
  }
  button:active {
    background: linear-gradient(to left, rgb(23, 125, 169), rgb(87, 177, 218));
    box-shadow: 0px -2px 3px 0px rgb(167, 163, 163);
  }
  .h5 {
    width: 300px;
  }
}

@media screen and (max-height: 700px) {
  .button {
    min-height: 80px;
    margin-top: 4px;
  }
  .icon {
    width: 80px;
  }
}

.text {
  display: none;
}

@media screen and (min-width: 1024px) and (min-height: 700px) {
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
    text-align: left;
    font-weight: 100;
    font-size: 13px;
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
