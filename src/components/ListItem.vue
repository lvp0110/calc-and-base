<template>
    <div class="d-grid gap-2">
        <button class="btn btn-outline-secondary item"  @click="toggleIsSubitemsVisible">
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

<style scoped>
.item {
    margin-bottom: 1px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
    transition: all .4s;

}
.item:hover {
    background: radial-gradient(circle at center, #6c757d, #bdbfc2);
    transition: all .4s;
}
.list-group a {
    background: radial-gradient(circle at center, #c7ced4, #f9f9fa00);
    transition: all .4s;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}
.list-group a:hover {
    background: radial-gradient(circle at left, #6c757d, #bdbfc2);
    transition: all .4s;
    color: aliceblue;
}
@media screen and ( min-width: 768px) {
  .item {
    width: 310px;
  }
  .list-group a {
    width: 310px;
  }
}
</style>