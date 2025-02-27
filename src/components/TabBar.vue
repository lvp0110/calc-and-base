<template>
  <div class="tabbar">
    <ul class="list">
      <li>
        <RouterLink to="/">
          <img
            class="logo_w"
            :src="filesApi.getImageFileUrl(`logo_1234.png`)"
            alt=""
          />
        </RouterLink>
      </li>
      <li>
        <img
          class="logo_p"
          :src="filesApi.getImageFileUrl(`person_logo.png`)"
          alt=""
          @click="openDialog"
        />
      </li>
      <li>
        <button style="border: none; background: none">
          <img
            class="logo_p"
            :src="filesApi.getImageFileUrl(`search_logo.png`)"
            alt=""
            @click="handleSearch"
          />
        </button>
      </li>
      <li>
        <RouterLink to="/calc">
          <img
            class="calc"
            :src="filesApi.getImageFileUrl(`calc.svg`)"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
  </div>

  <Modal
    :open="showDialog"
    @close="closeDialog"
    @submit="submitForm"
    :isHiddenForm="isAuthorized"
  >
    <div v-if="isAuthorized">
      <span style="text-decoration: none; font-size: 25px; color: azure"
        >Vasya Poupkin</span
      >
      <img
        class="logo_p"
        :src="filesApi.getImageFileUrl(`person_logo.png`)"
        alt=""
        @click="openDialog"
      />

      <ul class="person-list">
        <li>
          <RouterLink to="/profilecalc"> Your calculations </RouterLink>
        </li>
        <li>
          <RouterLink to="/profilefoto"> Your photos </RouterLink>
        </li>
        <li>
          <RouterLink to="/profiledoc"> Your documents </RouterLink>
        </li>
      </ul>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { filesApi } from "../config";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Modal from "./Modal.vue";

const router = useRouter();
const store = useStore();
const showDialog = ref(false);

const isAuthorized = computed(() => store.getters["isAuthorizedSelector"]);

watch(router.currentRoute, () => {
  closeDialog();
});

const openDialog = () => {
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
};

const submitForm = (form) => {
  console.log("submitForm", form);

  store.dispatch("login", form);
};

const handleSearch = () => {
  store.commit("setIsOpenStore", true);
  document.getElementById("result_voice")?.focus();
};
</script>

<style scoped>
.person-list li{
  color: azure;
  text-decoration: none;
  margin-top: 55px;
  font-size: 20px;
}
.person-list a{
  color: azure;
  text-decoration: none;
}

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
  opacity: 0.9;
}

@media (prefers-color-scheme: dark) {
  .tabbar {
    opacity: 0.8;
    background: radial-gradient(
      circle at top,
      rgba(10, 115, 160, 0.9),
      rgba(78, 139, 154, 0.829)
    );
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
