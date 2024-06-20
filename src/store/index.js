import { createStore } from 'vuex';
import {
    API_URL_MATERIALS,
    API_URL_IMG,
    API_URL_MATERIALS_WITH_CERTS,
    API_TESTSERVER,
    ALL_ISOLATION_CONSTR,
    API_URL_ALL_ISOLATION_CONSTR,
    MATERIALS,
    MATERIALS_WITH_CERTS,
    ACOUSTIC_CATEGORIES,
    API_URL_ACOUSTIC_CATEGORIES
} from '../config';

export default createStore({
    state() {
        return {
            options: ['Name'],
            currentOption: 'Name', 
            searchText: '',
            voiceSearchText:'',

            data: {
                [ALL_ISOLATION_CONSTR]: [],
                [MATERIALS]: [],
                [MATERIALS_WITH_CERTS]: [],
                [ACOUSTIC_CATEGORIES]: []
            }
        }
    }, 
    mutations: { //methods
        updateVoiceSearchText(state, voiceText) {
           state.voiceSearchText = voiceText;
       },
        updateImagesData(state, images) {
           state.ImagesData = images;
       },
    },
    actions: {
        async getAllIsolationConstr({ state }, payload) {
            if (state.data[ALL_ISOLATION_CONSTR].length > 0) {
                return;
            }

            const res = await fetch(`${API_TESTSERVER}/${API_URL_ALL_ISOLATION_CONSTR}`)
            const res_data = await res.json()
            console.log(res_data)
            state.data[ALL_ISOLATION_CONSTR] = res_data.data
        },
        async getMaterials({ state } , payload) {
            if (state.data[MATERIALS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_TESTSERVER}/${API_URL_MATERIALS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS] = ress_data.data;
        },
        async getMaterialsWithCerts({ state } , payload) {
            if (state.data[MATERIALS_WITH_CERTS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_TESTSERVER}/${API_URL_MATERIALS_WITH_CERTS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS_WITH_CERTS] = ress_data.data;
        },
        async getAcousticCategories({ state } , payload) {
            if (state.data[ACOUSTIC_CATEGORIES].length > 0) {
                return;
            }

            let r = await fetch(`${API_TESTSERVER}/${API_URL_ACOUSTIC_CATEGORIES}`)
            let r_data = await r.json()
            console.log(r_data)
            state.data[ACOUSTIC_CATEGORIES] = r_data.data;
        },
        startVoiceRecognition({ commit }) {
            const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
            const rec = new SpeechRecognition();
            rec.lang = "ru-RU";
            rec.start();

            rec.onresult = function(event) {
                const text = event.results[0][0].transcript;
                commit('updateVoiceSearchText', text); 
            };
        },
    },
    getters: { //computed
        selectAllIsolationConstrAcoustic(state) {
            const searchText = state.voiceSearchText || state.searchText;

            return state.data[ALL_ISOLATION_CONSTR].filter((item) => 
                item.Category === 'acoustic' && item[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
            )
        },
        selectAllIsolationConstrSound(state) {
            const searchText = state.voiceSearchText || state.searchText;

            return state.data[ALL_ISOLATION_CONSTR].filter((item) => 
                item.Category === 'sound' && item[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
            )
        },
        selectMaterials(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[MATERIALS].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        selectMaterialsWithCerts(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[MATERIALS_WITH_CERTS].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        selectAcousticCategories(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[ACOUSTIC_CATEGORIES].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
    },
})