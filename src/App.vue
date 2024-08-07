<template>
  <!-- <div class="go-to-calc">
    <RouterLink class="btn" to="/calc">
      <img class="calc-block-image" src="/calc.png" frameborder="0" width="50px">
    </RouterLink>
  </div> -->
  <div>
    <VoiceSearch />
    <Menu />
  </div>

  <RouterView />
</template>

<script setup>
import VoiceSearch from "./components/VoiceSearch.vue";
import Menu from "./components/Menu.vue";
</script>

<style scoped>
.go-to-calc {
  opacity: 0.7;
  position: absolute;
  top: 5px;
  right: 30px;
}
</style>
