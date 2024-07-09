<template>
    <div class="d-grid gap-2">
        <button class="btn btn-outline-secondary" style="margin-bottom: 1px;" @click="toggleIsSubitemsVisible">
            {{ name }}
        </button>
    </div>

    <div class="list-group" v-show="isSubitemsVisible">
        <RouterLink v-for="elem in items ?? []"
                :key="elem.Code || elem.ShortName || elem.Name"
                :to="`${to}/${elem.Code || elem.ShortName || elem.Name}`"
                type="button"
                class="list-group-item list-group-item-action" 
                aria-current="true">
            {{elem.Name}}
        </RouterLink>
    </div>
</template> 

<script>
export default {
    props: {
        name: String,
        items: [Object],
        to: String,
        onOpen: Function
    },
    data() {
        return {
            isSubitemsVisible: false,
            selectedElement: null,
            selectedElementTop: 0,
        }
    },
    methods: {
        toggleIsSubitemsVisible() {
            this.isSubitemsVisible = !this.isSubitemsVisible;

            if (this.isSubitemsVisible) {
                this.$props.onOpen?.()
            }
        },
        addDiv(elem) {
            this.selectedElement = elem;
        },
        hideDiv() {
            this.selectedElement = null;
        }
    }
}
</script>