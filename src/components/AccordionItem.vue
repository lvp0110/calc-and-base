<template>
    <button :name="name" class="button" @click="toggle">
      <h5>{{ header }}</h5>
    </button>
    <section class="section" v-if="open">
      <slot />
    </section>
</template>

<script setup>
const { header, open, name, onToggle } = defineProps(['header', 'name', 'open', 'onToggle'])

const toggle = () => {
  onToggle(name)
}
</script>

<style>
.button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.7rem 1rem;
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
</style>
