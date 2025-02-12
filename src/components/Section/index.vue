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
  border-left: 2px solid rgba(10, 115, 160, 0.8);
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
  background: linear-gradient(
      to right,
      rgba(10, 115, 160, 0.8),
      rgba(78, 139, 154, 0.829)
    );
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
  z-index: 1111;
  position: relative;
}

.section:hover {
  color: black;
  background: radial-gradient(#e0e4e7, #ffffff8d);
}

@media (prefers-color-scheme: dark) {
  .section:hover {
    background: radial-gradient(#e0e4e72a, #ffffff2b);
  }
}
</style>
