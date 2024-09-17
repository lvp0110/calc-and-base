<template>
    <div class="page">
        <div :class="{ sidebar: true, sidebar__hidden: hasContent }">
            <slot name="sidebar"></slot>
        </div>
        <div v-if="hasContent" :class="{ content: true, content__hidden: !hasContent }">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
const { hasContent } = defineProps(['hasContent'])
</script>

<style scoped>
.page {
    display: flex;
    overflow: hidden;
    height: 100%;
    gap: 16px;
}

.sidebar {
    width: 100%;
}

.content {
    overflow: hidden;
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