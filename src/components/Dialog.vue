<template>

    <div class="col-11 information-block">
        <RouterLink :to="backLink || '/'" class="btn close-btn">
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
const getScrollbarSize = () =>
  Math.abs(window.innerWidth - document.documentElement.clientWidth);

const disableBodyScroll = () => {
  const scrollbarSize = getScrollbarSize();

  document.body.style.setProperty("padding-right", `${scrollbarSize}px`);
  document.body.style.setProperty("overflow", "hidden");
  document.body.style.setProperty("touch-action", "none");
  document.body.style.setProperty("-ms-touch-action", "none");
};

const enableBodyScroll = () => {
  document.body.style.removeProperty("padding-right");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("touch-action");
  document.body.style.removeProperty("-ms-touch-action");
};

export default {
    props: {
        backLink: String
    },
    created() {
        disableBodyScroll()
    },
    unmounted() {
        enableBodyScroll()
    }
}

</script>

<style >
.btn.close-btn {
    position: absolute;
    z-index: 45422;
    top: 0;
    right: 0;
}

.img {
    width: 100%;
}

.information-block {
    width: 100%;
    background-color: rgb(241, 241, 241);
    padding: 10px;
    z-index: 5;
    inset: 0;
    position: fixed;
    border: solid 3px rgb(187, 180, 180);
    overflow: auto;
    height: 100%;
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
    overflow: hidden;
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
        flex-shrink: 0;
    }

    
}
</style>