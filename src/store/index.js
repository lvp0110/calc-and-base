import { createStore } from 'vuex';
import {
    API_URL_MATERIALS,
    API_URL_MATERIALS_AC,
    API_URL_MATERIALS_VI,
    API_URL_IMG,
    API_URL_MATERIALS_WITH_CERTS,
    API_SERVER,
    ALL_ISOLATION_CONSTR,
    API_URL_ALL_ISOLATION_CONSTR,
    
    MATERIALS,
    MATERIALS_AC,
    MATERIALS_VI,
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
                    id: '0',
                    src: '/objekt_cover/1_KDZ.jpg',
                    alt: ' ',
                    objectname: 'КДЦ Строгино',
                    address: 'Москва, Маршала Катукова 8',
                    text: 'КДЦ Строгино. Москва, ул.Маршала Катукова 8',
                    images: [
                        {
                            cover: '/objekt_cover/1_KDZ.jpg',
                            alt: ' ',
                            name: 'КДЦ Строгино ',
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
                                    im1: `Саундлайн-Акустика НГ`,

                                }
                            ],
                            imagesSet: [
                                {
                                    img1: `/object_img/kdz_strogino/2_KDZ.jpg`,
                                    img2: `/object_img/kdz_strogino/3_KDZ.jpg`,
                                    img3: `/object_img/kdz_strogino/4_KDZ.jpg`,
                                    img4: `/object_img/kdz_strogino/5_KDZ.jpg`,
                                }
                            ]

                        },
                    ]
                },
                {
                    id: '1',
                    src: '/objekt_cover/1_LO.jpg',
                    alt: ' ',
                    objectname: 'ДК им. Любови Орловой',
                    address: 'Звенигород, ул.Московская 11',
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
                            ],
                            imagesSet: [
                                {
                                    img1: `/object_img/lo/1_LO.jpg`,
                                    img2: `/object_img/lo/2_LO.jpg`,
                                    img3: `/object_img/lo/3_LO.jpg`,
                                    img4: `/object_img/lo/4_LO.jpg`,
                                }
                            ]

                        },
                    ]
                },
                {
                    id: '2',
                    src: '/objekt_cover/1_Palace_of_Pioneers.jpg',
                    alt: ' ',
                    objectname: 'Дом пионеров на Воробьевых горах',
                    address: 'Москва, ул.Косыгина 17',
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
                            ],
                            imagesSet: [
                                {
                                    img1: `/object_img/pioner_palase/1_Palace_of_Pioneers.jpg`,
                                    img2: `/object_img/pioner_palase/2_Palace_of_Pioneers.jpg`,
                                    img3: `/object_img/pioner_palase/3_Palace_of_Pioneers.jpg`,
                                    img4: `/object_img/pioner_palase/4_Palace_of_Pioneers.jpg`,
                                    img5: `/object_img/pioner_palase/5_Palace_of_Pioneers.jpg`,
                                }
                            ]

                        },
                    ]
                },
                {
                    id: '3',
                    src: '/objekt_cover/BCG_5.jpg',
                    alt: ' ',
                    objectname: 'Офис компании "Boston Consulting Group"',
                    address: 'Москва, ул.Гашека 6',
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
                            ],
                            imagesSet: [
                                {
                                    img1: `/object_img/bgg/BCG_1.jpg`,
                                    img2: `/object_img/bgg/BCG_2.jpg`,
                                    img3: `/object_img/bgg/BCG_3.jpg`,
                                    img4: `/object_img/bgg/BCG_4.jpg`,
                                    img5: `/object_img/bgg/BCG_5.jpg`,
                                }
                            ]

                        },
                    ]
                },
                {
                    id: '4',
                    src: '/objekt_cover/rodina_1.jpg',
                    alt: ' ',
                    objectname: 'Киноконцертный зал "Пенза"',
                    address: 'Московская область, г.Бронницы, пл.Тимофеева',
                    text: 'Киноконцертный зал "Пенза".Московская область, город Бронницы, пл. Тимофеева',
                    images: [
                        {
                            cover: '/objekt_cover/1_KDZ.jpg',
                            alt: '',
                            name: 'Киноконцертный зал "Пенза"',
                            objectname: 'Киноконцертный зал "Пенза"',
                            address: 'Московская область, г.Бронницы, пл.Тимофеева',
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
                            ],
                            imagesSet: [
                                {
                                    img1: `/object_img/kdz_rodina/rodina_1.jpg`,
                                    img2: `/object_img/kdz_rodina/rodina_2.jpg`,
                                    img3: `/object_img/kdz_rodina/rodina_3.jpg`,

                                }
                            ]

                        },
                    ]
                },
                {
                    id: '5',
                    src: '/objekt_cover/school_1.jpg',
                    alt: ' ',
                    objectname: 'Школа «Пионер»',
                    address: 'г.Москва, 2-й Котляковский пер.1',
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
                            ],
                            imagesSet: [
                                {
                                    img1: `/object_img/scool/school_2.jpg`,
                                    img2: `/object_img/scool/school_3.jpg`,
                                    img3: `/object_img/scool/school_4.jpg`,
                                    img4: `//object_img/scool/school_5.jpg`,
                                    img5: `/object_img/scool/school_6.jpg`,
                                }
                            ]

                        },
                    ]
                },
                {
                    id: '6',
                    src: '/objekt_cover/1_eifman.jpg',
                    alt: ' ',
                    objectname: 'Детский театр танца Бориса Эйфмана',
                    address: 'г.Санкт-Петербург, ул.Введенская д.3,стр.1',
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
                            ],
                            imagesSet: [
                                {
                                    img1: `/object_img/eifman/1_eifman.jpg`,
                                    img2: `/object_img/eifman/2_eifman.jpg`,
                                    img3: `/object_img/eifman/3_eifman.jpg`,

                                }
                            ]

                        },
                    ]
                },
            ],


            data: {
                [ALL_ISOLATION_CONSTR]: [],
                [MATERIALS]: [],
                [MATERIALS_AC]: [],
                [MATERIALS_VI]: [],
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

            const res = await fetch(`${API_SERVER}/${API_URL_ALL_ISOLATION_CONSTR}`)
            const res_data = await res.json()
            console.log(res_data)
            state.data[ALL_ISOLATION_CONSTR] = res_data.data
        },

        async getMaterials({ state }, payload) {
            if (state.data[MATERIALS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_SERVER}/${API_URL_MATERIALS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS] = ress_data.data;
        },

        async getMaterialsAc({ state }, payload) {
            if (state.data[MATERIALS_AC].length > 0) {
                return;
            } 

            let ress = await fetch(`${API_SERVER}/${API_URL_MATERIALS_AC}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS_AC] = ress_data.data;
        },

        async getMaterialsVi({ state }, payload) {
            if (state.data[MATERIALS_VI].length > 0) {
                return;
            }

            let ress = await fetch(`${API_SERVER}/${API_URL_MATERIALS_VI}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS_VI] = ress_data.data;
        },
        
        async getMaterialsWithCerts({ state }, payload) {
            if (state.data[MATERIALS_WITH_CERTS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_SERVER}/${API_URL_MATERIALS_WITH_CERTS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[MATERIALS_WITH_CERTS] = ress_data.data;
        },
        async getAcousticCategories({ state }, payload) {
            if (state.data[ACOUSTIC_CATEGORIES].length > 0) {
                return;
            }

            let r = await fetch(`${API_SERVER}/${API_URL_ACOUSTIC_CATEGORIES}`)
            let r_data = await r.json()
            console.log(r_data)
            state.data[ACOUSTIC_CATEGORIES] = r_data.data;
        },
        startVoiceRecognition({ commit }) {
            const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
            const rec = new SpeechRecognition();
            const speechRecognitionList = new webkitSpeechGrammarList();

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
                item[state.currentOption].toLowerCase().includes(searchText.toLowerCase())
            )
        },
        selectMaterials(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[MATERIALS].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        selectMaterialsAc(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[MATERIALS_AC].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        selectMaterialsVi(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[MATERIALS_VI].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
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