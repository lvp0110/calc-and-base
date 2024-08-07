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
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(36, 140, 185);
  border: 0;
  overflow-anchor: none;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;
  font-weight: 500;
  border-radius: 10px;
  height: 100px;
  margin-top: 5px;
  box-shadow: 1px -3px 5px 1px rgb(167, 163, 163);
}

.section {
  padding: 16px;
}
</style>
