<template>
    <RouterLink to="/">
        <img src="../public/logo_123.png" alt="" class="logo">
    </RouterLink>
    <div>
        <RouterView />
    </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('getMaterials')
    this.$store.dispatch('getMaterialsAc')
    this.$store.dispatch('getMaterialsVi')
    this.$store.dispatch('getMaterialsWithCerts')
    this.$store.dispatch('getAcousticCategories') 
    this.$store.dispatch('getTechCards')
    
  }
}
</script>