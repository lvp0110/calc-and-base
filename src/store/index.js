import { createStore } from "vuex";
import {
  materialsApi,
  albumsApi,
  constructionsApi,
  brandsApi,
  techCardApi,
  installSchemesApi,
  objectsApi,
  categoriesApi,
} from "../config";
import { MaterialUsage, ConstructionsUsage, Categories } from "../types";

export const MATERIALS = "Materials/si";
export const MATERIALS_AC = "Materials/ac";
export const MATERIALS_VI = "Materials/vi";

export const ALL_ISOLATION_CONSTR = "AllIsolationConstr";

export const MATERIALS_WITH_CERTS = "MaterialsWithCerts";

export const ACOUSTIC_CATEGORIES = "AcousticCategories";

export const ALBUMS = "albums";

export const TECHCARDS = "techCards";

export const BRANDS_INSTALL_SCHEMAS = "brandsWithInstallSchemas";

const dictionary = {
  bonacoustic: [
    "бон акустик",
    "bon акустик",
    "bone акустик",
    "bonn акустик",
    "bonne акустик",
    "бон acoustique",
    "bon acoustique",
    "boh акустик",
    "bone acoustique",
    "бон acustic",
    "бон accustic",
    "bon acustic",
    "bon accustic",
    "bonn acoustique",
    "bohn акустик",
    "bonne acoustique",
    "bonc акустик",
    "bone acustic",
    "bone accustic",
    "bonn acustic",
    "bonn accustic",
    "boh acoustique",
    "bonne acustic",
    "bonne accustic",
    "bona кустик",
    "bohn acoustique",
    "бона кустик",
    "бона костик",
    "бона акустик",
    "boh acustic",
    "боно кустик",
    "boh accustic",
  ],
  decoustic: [
    "the кустик",
    "да кустик",
    "де кустик",
    "the coustic",
    "the kustik",
    "the custic",
    "д кустик",
    "the acoustic",
    "ди кустик",
    "die кустик",
    "d кустик",
    "de кустик",
    "да coustic",
    "да kustik",
    "да custic",
    "di кустик",
    "the' кустик",
    "д coustic",
    "д kustik",
    "д custic",
    "ди coustic",
    "ди kustik",
    "ди custic",
    "die coustic",
    "die kustik",
    "die custic",
    "d coustic",
    "d kustik",
    "d custic",
    "de coustic",
    "de kustik",
    "да костик",
    "декостиль",
    "the costi",
    "the костик",
    "для костик",
    "где костик",
    "на костик",
  ],
  flexakustik: ["flex акустик", "комплекс акустик"],
  шуманет: ["шума нет", "шуманит"],
  шумопласт: ["шумопласт", "шум пласт"],
  саундлайн: ["sunlight", "soundline", "саундбар"],
  "АКУ-лайн": ["аквалайн", "эколайн"],
  акуфлор: ["аквафлор"],
  ультракустик: [
    "ультра акустик",
    "ultra acoustic",
    "ultra costica",
    "ultracast",
    "ultrace",
  ],
  isotop: ["изотоп"],
  зипс: ["лепс", "zips", "philips", "гипс", "deps"],
  "зипс-модуль": ["зипс модуль", "zip спектр"],
  "зипс-вектор": ["zips виктор", "zips модуль"],
  "зипс-III-Ультра": [
    "ultra",
    "zip 4 ultra",
    "zips 3 ultra",
    "зипс 3 ultra",
    "зипс 3 ультра",
  ],
  "зипс-синема": ["zips cinema", "zip cinema", "синема", "deep cinema"],
  "зипс-слим": ["zip slim", "zips slim", "zips модуль"],
  "зипс-z4": ["z4", "зипс z4", "zips led 4", "zips z4"],
  "саундлайн-пгп": ["sunlight пгп", "онлайн пгп"],
  "акуфлекс-супер": ["акуфлекс супер", "экофлекс супер", "аквафлекс супер"],
  "саундлайн-db": [
    "soundline db",
    "soundland дебил",
    "soundline дебил",
    "онлайн тв",
    "онлайн",
    "онлайн тебе",
    "на онлайн дебил",
    "онлайн дебил",
    "online db",
    "online тебе",
    "bandi б",
    "sunlight db",
    "sunlight дебил",
    "онлайн би-би-би",
    "онлайн би-би",
    "онлайн деби",
  ],
  виброфлекс: [
    "фильм рефлекс",
    "вибро",
    "микрофлекс",
    "еврофлекс",
    "гемофлекс",
    "neuralex",
    "nitraflex",
    "виброплит",
    "мимо",
    "мимо flex",
    "мим рефлекс",
    "nitraflex",
    "вибросепаратор",
    "гидрофлекс",
    "виброфлор",
    "membra",
    "ибупрофен",
    "профлекс",
    "вимос",
    "вибропласт",
    "vibrofix",
    "метрофлекс",
    "невролек",
    "виброрежим",
    "demographics",
    "мимо секс",
  ],
  "виброфлекс-к15": [
    "еврофлекс к15",
    "mibro к15",
    "к15",
    "к-15",
    "ак-15",
    "k15",
    "libros k15",
    "невроз к15",
    "терафлекс к15",
    "ибупрофен к15",
    "браслет f15",
    "профлекс к-15",
    "браслет 115",
    "профлекс k15",
    "15",
    "115",
  ],
};

