<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List
        :items="selectAllIsolationConstrSound"
        to="/soundproof/constructions"
      />
    </template>
    <template #content>
      <div class="title-construction">{{ selectElement.Description }}</div>

      <div class="image-descript">
        <div class="image-block">
          <img
            class="img1"
            :class="{ active: isActive1 }"
            :src="filesApi.getImageFileUrl(selectElement.Img)"
            @click="toggleActive('img1')"
          />
          <img
            class="img2"
            :class="{ active: isActive2 }"
            :src="filesApi.getImageFileUrl(selectElement.CadImg)"
            @click="toggleActive('img2')"
          />
          <ul class="ul-descript">
            <li v-if="selectElement.SoundIndex != 'неопределен'">
              Индекс звукоизоляции воздушного шума, Rw =
              {{ selectElement.SoundIndex }} дБ.
            </li>
            <li v-if="selectElement.ImpactNoseIndex != 0">
              Индекс звукоизоляции ударного шума, Lnw =
              {{ selectElement.ImpactNoseIndex }} дБ.
            </li>
            <li>Толщина: {{ selectElement.Thickness }} мм.</li>
          </ul>
        </div>
        <p>Состав конструкции:</p>
        <ul class="ul-descript">
          <li v-for="material in materials">
            <RouterLink :to="`/soundproof/materials/${material.code}`">
              {{ material.name }}<span class="ellipses">...</span> </RouterLink
            ><span class="ellipses">...</span>
          </li>
        </ul>
      </div>

      <p class="span">{{ selectElement.Specification }}</p>
      <hr />
      <RouterLink
        :to="`/calc/${selectElement.Code}`"
        class="btn btn-outline-secondary calculate"
        >РАССЧИТАТЬ КОЛИЧЕСТВО МАТЕРИАЛОВ
      </RouterLink>
      <!-- --- -->
      <p>Размеры:</p>
      <label for="">ширина</label>
      <div class="size-constr">
        <input type="number" />
      </div>
      <label for="">длина</label>
      <div class="size-constr">
        <input type="number" />
      </div>

      <hr />
      <p>Параметры конструкции:</p>
      <ul>
        <label for="">шаг профиля</label>
        <li>600 <input type="radio" id="1" name="step" /></li>
        <li>400 <input type="radio" id="2" name="step" /></li>
        <li>300 <input type="radio" id="3" name="step" /></li>
        <hr />
        <li>сдвоенный профиль <input type="checkbox" /></li>
      </ul>
      <ul>
        <label for="">проемы</label>
        <li>
          дверь
          <input
            type="checkbox"
            id="1"
            name="opening"
            v-model="doorCheckBoxChecked"
          />
        </li>
        <ul v-if="doorCheckBoxChecked">
          <li v-for="(dooropening, index) in dooropenings" :key="index">
            <input type="number" v-model="dooropening.width" />
            <input type="number" v-model="dooropening.height" />
            <button class="btn btn-outline-light" @click="addDoorOpening">
              +
            </button>
            <button class="btn" @click="removeDoorOpening(index)">-</button>
          </li>
        </ul>
        <li>
          окно
          <input
            type="checkbox"
            id="1"
            name="opening"
            v-model="windowCheckBoxChecked"
          />
        </li>
        <ul v-if="windowCheckBoxChecked">
          <li v-for="(windowopening, index) in windowopenings" :key="index">
            <input type="number" v-model="windowopening.width" />
            <input type="number" v-model="windowopening.height" />
            <button class="btn" @click="addWindowOpening">+</button>
            <button class="btn" @click="removeWindowOpening(index)">-</button>
          </li>
        </ul>
      </ul>
      <table class="table table-bordered" style="color: aliceblue;">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <!-- --- -->
    </template>
  </SidebarLayout>
</template>

<script setup>
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import List from "../../../../components/List/List.vue";
import { filesApi } from "../../../../config";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, watch, onMounted } from "vue";
import { constructionsApi } from "../../../../config";

