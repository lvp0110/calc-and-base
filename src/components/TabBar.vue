<template>
  <div class="tabbar">
    <ul class="list">
      <li>
        <RouterLink to="/"
          ><img class="logo_w" src="/logo_1234.png" alt=""
        /></RouterLink>
      </li>
      <li>
        <img
          class="logo_p"
          src="/person_logo.png"
          alt=""
          @click="dialogWindow"
        />
      </li>
      <li>
        <button style="border: none; background: none">
          <img
            class="logo_p"
            src="/search_logo.png"
            alt=""
            @click="handleSearch"
          />
        </button>
      </li>
      <li>
        <RouterLink to="/calc"
          ><img class="calc" src="/calc.svg" alt=""
        /></RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const handleSearch = () => {
  store.commit("setIsOpenStore", true);

  document.getElementById("result_voice")?.focus();
};
const dialogWindow = () => {
  alert('Раздел "ЛИЧНЫЙ КАБИНЕТ" находится в разработке 🛠');
};
</script>

<style scoped>
.logo_p {
  width: 55px;
  position: relative;
  left: 2px;
}

.logo_w {
  width: 70px;
  position: relative;
  left: 2px;
}

.logo_w:hover {
  opacity: 0.7;
}

.calc {
  width: 50px;
  transition: all 0.2s;
}

.calc:hover {
  opacity: 0.7;
}

.tabbar {
  z-index: 900;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: radial-gradient(
    circle at top,
    rgba(10, 115, 160, 0.9),
    rgb(72, 170, 215)
  );
  height: 70px;
  padding: 8px;
  color: white;
  opacity: .9;
}
@media (prefers-color-scheme: dark) {
  .tabbar {
    opacity: 0.8;
  }
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
    position: relative;
    transition: all 0.5s;
  }

  .list {
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
