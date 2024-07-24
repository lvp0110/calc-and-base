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
    API_INSTALL_SCHEMAS,
    API_URL_BRANDS_INSTALL_SCHEMAS,
    API_URL_TECHCARDS,
    API_ALBUMS,
    ALBUMS,

    BRANDS_INSTALL_SCHEMAS,
    TECHCARDS,
    MATERIALS,
    MATERIALS_AC,
    MATERIALS_VI,
    MATERIALS_WITH_CERTS,
    ACOUSTIC_CATEGORIES,
    API_URL_ACOUSTIC_CATEGORIES
} from '../config';

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
        "boh acustic",
        "боно кустик",
        "boh accustic",
    ],
    decoustic: [
        "the кустик",
        "да кустик",
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
    ],
    flexakustik: [
        "flex акустик",
        "комплекс акустик",
    ],
    шуманет: [
        "шума нет"
    ],
    саундлайн: [
        "sunlight",
        "soundline",
    ],
    'АКУ-лайн': [
        "аквалайн",
        "эколайн",
    ],
    акуфлор: [
        "аквафлор",
    ],
    ультракустик: [
        "ультра акустик",
        "ultra acoustic",
        "ultra costica",
        "ultracast",
        "ultrace"
    ],
    isotop: [
        "изотоп"
    ],
    зипс: [
        "лепс",
        "zips",
        "philips",
        "гипс",
    ],
    'зипс-модуль': [
        "зипс модуль",
        "zips модуль",
        "philips",
        "гипс",
    ],
    'зипс-синема': [
        "zips cinema",
        "zip cinema",
        "zips модуль",
        "синема",
        "deep cinema",
    ],
    'зипс-z4': [
        "z4",
        "зипс z4",
        "zips led 4",
    ],
    'саундлайн-db': [
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
    ]
};

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
                                    m1: `Саундлайн-Акустика НГ`,

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
                                    m1: `Ecophon Wall panel Super G`,
                                    m2: `Ecophon Focus A 1200*600 `,

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
                                    m1: `Bonacoustic М Reale 29/3`,
                                    m3: `Decoustic FR 29/3`,
                                    m4: `Decoustic FR 30/2`,
                                    m5: `Шуманет-Эко`,

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
                                    m1: `AKU-Line (AКУ-Лайн) ГКЛА`,
                                    m2: `Decor Acoustic Дуб белый`,
                                    m3: `Ecophon Wall panel A`,
                                    m4: `Ecophon Wall panel C`,
                                    m5: `Sonacoustic®PL`,
                                    m6: `Sonaspray K13 special`,
                                    m7: `Вибросил (виброакустический герметик)`,
                                    m8: `Шуманет-100Комби`,
                                    m9: `Шуманет-ЭКО Акустическая экологичная стеклоплита`,

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
                                    m1: `Ecophon Solo`,
                                    m2: `SoundBoard Fine`,
                                    m3: `САУНДЛАЙН-АКУСТИКА Звездное небо 4ПК`,
                                    m4: `САУНДЛАЙН-АКУСТИКА Пойнт 4ПК`,
                                    m5: `Стеновые панели Саундлюкс Техно`,


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
                                    m1: `Саундлайн-Акустика НГ `,
                                    m2: `Саундлюкс-Техно Соло `,

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
                                    m1: `САУНДЛАЙН-АКУСТИКА Квадро 4ПК `,
                                    m2: `Саундлюкс Техно `,
                                    m3: `Шуманет-100Комби `,
                                    m4: `Шуманет-ЭКО Акустическая экологичная стеклоплита`,

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
                [BRANDS_INSTALL_SCHEMAS]: [],
                [API_INSTALL_SCHEMAS]: [],
                [ALL_ISOLATION_CONSTR]: [],
                [MATERIALS]: [],
                [MATERIALS_AC]: [],
                [MATERIALS_VI]: [],
                [MATERIALS_WITH_CERTS]: [],
                [ACOUSTIC_CATEGORIES]: [],
                [TECHCARDS]: [],
                [ALBUMS]: []
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
        async getAlbums({ state }) {
            if (state.data[ALBUMS].length > 0) {
                return;
            }

            const res = await fetch(`${API_SERVER}/${API_ALBUMS}`)
            const res_data = await res.json()
            console.log(res_data)
            state.data[ALBUMS] = res_data.data

        },
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
        async getBrandsInstalSchemas({ state }, payload) {
            if (state.data[BRANDS_INSTALL_SCHEMAS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_SERVER}/${API_URL_BRANDS_INSTALL_SCHEMAS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[BRANDS_INSTALL_SCHEMAS] = ress_data.data;
        },

        async getTechCards({ state }, payload) {
            if (state.data[TECHCARDS].length > 0) {
                return;
            }

            let ress = await fetch(`${API_SERVER}/${API_URL_TECHCARDS}`)
            let ress_data = await ress.json()
            console.log(ress_data)
            state.data[TECHCARDS] = ress_data.data;
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
            const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
            const SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;
            const rec = new SpeechRecognition();
            const speechRecognitionList = new SpeechGrammarList();

            // Предопределенная грамматика с фиксированным набором слов
            const grammar = '#JSGF V1.0; grammar words; public <word> = яблоко | апельсин | банан ;';
            speechRecognitionList.addFromString(grammar, 1);

            // Назначаем список грамматик нашему экземпляру распознавания речи
            rec.grammars = speechRecognitionList;
            rec.lang = "ru-RU";
            rec.continuous = false; // Остановить после распознавания одного слова или фразы
            rec.interimResults = false; // Получать только окончательные результаты
            rec.start();
            
            rec.onresult = function (event) {
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
                console.log('No match');
                commit('updateVoiceSearchText', 'Совпадений не найдено');
            };

            rec.onerror = function (event) {
                console.log('Error occurred in recognition: ' + event.error);
                // commit('updateVoiceSearchText', 'Ошибка распознавания: ' + event.error);
                commit('updateVoiceSearchText', '');
            };
        }

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
        selectMaterialsWithTechCards(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[TECHCARDS].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        selectBrandsInstalSchemas(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[BRANDS_INSTALL_SCHEMAS].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        selectAcousticCategories(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[ACOUSTIC_CATEGORIES].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
        selectAlbums(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data[ALBUMS].filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        },
    },
})