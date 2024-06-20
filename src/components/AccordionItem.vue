<template>
    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#${accordionId}`">
          <h5>{{ header }}</h5>
        </button>
      </div>
      <div :id="accordionId" class="accordion-collapse collapse" :data-bs-parent="`#${parentId}`">
        <section class="accordion-body">
          <slot />
        </section>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    accordionId: String,
    parentId: String,
    header: String
  }
}
</script>

<style>

</style>
