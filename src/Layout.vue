<template>
    <RouterLink to="/">
        <img src="../logo_123.png" alt="" class="logo">
    </RouterLink>
    <div>
        <RouterView />
    </div>
</template>
<script>
export default {
  created() {
    // this.$store.dispatch('getAllIsolationConstr')
    this.$store.dispatch('getMaterials')
    this.$store.dispatch('getMaterialsWithCerts')
    this.$store.dispatch('getAcousticCategories')
  }
}
</script>