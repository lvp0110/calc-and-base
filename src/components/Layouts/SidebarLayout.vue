<template>
  <div class="page">
    <div :class="{ sidebar: true, sidebar__hidden: hasContent }">
      <slot name="sidebar"></slot>
    </div>
    <div
      v-if="hasContent"
      :class="{ content: true, content__hidden: !hasContent }"
    >
    <div class="inner">
      <slot name="content"></slot>
    </div>
    </div>
  </div>
</template>

<script setup>
const { hasContent } = defineProps(["hasContent"]);
</script>

<style scoped>
.page {
  display: flex;
  flex-grow: 1;
  gap: 16px;
  overflow: hidden;
}

.sidebar {
  overflow-y: auto;
  width: 100%;
}

.content {
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;
}

.sidebar__hidden {
  display: none;
}

.content__hidden {
  display: none;
}

@media screen and (min-width: 768px) {
  .sidebar {
    min-width: 300px;
    width: 300px;
  }

  .sidebar__hidden {
    display: block;
  }

  .content__hidden {
    display: block;
  }
}
</style>
