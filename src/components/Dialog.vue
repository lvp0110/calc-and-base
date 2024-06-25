<template>

    <div class="col-11 information-block" :style="{ top: position.y + 'px', left: position.x + 'px' }">
        <RouterLink to="/" class="btn close-btn">
            <svg height="50" width="50">
                <circle r="22" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="2" />
                <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3" />
                <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3" />
            </svg>
        </RouterLink>
        <slot />
    </div>
</template>

<script>
export default {
    data() {
        return {
            position: { x: 0, y: 75 },
            visible: false,
        }
    },
    methods: {
        setPosition(event) {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
        },
    }
}

</script>

<style>
.btn.close-btn {
    position: absolute;
    z-index: 454;
    top: 0;
    right: 0;
}

.img {
    width: 100%;
    height: 100%;
}

.information-block {
    width: 100%;
    background-color: rgb(241, 241, 241);
    padding: 10px;
    z-index: 5;
    position: fixed;
    border: solid 3px rgb(187, 180, 180);
    overflow: auto;
    max-height: 90%;
    filter: drop-shadow(2px 4px 6px gray);
    overflow-y: scroll;
}

@media screen and (min-width: 1124px) {
    .information-block {
        background-color: rgb(241, 241, 241);
        padding: 10px;
        z-index: 5;
        position: fixed;
        transition: all 1s;
        border: solid 1px darkgrey;
        margin-left: 33%;
        width: 65%;
        height: 85%;
        filter: drop-shadow(2px 4px 6px gray);
    }

}

.image-descript {
    display: flex;
}

.ul-descript {
    margin-left: 5px;
}

@media screen and (max-width: 800px) {
    .image-descript {
        display: block;
    }

    .ul-descript {
        margin-top: 5px;
    }

}
</style>