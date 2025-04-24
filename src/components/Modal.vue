<template>
  <div v-if="open" class="backdrop" @click="handleBackdropClick">
    <div class="dialog" @click.stop>
      <div class="title">
        <button @click="onClose" class="close-button">&#x2715;</button>
      </div>
      <div class="content">
        <form v-if="!isHiddenForm" @submit.prevent="handleSubmit">
          <div>
            <label for="username">username</label>
          </div>
          <div>
            <input type="text" id="username" v-model="form.username" required />
          </div>
          <div>
            <label for="password">password</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
            />
          </div>
          <button type="submit" class="submit-button">✓</button>
        </form>
        <slot />
      </div>
      <!-- <div style="z-index: 1111; position: absolute; top: 500px;left: 20px;">
        <ThemeSwitcher />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from "vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

const props = defineProps({
  open: Boolean,
  isHiddenForm: Boolean,
});

const emit = defineEmits(["close", "submit"]);

const form = reactive({
  username: "",
  password: "",
});

const onClose = () => emit("close");

const handleBackdropClick = () => {
  onClose();
};

const handleSubmit = () => {
  if (form.username && form.password) {
    console.log("Регистрация:", form);
    emit("submit", { ...form });
  }
};
</script>

<style scoped>
.close-button {
  font-size: 30px;
  border: 1px solid rgb(221, 217, 217);
  width: 50px;
  color: rgb(221, 217, 217);
  border-radius: 50%;
  background: none;
  cursor: pointer;
}

.submit-button {
  margin-top: 12px;
  padding: 4px 10px;
  border: 1px solid rgb(221, 217, 217);
  border-radius: 20%;
  background-color: rgba(211, 211, 211, 0.3);
  cursor: pointer;
  color: rgb(221, 217, 217);
}

.backdrop {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  position: fixed;
  inset: 0;
  z-index: 999;
}

.dialog {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(12, 124, 171, 0.97),
    rgba(70, 126, 140, 0.95)
  );
  display: flex;
  flex-direction: column;
  z-index: 1000;
  color: black;
}

.title {
  padding: 8px 8px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.content {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

form div {
  margin-bottom: 4px;
  color: rgb(221, 217, 217);
  background-color: rgba(211, 211, 211, 0.3);
  height: 29px;
}
label {
  padding-left: 6px;
  font-weight: 200;
}
input {
  width: 50%;
  border-radius: 5px;
  border: 1px solid rgb(221, 217, 217);
  background-color: rgba(211, 211, 211, 0.3);
  color: rgb(239, 237, 237);
}
@media screen and (min-width: 1024px) {
  .dialog {
    border-radius: 8px;
    inset: 16px;
  }
  .backdrop {
    width: 50%;
  }
}
</style>
