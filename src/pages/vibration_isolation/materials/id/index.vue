<template>
  <MainPageLayout :breadcrumbs="breadcrumbs" />
  <SidebarLayout :hasContent="selectElement">
    <template #sidebar>
      <List :items="selectMaterials" to="/vibration_isolation/materials" />
    </template>
    <template #content>
      <p class="title-materials">{{ selectElement.Description }}</p>
      <hr />
      <div class="image-descript">
        <img
          class="img"
          :src="
            'https://db.acoustic.ru:3005/api/v1/constr/' + selectElement.Img
          "
          alt="wwwww"
        />
        <div class="list-block">
          <ul class="ul-descript">
            <!-- <li v-if="selectElement.Length != 0">Длина: {{ selectElement.Length }} мм</li>
                    <li v-if="selectElement.Width != 0"> Ширина: {{ selectElement.Width }} мм</li>
                    <li v-if="selectElement.Height != 0">Толщина: {{ selectElement.Height }} мм</li> -->
            <li>Номенклатура:</li>
            <li v-if="selectElement.Volume != 'неопределен'">
              {{ selectElement.Volume }}
            </li>
            <li v-if="selectElement.Weight != 'неопределен'">
              {{ selectElement.Weight }}
            </li>
            <li>Минимальная резонансная частота: 11,4 Гц</li>
            <li>Габариты: 98х50х46 мм</li>
            <li>Присоединительная резьба: М8, М10</li>
            <li>Производство: 2-3 дня в Домодедово</li>

            <li>Аpтикул: {{ selectElement.Code }}</li>

            <label for="">Документы:</label>
            <li>
              <a
                href="http://localhost:5173/documents/certificates/hanger"
                style="
                  color: aliceblue;
                  text-decoration: none;
                "
                > <img
                src="https://db.acoustic.ru:3005/api/v1/constr/i_pdf.svg"
                alt=""
                style="width: 30px;margin-right: 10px;"
              />Cертификаты</a
              >
            </li>
            <li>
              <a
                href="http://localhost:5173/documents/certificates/hanger"
                style="
                  color: aliceblue;
                  text-decoration: none;
                "
                > <img
                src="https://db.acoustic.ru:3005/api/v1/constr/i_pdf.svg"
                alt=""
                style="width: 30px;margin-right: 10px;"
              />Тех.лист</a
              >
            </li>
            <li>
              <a
              href="http://localhost:5173/documents/air/%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B9.%D0%92%D0%B8%D0%B1%D1%80%D0%BE%D0%B8%D0%B7%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F%20%D0%B8%D0%BD%D0%B6%D0%B5%D0%BD%D0%B5%D1%80%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%B1%D0%BE%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F"
                style="
                  color: aliceblue;
                  text-decoration: none;
                "
                > <img
                src="https://db.acoustic.ru:3005/api/v1/constr/i_pdf.svg"
                alt=""
                style="width: 30px;margin-right: 10px;"
              />Каталог решений</a
              >
            </li>
          </ul>
        </div>
      </div>

      <hr />
      <span
        >Подвесы тип 1 монтируются к перекрытию через два отверстия с помощью
        анкер-гвоздей диаметром 6 мм, а оборудование подвешивается к ним
        посредством шпильки с резьбой М8 (М10)</span
      >
      <hr />
      <!-- <span>{{ selectElement.Specification }}</span> -->
      <span
        >Более подробную информацию уточняйте у отдела “Виброизоляция” (Марусев
        Юрий, Шуйков Алексей, Крюков Даниил)</span
      >
    </template>
  </SidebarLayout>
</template>

<script setup>
import MainPageLayout from "../../../../components/Layouts/MainPageLayout.vue";
import List from "../../../../components/List/List.vue";
import SidebarLayout from "../../../../components/Layouts/SidebarLayout.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

store.dispatch("getMaterialsVi");

const selectMaterials = computed(() => store.getters["selectMaterialsVi"]);
const selectElement = computed(() =>
  store.getters["selectMaterialsVi"].find(
    ({ Code }) => Code === route.params.id
  )
);
const breadcrumbs = computed(() => {
  const breadcrumbs = [
    { link: "/vibration_isolation", title: "..." },
    { link: "/vibration_isolation/materials", title: "МАТЕРИАЛЫ" },
  ];

  if (route.params.id) {
    breadcrumbs.push({ title: route.params.id });
  }

  return breadcrumbs;
});
</script>

<style scoped>
.list-block {
  width: 100%;
  margin-left: 10px;
}
.image-descript {
  display: flex;
}
ul li {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  margin-top: 5px;
  padding-left: 10px;
}
ul {
  margin-top: 15px;
  width: 100%;
}
.span1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  display: none;
}

.span2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}
.img {
  width: 100%;
}
.title-materials {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  width: 100%;
  background: radial-gradient(circle at center, #8992998c, #d7dadf62);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
@media screen and (min-width: 768px) {
  .img {
    width: 50%;
    height: 100%;
  }
}
@media screen and (max-width: 1024px) {
  .image-descript {
    display: block;
  }
  .list-block {
    width: 100%;
    margin-left: -12px;
  }
  .img {
    width: 100%;
  }
  ul {
    width: 100%;
  }
  .span1 {
    display: inline-flex;
    width: 50%;
    position: absolute;
    margin-left: 15px;
    margin-top: -5px;
    font-size: 15.5px;
  }
  .span2 {
    display: none;
  }
}
</style>