export default createStore({
  state() {
    return {
      options: ["Name"],
      currentOption: "Name",
      searchText: "",
      voiceSearchText: "",
      isOpenSearch: false,
      generalCategories: [],
      labels: {
        locationPrefix: "Адрес :",
        contractorPrefix: "Заказчик :",
        designerPrefix: "Проектировщик :",
        progectOwnerPrefix: "Ген.подрядчик :",
        totalAreaPrefix: "Площадь :",
        completionYearPrefix: "Год :",
        performedWorksPrefix: "Выполненные работы :",
      },

      data: {
        [BRANDS_INSTALL_SCHEMAS]: [],
        [ALL_ISOLATION_CONSTR]: [],
        [MATERIALS]: [],
        [MATERIALS_AC]: [],
        [MATERIALS_VI]: [],
        [MATERIALS_WITH_CERTS]: [],
        [ACOUSTIC_CATEGORIES]: [],
        [TECHCARDS]: [],
        [ALBUMS]: [],
        objects: [],
      },
      user: null,
    };
  },

  mutations: {
    //methods
    updateVoiceSearchText(state, voiceText) {
      state.voiceSearchText = voiceText;
    },
    updateImagesData(state, images) {
      state.ImagesData = images;
    },
    setIsOpenStore(state, payload) {
      state.isOpenSearch = payload;
    },
  },
  actions: {
    login({ state }, payload) {
      console.log("login", payload);
      state.user = { name: payload.username };
    },
    logout({ state }) {
      state.user = null;
    },
    async getGeneralCategories({ state }) {
      const response = await categoriesApi.getGeneralCategories();

      state.generalCategories = response.data.data;
    },
    async getObjects({ state }) {
      const response = await objectsApi.getObjects();

      state.data.objects = response.data.data;
    },
    async getAlbums({ state }) {
      const response = await albumsApi.getAlbums();

      state.data[ALBUMS] = response.data.data;
    },
    async getAllIsolationConstr({ state }, payload) {
      const response = await constructionsApi.getConstructions(
        ConstructionsUsage.SoundIsolation
      );

      state.data[ALL_ISOLATION_CONSTR] = response.data.data;
    },

    async getMaterials({ state }, payload) {
      const response = await materialsApi.getMaterialsByCategory(
        Categories.Sound
      );

      console.log(response);

      state.data[MATERIALS] = response.data.data;
    },

    async getMaterialsAc({ state }, payload) {
      const response = await materialsApi.getMaterialsByCategory(
        Categories.Acoustic
      );
      // const response = await materialsApi.getMaterials(MaterialUsage.Acoustic);

      console.log(response);

      state.data[MATERIALS_AC] = response.data.data;
    },

    async getMaterialsVi({ state }, payload) {
      const response = await materialsApi.getMaterialsByCategory(
        Categories.Vibroisolation
      );

      state.data[MATERIALS_VI] = response.data.data;
    },

    async getMaterialsWithCerts({ state }, payload) {
      const response = await materialsApi.getMaterialsWithCertificates();

      state.data[MATERIALS_WITH_CERTS] = response.data.data;
    },
    async getBrandsInstalSchemas({ state }, payload) {
      const response = await installSchemesApi.getInstallSchemes();

      state.data[BRANDS_INSTALL_SCHEMAS] = response.data.data;
    },

    async getTechCards({ state }, payload) {
      const response = await techCardApi.getTechCards();

      console.log(response);

      state.data[TECHCARDS] = response.data.data;
    },
    async getAcousticCategories({ state }, payload) {
      const response = await brandsApi.getBrands();

      state.data[ACOUSTIC_CATEGORIES] = response.data.data;
    },
    // startVoiceRecognition({ commit }) {
    //     const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
    //     const rec = new SpeechRecognition();
    //     const speechRecognitionList = new webkitSpeechGrammarList();

    //     rec.lang = "ru-RU";
    //     rec.start();

    //     rec.onresult = function (event) {
    //         const text = event.results[0][0].transcript;
    //         commit('updateVoiceSearchText', text);
    //     };
    // },
    startVoiceRecognition({ commit }) {
      const speechRecognition = webkitSpeechRecognition || SpeechRecognition;
      const rec = new speechRecognition();

      rec.lang = "ru-RU";
      rec.continuous = false; // Остановить после распознавания одного слова или фразы
      rec.interimResults = false; // Получать только окончательные результаты
      rec.maxAlternatives = 100;
      rec.start();

      rec.onresult = function (event) {
        console.log("Recognized speech variants not in dictionary:");

        // Пройтись по всем результатам распознавания
        for (let i = 0; i < event.results.length; i++) {
          for (let j = 0; j < event.results[i].length; j++) {
            const textVariant = event.results[i][j].transcript.toLowerCase();
            // Проверить, нет ли варианта в словаре
            const isNotInDictionary = !Object.values(dictionary).some((words) =>
              words.includes(textVariant)
            );

            // Если вариант не найден в словаре, вывести его в консоль
            if (isNotInDictionary) {
              console.log(`Variant ${i + 1}.${j + 1}: ${textVariant}`);
            }
          }
        }

        console.log(event);

        const text = event.results[0][0].transcript.toLowerCase();
        const match = Object.entries(dictionary).find(([_, words]) =>
          words.includes(text)
        );

        if (match) {
          commit("updateVoiceSearchText", match[0]);
        } else {
          commit("updateVoiceSearchText", text);
        }
      };

      rec.onspeechend = function () {
        rec.stop(rec.onresult);
      };

      rec.onnomatch = function () {
        console.log("No match");
        commit("updateVoiceSearchText", "Совпадений не найдено");
      };

      rec.onerror = function (event) {
        console.log("Error occurred in recognition: " + event.error);
        // commit('updateVoiceSearchText', 'Ошибка распознавания: ' + event.error);
        commit("updateVoiceSearchText", "");
      };
    },
  },
  getters: {
    //computed
    selectImages(state) {
      return state.images;
    },
    // selectAllIsolationConstrAcoustic(state) {
    //     const searchText = state.voiceSearchText || state.searchText;

    //     return state.data[ALL_ISOLATION_CONSTR].filter((item) =>
    //         item.Category === 'acoustic' && item[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
    //     )
    // },
    selectAllIsolationConstrSound(state) {
      const searchText = state.voiceSearchText || state.searchText;

      return state.data[ALL_ISOLATION_CONSTR].filter((item) =>
        item[state.currentOption]
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    },
    selectMaterials(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[MATERIALS].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      );
    },
    selectMaterialsAc(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[MATERIALS_AC].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      );
    },
    selectMaterialsVi(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[MATERIALS_VI].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      );
    },
    selectMaterialsWithCerts(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[MATERIALS_WITH_CERTS].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      ).map((item) => ({ ...item, Code: `${item.Type}/${item.Code}` }));
    },
    selectMaterialsWithTechCards(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[TECHCARDS].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      );
    },
    selectBrandsInstalSchemas(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[BRANDS_INSTALL_SCHEMAS].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      );
    },
    selectAcousticCategories(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[ACOUSTIC_CATEGORIES].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      );
    },
    selectAlbums(state) {
      const searchText = state.voiceSearchText || state.searchText;
      return state.data[ALBUMS].filter((el) =>
        el[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
      );
    },
    selectObjects(state) {
      const searchText = (
        state.voiceSearchText || state.searchText
      ).toLowerCase();

      const result = state.data.objects.filter(
        (item) =>
          item.Name.toLowerCase().includes(searchText) ||
          item.Location.toLowerCase().includes(searchText) ||
          item.UsedMaterials?.some(({ Name }) =>
            Name.toLowerCase().includes(searchText)
          )
      );

      return result;
    },
    generalCategories(state) {
      return state.generalCategories;
    },
    userSelector(state) {
      return state.user;
    },
    isAuthorizedSelector(state) {
      return state.user != null;
    },
  },
});