const store = useStore();
const route = useRoute();

const doorCheckBoxChecked = ref(false);
const windowCheckBoxChecked = ref(false);

const dooropenings = ref([{ width: null, height: null }]);
const windowopenings = ref([{ width: null, height: null }]);

function addDoorOpening() {
  dooropenings.value.push({ width: null, height: null });
}
function addWindowOpening() {
  windowopenings.value.push({ width: null, height: null });
}

function removeDoorOpening(index) {
  if (index !== 0) {
    dooropenings.value.splice(index, 1);
  }
}
function removeWindowOpening(index) {
  if (index !== 0) {
    windowopenings.value.splice(index, 1);
  }
}

const materials = ref([]);

store.dispatch("getAllIsolationConstr");

const selectAllIsolationConstrSound = computed(
  () => store.getters["selectAllIsolationConstrSound"]
);
const selectElement = computed(() =>
  store.getters["selectAllIsolationConstrSound"].find(
    ({ Code }) => Code === route.params.id
  )
);

const fetchMaterials = async () => {
  try {
    if (!route.params.id) {
      return;
    }

    const response = await constructionsApi.materialsList(route.params.id);

    materials.value = response.data.data;
  } catch {}
};

watch(() => route.params.id, fetchMaterials);
onMounted(fetchMaterials);

const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/soundproof", title: "..." },
    { link: "/soundproof/constructions", title: "КОНСТРУКЦИИ" },
  ];

  if (route.params.id) {
    breadcrumbs.push({ title: route.params.id });
  }

  return breadcrumbs;
});

const isActive1 = ref(false);
const isActive2 = ref(false);

function toggleActive(img) {
  if (img === "img1") {
    isActive1.value = !isActive1.value;
  } else if (img === "img2") {
    isActive2.value = !isActive2.value;
  }
}
</script>

<style scoped>
* {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}
.span {
  padding-right: 10px;
}
.image-block {
  display: flex;
  margin-bottom: 20px;
}
.btn {
  color: white;
}
ul li {
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  margin-top: 5px;
  padding-right: 10px;
  padding-left: 10px;
}

.ellipses {
  display: none;
  font-weight: 500;
}

a {
  text-decoration: none;
  color: var(--link-text);
}
a:hover {
  color: var(--link-text-hover);
}
a:hover + .ellipses {
  display: inline-block;
  text-decoration: none;
}

.span {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

.ul-descript {
  margin-top: 15px;
}

.title-construction {
  width: 100%;
  text-transform: uppercase;
  border-radius: 5px;
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  padding: 10px;
  text-align: center;
}

.title-construction:hover {
  background: radial-gradient(circle at center, #d7dadf62, #8992998c);
}

.calculate {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background: radial-gradient(circle at center, #d7dadf62, #8992998c);
}

.calculate:hover {
  background: radial-gradient(circle at center, #19191a62, #9fa4a88c);
}

.image-descript {
  border-top: solid 1px rgba(128, 128, 128, 0.738);
  border-bottom: solid 1px rgba(128, 128, 128, 0.738);
  margin: 15px 0px 5px 0px;
  padding: 15px 0px 0px 0px;
}

.img1,
.img2 {
  width: 50%;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.img1.active {
  transform: translateX(50%) translateY(50%) scale(2);
  border-radius: 3px;
}
.img2.active {
  transform: translateX(-50%) translateY(50%) scale(2);
  border-radius: 3px;
}
@media screen and (max-width: 1024px) {
  .image-block {
    display: block;
  }
}
@media screen and (min-width: 1024px) {
  .img1,
  .img2 {
    flex-grow: 1;
    width: 25%;
  }

  .img1.active {
    transform: translateX(50%) translateY(50%) scale(2);
  }
  .img2.active {
    transform: translateX(-50%) translateY(50%) scale(2);
  }
}
</style>
