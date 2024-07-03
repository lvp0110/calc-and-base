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
            voiceSearchText: '',
            images: [
                {
                    src: '/objekt_cover/1_KDZ.jpg',
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8',
                    images: [
                        {
                            cover: '/objekt_cover/1_KDZ.jpg',
                            alt: ' ',
                            name: 'КДЦ Строгино. Москва, Маршала Катукова, 8 ',
                            objectname: 'КДЦ Строгино',
                            address: 'г. Москва, Маршала Катукова, 8',
                            customer: '',
                            designers: '',
                            generalcontractor: '',
                            areaobject: '',
                            constructiontime: '',
                            projectdescription: '',
                            usedmaterials: [
                                {
                                    im1: `AKU-Line (AКУ-Лайн) ГКЛА`,
                                    im2: `Decor Acoustic Дуб белый`,
                                    im3: `Ecophon Wall panel A`,
                                    im4: `Ecophon Wall panel C`,
                                    im5: `Sonacoustic®PL`,
                                    im6: `Sonaspray K13 special`,
                                    im7: `Вибросил (виброакустический герметик)`,
                                    im8: `Шуманет-100Комби`,
                                    im9: `Шуманет-ЭКО Акустическая экологичная стеклоплита`,
                                }
                            ]

                        },
                    ]
                },
                {
                    src: '/objekt_cover/1_LO.jpg',
                    alt: ' ',
                    text: 'ДК им. Любови Орловой. Звенигород, ул. Московская, 11',
                    images: [
                        {
                            cover: '/objekt_cover/1_KDZ.jpg',
                            alt: ' ',
                            name: 'ДК им. Любови Орловой ',
                            objectname: '',
                            address: 'г. Звенигород, ул. Московская, 11',
                            customer: '',
                            designers: 'Кинолаб, Архитектурное бюро «Меланиум»',
                            generalcontractor: 'Группа компаний Гинт-М',
                            areaobject: '922 м2',
                            constructiontime: '2007 г.',
                            projectdescription: 'Акустическое проектирование, поставка материалов',
                            usedmaterials: [
                                {
                                    im1: `Ecophon Wall panel Super G`,
                                    im2: `Ecophon Focus A 1200*600 `,
                                    
                                }
                            ]

                        },
                    ]
                },
                {
                    src: '/objekt_cover/1_Palace_of_Pioneers.jpg',
                    alt: ' ',
                    text: 'Дом пионеров на Воробьевых горах. Москва, ул. Косыгина, д. 17',
                    images: [
                        {
                            cover: '/objekt_cover/1_KDZ.jpg',
                            alt: '',
                            name: 'Дом пионеров на Воробьевых горах',
                            objectname: 'Дом пионеров на Воробьевых горах',
                            address: 'г. Москва, ул. Косыгина, д.17',
                            customer: 'Правительство Москвы',
                            designers: 'Акустик Групп',
                            generalcontractor: 'ООО «Меком», ООО «СК Форпост», ООО «ЕКС»',
                            areaobject: '5700 м2',
                            constructiontime: '2023 г.',
                            projectdescription: 'Акустическое проектирование, поставка материалов',
                            usedmaterials: [
                                {
                                    im1: `Bonacoustic М Reale 29/3`,
                                    im2: `Саундлайн-Акустика НГ`,
                                    im3: `Decoustic FR 29/3`,
                                    im4: `Decoustic FR 30/2`,
                                    im5: `Soundboard`,
                                    im6: `Шуманет-Эко`,

                                }
                            ]

                        },
                    ]
                },
                {
                    src: '/objekt_cover/BCG_5.jpg',
                    alt: ' ',
                    text: 'Офис компании "Boston Consulting Group". Москва, Гашека, 6',
                    images: [
                        {
                            cover: '/objekt_cover/1_KDZ.jpg',
                            alt: '',
                            name: 'Офис компании "Boston Consulting Group"',
                            objectname: 'Офис компании "Boston Consulting Group"',
                            address: 'г. Москва, Гашека, 6',
                            customer: 'Boston Consulting Group Ltd',
                            designers: 'Архитектурная мастерская Павла Поликарпова',
                            generalcontractor: 'Группа компаний Гинт-М',
                            areaobject: '399 м2',
                            constructiontime: '2017 г.',
                            projectdescription: 'Акустическое проектирование, поставка материалов',
                            usedmaterials: [
                                {
                                    im1: `AKU-Line (AКУ-Лайн) ГКЛА`,
                                    im2: `Decor Acoustic Дуб белый`,
                                    im3: `Ecophon Wall panel A`,
                                    im4: `Ecophon Wall panel C`,
                                    im5: `Sonacoustic®PL`,
                                    im6: `Sonaspray K13 special`,
                                    im7: `Вибросил (виброакустический герметик)`,
                                    im8: `Шуманет-100Комби`,
                                    im9: `Шуманет-ЭКО Акустическая экологичная стеклоплита`,

                                }
                            ]

                        },
                    ]
                },
                {
                    src: '/objekt_cover/rodina_1.jpg',
                    alt: ' ',
                    text: 'Киноконцертный зал "Пенза".Московская область, город Бронницы, пл. Тимофеева',
                    images: [
                        {
                            cover: '/objekt_cover/1_KDZ.jpg',
                            alt: '',
                            name: 'Киноконцертный зал "Пенза"',
                            objectname: 'Киноконцертный зал "Пенза"',
                            address: 'Московская область, город Бронницы, пл. Тимофеева',
                            customer: 'Администрация г. Бронницы',
                            designers: 'Афанасьев А.Е.',
                            generalcontractor: 'ИП «Мова»',
                            areaobject: '300 м2',
                            constructiontime: '2017 г.',
                            projectdescription: `Акустическое консультирование
                                                Архитектурный эскиз и проектирование расположения акустической отделки
                                                 Производство и поставка материалов для акустической отделки
                                                 `,
                            usedmaterials: [
                                {
                                    im1: `Ecophon Solo`,
                                    im2: `SoundBoard Fine`,
                                    im3: `САУНДЛАЙН-АКУСТИКА Звездное небо 4ПК`,
                                    im4: `САУНДЛАЙН-АКУСТИКА Пойнт 4ПК`,
                                    im5: `Стеновые панели Саундлюкс Техно`,
                                    

                                }
                            ]

                        },
                    ]
                },
                {
                    src: '/objekt_cover/school_1.jpg',
                    alt: ' ',
                    text: 'Школа «Пионер» на 900 мест, ЖК «Варшавская Life»',
                    images: [
                        {
                            cover: '/objekt_cover/school_1.jpg',
                            alt: '',
                            name: 'Школа «Пионер» на 900 мест, ЖК «Варшавская Life»',
                            objectname: 'Школа «Пионер» на 900 мест, ЖК «Варшавская Life»',
                            address: 'г. Москва, 2-й Котляковский пер., д. 1',
                            customer: 'ГК Пионер',
                            designers: 'Афанасьев А.Е.',
                            generalcontractor: 'ООО «РСК»',
                            areaobject: '2000 м2',
                            constructiontime: '2023 г.',
                            projectdescription: `Акустическое консультирование
                                                Архитектурный эскиз и проектирование расположения акустической отделки
                                                 Производство и поставка материалов для акустической отделки
                                                 `,
                            usedmaterials: [
                                {
                                    im1: `Саундлайн-Акустика НГ `,
                                    im2: `Саундлюкс-Техно Соло `,
                                  
                                }
                            ]

                        },
                    ]
                },
                {
                    src: '/objekt_cover/1_eifman.jpg',
                    alt: ' ',
                    text: 'Детский театр танца Бориса Эйфмана (Санкт-Петербург)',
                    images: [
                        {
                            cover: '/objekt_cover/school_1.jpg',
                            alt: '',
                            name: 'Детский театр танца Бориса Эйфмана (Санкт-Петербург)',
                            objectname: 'Детский театр танца Бориса Эйфмана (Санкт-Петербург)',
                            address: 'г. Санкт-Петербург, Введенская ул., д.3, стр.1',
                            customer: 'Комитет по строительству Правительства Санкт-Петербурга',
                            designers: 'ООО «Архитектурное бюро «Студия 44»',
                            generalcontractor: 'ООО «ПСБ «ЖилСтрой»',
                            areaobject: '9290 м2',
                            constructiontime: '2019 г.',
                            projectdescription: `Акустическое консультирование
                                                Архитектурный эскиз и проектирование расположения акустической отделки
                                                 Производство и поставка материалов для акустической отделки
                                                 `,
                            usedmaterials: [
                                {
                                    im1: `САУНДЛАЙН-АКУСТИКА Квадро 4ПК `,
                                    im2: `Саундлюкс Техно `, 
                                    im3: `Шуманет-100Комби `,
                                    im4: `Шуманет-ЭКО Акустическая экологичная стеклоплита`,
                                  
                                }
                            ]

                        },
                    ]
                },
            ],


            data: {
                [ALL_ISOLATION_CONSTR]: [],
                [MATERIALS]: [],
                [MATERIALS_WITH_CERTS]: [],
                [ACOUSTIC_CATEGORIES]: [],
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
        async getMaterials({ state }, payload) {
            if (state.data[MATERIALS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_TESTSERVER}/${API_URL_MATERIALS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS] = ress_data.data;
        },
        async getMaterialsWithCerts({ state }, payload) {
            if (state.data[MATERIALS_WITH_CERTS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_TESTSERVER}/${API_URL_MATERIALS_WITH_CERTS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS_WITH_CERTS] = ress_data.data;
        },
        async getAcousticCategories({ state }, payload) {
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

            rec.onresult = function (event) {
                const text = event.results[0][0].transcript;
                commit('updateVoiceSearchText', text);
            };
        },
    },
    getters: { //computed
        selectImages(state) {
            return state.images
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