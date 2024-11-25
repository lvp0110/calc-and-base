<template>
  <section class="section">
    <div v-if="title" class="section-header">
      <img v-if="image" class="section-image" :src="image" alt="" />
      <h6 class="section-title">{{ title }}</h6>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </section>
</template>

<script setup>
const { title, image } = defineProps(["title", "image"]);
</script>

<style scoped>
.section {
  position: relative;
  padding-right: 5px;
}

.section:nth-child(-n + 2)::after {
  border: none;
}

.section::after {
  content: "";
  position: absolute;
  top: 0;
  right: auto;
  width: 0;
  height: 0;
  border-left: 2px solid rgb(32, 145, 197);
  transition: height 0.5s, bottom 0.5s, right 0.5s, widht 0.5s;
}

.section:hover::after {
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
}

.section-image {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: rgb(32, 145, 197);
  color: white;
}

.section-title {
  margin: 0;
  font-family: "Montserrat", sans-serif;
}

.section-content {
  padding: 10px;
  color: gray;
  transition: background-color 0.3s, transform 0.3s, color 0.3s;
}
.section:hover .section-content {
  /* transform: scale(1.04);  */
  color: black;
  background: radial-gradient(#c7ced4, rgba(249, 249, 250, 0));
  /* padding-left: 16px; */
}
</style>
