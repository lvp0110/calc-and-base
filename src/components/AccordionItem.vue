<template>
  <button :name="name" class="button" @click="toggle">
    <h5>{{ header }}</h5>
    <img v-if="src" class="icon" :src="src" alt="">
  </button>
  <section class="section" v-if="open">
    <slot />
  </section>
</template>

<script setup>
const { header, open, name, onToggle, src } = defineProps(['header', 'name', 'open', 'onToggle', 'src'])

const toggle = () => {
  onToggle(name)
}
</script>

<style scoped>
.icon {
  position: absolute;
  width: 100px;
  right: 1%;
  padding-bottom: 6px;
}

h5 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
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
  background: linear-gradient(to right, rgb(10, 115, 160), rgb(72, 170, 215));
  border: 0;
  overflow-anchor: none;
  border-radius: 10px;
  height: 100px;
  margin-top: 5px;
  box-shadow: 2px -3px 5px 1px rgb(167, 163, 163);
}

.button:active {
  background: linear-gradient(to left, rgb(23, 125, 169), rgb(87, 177, 218));
  box-shadow: 0px -2px 3px 0px rgb(167, 163, 163);
}

.section {
  padding: 16px;
}

.section a {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
  transition: all .4s;
}

.section a:hover {
  background: radial-gradient(circle at center, #6c757d, #bdbfc2);
  transition: all 0.4s;
}
@media screen and ( min-width: 768px) {
  .button {
    width: 340px;
  }
  
}
</style>
