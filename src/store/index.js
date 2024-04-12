import { createStore } from 'vuex';
import { API_SERVER , API_URL  } from '../config';
import { API_URL1 } from '../config';

export default createStore({
    state() //data
    {
        return {
            // count: 1,
            Data: [],
            DataM: [],
            options: ['Name'],
            currentOption: 'Name',
            searchText: '',
            voiceSearchText:'',
            
        }
        
    },
    mutations:{ //methods

     updateVoiceSearchText(state, voiceText) {
        state.voiceSearchText = voiceText;
    },
    //   setActiveImages(elem, type) {
    // // Нужно определить, относятся ли изображения к сертификатам или протоколам испытаний.
    //     this.selectedImages = elem.images; // Обновляем выбранные изображения
    //     this.isCarouselVisible = true; // в любом случае показываем карусель после выбора
    //     console.log(this.selectedImages)
    //   },
    setActiveImages(elem, type) {
      
    // Проверка на наличие свойства 'images' у 'elem'
    if (elem.images && Array.isArray(elem.images)) {
      // Задаем selectedImages массивом изображений, соответствующим данному элементу
      this.selectedImages = elem.images;
      this.isCarouselVisible = true; // Показываем карусель с изображениями
    } else {
      // Если нет изображений, возможно, нужно предупредить пользователя или сделать что-то другое
      console.error('No images available for this item');
      
    }
    
  },
    },
    actions:{ //methods async
        
        async getData({ state } , payload)
        {
            let res = await fetch(`${API_SERVER}/${API_URL}`)
            let res_data = await res.json()

            console.log(res_data)

            state.Data = res_data.data;
           
        },
        async getSecondArray({ state } , payload)
        {
            let ress = await fetch(`${API_SERVER}/${API_URL1}`)
            let ress_data = await ress.json()

            console.log(ress_data)

            state.DataM = ress_data.data;
           
        },
        startVoiceRecognition({ commit }) {
            const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
            const rec = new SpeechRecognition();
            rec.lang = "ru-RU";
            rec.start();

            rec.onresult = function(event) {
                const text = event.results[0][0].transcript;
                commit('updateVoiceSearchText', text); // Обновляем состояние с помощью мутации
            };
        },
    },
    getters:{ //computed
        // getItems(state)
        // {
            
        //     return state.Data.filter((el) => el[state.currentOption].toLowerCase().includes(state.searchText.toLowerCase()))
        // },
        // getItemsM(state)
        // {

        //     return state.DataM.filter((el) => el[state.currentOption].toLowerCase().includes(state.searchText.toLowerCase()))
        // },
        getItems(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.Data.filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        getItemsM(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.DataM.filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
    } ,
   
    
})