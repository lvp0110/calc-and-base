<template>
    <div class="tabbar">
        <ui class="list">
            <li>
                <RouterLink to="/"><img class="logo_w" src="/logo_1234.png" alt=""></RouterLink>
            </li>
            <li>
                <RouterLink to="/calc"><img class="calc" src="/calc.svg" alt=""></RouterLink>
            </li>
        </ui>
    </div>
</template>

<script setup>
</script>

<style scoped>
.logo_w {
    width: 70px;
    opacity: 0;
}
.calc {
    width: 50px;
}
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: radial-gradient(circle at top, rgb(10, 115, 160), rgb(72, 170, 215));
    height: 70px;
    padding: 8px;
    color: white;
}

.list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 8px;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

@media screen and (min-width: 500px) {
    .tabbar {
        height: auto;
        top: 0;
        width: 75px;
    }
    .logo_w {
        width: 70px;
        opacity: 1;
        transition: all 0.5s;
    }
    .list {
        flex-direction: column;
        justify-content: flex-start;
    }
}
</style>