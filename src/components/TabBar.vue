<template>
    <div class="tabbar">
        <ui class="list">
            <li>
                <RouterLink to="/">main</RouterLink>
            </li>
            <li>
                <RouterLink to="/calc"><img src="/calc.svg" alt=""></RouterLink>
            </li>
        </ui>
    </div>
</template>

<script setup>
</script>

<style scoped>
img {
    width: 50px;
}
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(36, 140, 185);
    height: 75px;
    padding: 10px;
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

@media screen and (min-width: 700px) {
    .tabbar {
        height: auto;
        top: 0;
        width: 75px;
    }

    .list {
        flex-direction: column;
        justify-content: flex-start;
    }
}
</style>