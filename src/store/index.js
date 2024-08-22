import { createStore } from 'vuex';
import {
    materialsApi,
    albumsApi,
    constructionsApi,
    brandsApi,
    techCardApi,
    installSchemesApi,
    objectsApi
} from '../config';
import { MaterialUsage, ConstructionsUsage } from '../types'

export const MATERIALS    = "Materials/si"
export const MATERIALS_AC = "Materials/ac"
export const MATERIALS_VI = "Materials/vi"

export const ALL_ISOLATION_CONSTR = "AllIsolationConstr"

export const MATERIALS_WITH_CERTS = "MaterialsWithCerts"

export const ACOUSTIC_CATEGORIES = "AcousticCategories"

export const ALBUMS = "albums"

export const TECHCARDS = 'techCards'

export const BRANDS_INSTALL_SCHEMAS = "brandsWithInstallSchemas" 

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
    flexakustik: [
        "flex акустик",
        "комплекс акустик",
    ],
    шуманет: [
        "шума нет",
        "шуманит",
    ],
    шумопласт: [
        "шумопласт",
        "шум пласт",
        
    ],
    саундлайн: [
        "sunlight",
        "soundline",
        "саундбар",
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
        "deps",
    ],
    'зипс-модуль': [
        "зипс модуль",
        "zip спектр",
    ],
     'зипс-вектор': [
        "zips виктор",
        "zips модуль",
    ],
    'зипс-III-Ультра': [
        "ultra",
        "zip 4 ultra",
        "zips 3 ultra",
        "зипс 3 ultra",
        "зипс 3 ультра",
    ],
    'зипс-синема': [
        "zips cinema",
        "zip cinema",
        "синема",
        "deep cinema",
    ],
    'зипс-слим': [
        "zip slim",
        "zips slim",
        "zips модуль",
    ],
    'зипс-z4': [
        "z4",
        "зипс z4",
        "zips led 4",
        "zips z4",
    ], 
    'саундлайн-пгп': [
        "sunlight пгп",
        "онлайн пгп",
    ], 
    'акуфлекс-супер': [
        "акуфлекс супер",
        "экофлекс супер",
        "аквафлекс супер",
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
        "онлайн би-би",
        "онлайн деби",
    ],
    виброфлекс: [
        'фильм рефлекс',
        'вибро',
        'микрофлекс',
        'еврофлекс',
        'гемофлекс',
        'neuralex',
        'nitraflex',
        'виброплит',
        'мимо',
        'мимо flex',
        'мим рефлекс',
        'nitraflex',
        'вибросепаратор',
        'гидрофлекс',
        'виброфлор',
        'membra',
        'ибупрофен',
        'профлекс',
        'вимос',
        'вибропласт',
        'vibrofix',
        'метрофлекс',
        'невролек',
        'виброрежим',
        'demographics',
        'мимо секс',
    ],
    'виброфлекс-к15': [
        'еврофлекс к15',
        'mibro к15',
        'к15',
        'к-15',
        'ак-15',
        'k15',
        'libros k15',
        'невроз к15',
        'терафлекс к15',
        'ибупрофен к15',
        'браслет f15',
        'профлекс к-15',
        'браслет 115',
        'профлекс k15',
        '15',
        '115',
        
    ],
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
                {
                    id: '7',
                    src: '/objekt_cover/muzscool_cover.jpg',
                    alt: ' ',
                    objectname: 'Первая детская Музыкальная школа',
                    address: 'г.Архангельск',
                    text: 'Первая детская Музыкальная школа',
                    images: [
                        {
                            cover: '/objekt_cover/muzscool_cover.jpg',
                            alt: '',
                            name: 'Первая детская Музыкальная школа',
                            objectname: 'Первая детская Музыкальная школа',
                            address: 'г.Архангельск',
                            // customer: 'Комитет по строительству Правительства Санкт-Петербурга',
                            // designers: 'ООО «Архитектурное бюро «Студия 44»',
                            // generalcontractor: 'ООО «ПСБ «ЖилСтрой»',
                            // areaobject: '9290 м2',
                            // constructiontime: '2019 г.',
                            // projectdescription: `Акустическое консультирование
                            //                     Архитектурный эскиз и проектирование расположения акустической отделки
                            //                      Производство и поставка материалов для акустической отделки
                            //                      `,
                            usedmaterials: [
                                {
                                    m1: `САУНДЛАЙН-АКУСТИКА Звездное небо`,
                                    

                                }
                            ],
                            imagesSet :[
                                {
                                    img1: `/object_img/muzscool/muzscool1.jpg`,
                                    img2: `/object_img/muzscool/muzscool2.jpg`,
                                    img3: `/object_img/muzscool/muzscool3.jpg`,
                                    img4: `/object_img/muzscool/muzscool4.jpg`,
                                    img5: `/object_img/muzscool/muzscool5.jpg`,
                                    img6: `/object_img/muzscool/muzscool6.jpg`,
                                    img7: `/object_img/muzscool/muzscool7.jpg`,
                                    img8: `/object_img/muzscool/muzscool8.jpg`,
                                    img9: `/object_img/muzscool/muzscool9.jpg`,
                                    img10: `/object_img/muzscool/muzscool10.jpg`,
                                    img11: `/object_img/muzscool/muzscool11.jpg`,
                                    img12: `/object_img/muzscool/muzscool12.jpg`,
                                    img13: `/object_img/muzscool/muzscool13.jpg`,
                                    img14: `/object_img/muzscool/muzscool14.jpg`,
                                }
                            ]

                        },
                    ]
                },
            ],

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
        async getObjects({ state }) {
            const response = await objectsApi.getObjects()

            state.data.objects = response.data.data
        },
        async getAlbums({ state }) {
            const response = await albumsApi.getAlbums();

            state.data[ALBUMS] = response.data.data

        },
        async getAllIsolationConstr({ state }, payload) {
            const response = await constructionsApi.getConstructions(ConstructionsUsage.SoundIsolation)

            
            state.data[ALL_ISOLATION_CONSTR] = response.data.data
        },

        async getMaterials({ state }, payload) {
            const response = await materialsApi.getMaterials(MaterialUsage.SoundIsolation);
            console.log("materials");
            

            console.log(response);

            state.data[MATERIALS] = response.data.data;
        },

        async getMaterialsAc({ state }, payload) {
            const response = await materialsApi.getMaterials(MaterialUsage.Acoustic);

            console.log(response);

            state.data[MATERIALS_AC] = response.data.data;
        },

        async getMaterialsVi({ state }, payload) {
            const response = await materialsApi.getMaterials(MaterialUsage.VibroIsolation);

            state.data[MATERIALS_VI] = response.data.data;
        },

        async getMaterialsWithCerts({ state }, payload) {
            const response = await materialsApi.getMarerialsWithSertificates();

            state.data[MATERIALS_WITH_CERTS] = response.data.data;
        },
        async getBrandsInstalSchemas({ state }, payload) {
            const response = await installSchemesApi.getInstallSchemes()

            state.data[BRANDS_INSTALL_SCHEMAS] = response.data.data;
        },

        async getTechCards({ state }, payload) {
            const response = await techCardApi.getTechCards()

            console.log(response);
            
            state.data[TECHCARDS] = response.data.data;
        },
        async getAcousticCategories({ state }, payload) {
            const response = await brandsApi.getBrands()
            
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
            const speechRecognition = webkitSpeechRecognition || SpeechRecognition 
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
                const isNotInDictionary = !Object.values(dictionary).some(words => words.includes(textVariant));
                
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
        selectObjects(state) {
            const searchText = state.voiceSearchText || state.searchText;
            return state.data.objects.filter((el) => el[state.currentOption].toLowerCase().includes(searchText.toLowerCase()))
        }
    },
})