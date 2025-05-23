<template>
  <header class="header">
    <section v-for="(breadcrumb, index) in breadcrumbs" class="section">
      <h6 v-if="breadcrumb.link">
        <RouterLink :to="breadcrumb.link" class="back">
          {{ breadcrumb.title }}
        </RouterLink>
      </h6>
      <!-- <h6 v-else class="text">{{ breadcrumb.title }}</h6> -->
      <!-- <span v-if="breadcrumbs.length > index + 1" class="text">&nbsp;/</span> -->
    </section>
    <div class="block-button">
      <button type="button" class="btn_back" @click="goBack">⟪ |</button>
      <!-- ▷ -->
    </div>
  </header>

  <slot />
</template>

<script setup>
const { breadcrumbs } = defineProps(["breadcrumbs", "hiddenSearch"]);

import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.block-button {
  display: none;
  position: relative;
  /* left: 42px; */
  margin-bottom: 2px;
}

.btn_back {
    color: white;
    font-size: 20px;
    font-weight: 200;
    border: none;
    background: none;
    padding: 5px;
    /* transform: rotate(180deg); */
    transition: all 0.1s;
    margin-bottom: 8px;
}

.btn_back:active {
  font-weight: 400;
}

h6 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

.header {
  display: flex;
  align-items: center;
  gap: 2px;
  justify-content: flex-start;
  background: linear-gradient(
    to right,
    rgba(10, 115, 160, 0.8),
    rgba(78, 139, 154, 0.829)
  );
  color: white;
  height: 42px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 0px;
  padding-left: 5px;
  padding-top: 5px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.section {
  display: flex;
  align-items: baseline;

}
.section a {
  text-decoration: none;
  font-size: 18px;
  font-family: Verdana, Geneva, sans-serif;
}


.back {
  color: white;
  margin-top: -15px;
  font-size: 15px;
  padding: 5px;
  border-radius: 5px;
}

.text {
  font-size: 15px;
  border: solid 1px white;
  padding: 5px;
  border-radius: 5px;
}

@media screen and (min-width: 500px) {
  .block-button {
    display: block;
  }
  .header {
    gap: 2px;
  }
  
}
</style>
