<!-- <template>

    <div v-if="divVisible" class="col-11 information-block composition"
        :style="{ top: position.y + 'px', left: position.x + 'px' }">
        <button type="button" class="btn close-btn" @click="reloadPage" style="position: fixed; top: 0; right: 8px;">
            <svg height="50" width="50">
                <circle r="22" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="2" />
                <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3" />
                <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3" />
            </svg>
        </button>
        <span style="margin-top: 15px; font-weight: 600;"> НАШИ ОБЪЕКТЫ </span>
        <nav class="navbar navbar-light bg-light" style="margin-top:55px ;">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <span class="navbar">Filter</span>
            </div>
        </nav>
        <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
            <div class="bg-light p-4">
                <select class="form-select select-descript" aria-label="Default select example">
                    <option selected>МАТЕРИАЛ</option>
                    
                </select><select class="form-select select-descript" aria-label="Default select example">
                    <option selected>АДРЕС</option>
                    
                </select>
                <select class="form-select select-descript" aria-label="Default select example">
                    <option selected>НАЗНАЧЕНИЕ</option>
                   
                </select>
                <select class="form-select select-descript" aria-label="Default select example">
                    <option selected>ДАТА</option>
                    >
                </select>
                <select class="form-select select-descript" aria-label="Default select example">
                    <option selected>ЗАКАЗЧИК</option>
                   
                </select>
            </div>
        </div>
        <div class="gallery">
            <div v-for="(image, index) in images" :key="index" class="gallery-item">
                <div>
                    <img :src="image.src" alt="" @click="openDialog(image)" role="button" />
                </div>
                <div class="image-text-object">
                    {{ image.text }}
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import { mapGetters } from 'vuex';

export default {
 
    data() {
        return {
            position: { x: 0, y: 75 },
            divVisible: true,
            data: [
                {
                    cover: '',
                    src: '/objekt_cover/1_KDZ.jpg',
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8 ',
                    objectname: 'Офис компании "Boston Consulting Group"',
                    address: 'г. Москва, Гашека, 6',
                    customer: 'Boston Consulting Group Ltd',
                    designers: 'Архитектурная мастерская Павла Поликарпова',
                    generalcontractor: 'Группа компаний Гинт-М',
                    areaobject: '399 м2',
                    constructiontime: '2017 г.',
                    projectdescription: 'Акустическое проектирование, поставка материалов',
                    usedmaterials: `AKU-Line (AКУ-Лайн) ГКЛА	
                        Decor Acoustic Дуб белый	
                        Ecophon Wall panel A
                        Ecophon Wall panel C
                        Sonacoustic®PL	
                        Sonaspray K13 special
                        Вибросил (виброакустический герметик)	
                        Шуманет-100Комби	
                        Шуманет-ЭКО Акустическая экологичная стеклоплита
                        `,

                },
            ],
            kdz: [
                {
                    src: '/DSC07229.jpg',
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8',
                }, {
                    src: `/DSC07233.jpg`,
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8',
                }, {
                    src: '/DSC07241.jpg',
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8',
                }, {
                    src: '/DSC07248.jpg',
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8',
                }, {
                    src: '/DSC07252.jpg',
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8',
                },
            ],
            images: [
                {
                    src: '/objekt_cover/1_KDZ.jpg',
                    alt: ' ',
                    text: 'КДЦ Строгино. Москва, Маршала Катукова, 8',
                },
                {
                    src: '/objekt_cover/1_LO.jpg',
                    alt: ' ',
                    text: 'ДК им. Любови Орловой. Звенигород, ул. Московская, 11',
                },
                {
                    src: '/objekt_cover/1_Palace_of_Pioneers.jpg',
                    alt: ' ',
                    text: 'Дом пионеров на Воробьевых горах. Москва, ул. Косыгина, д. 17',
                },
                {
                    src: '/objekt_cover/BCG_5.jpg',
                    alt: ' ',
                    text: 'Офис компании "Boston Consulting Group". Москва, Гашека, 6',
                },
                {
                    src: '/objekt_cover/rodina_1.jpg',
                    alt: ' ',
                    text: 'Киноконцертный зал "Пенза".Московская область, город Бронницы, пл. Тимофеева',
                },
            ],
            dialogVisible: false,
        };
    },
    computed: {
        ...mapGetters(['selectAcousticCategories']),
    },
    methods: {
        toggleSoundInsulation() {
      this.isSoundInsulationVisible = !this.isSoundInsulationVisible;
    },
        setPosition(event) {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
        },
        openDialog(image) {
            alert('ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ', image);

        },
        reloadPage() {
            location.reload();
        },
    }
}
</script>

<style scoped>
.download-btn {
    margin-top: 15px;
    background-color: rgb(236, 230, 230);
    color: black;
    border: solid 1px gray;
    /* padding: 10px 20px; */
    border-radius: 5px;
    cursor: pointer;
}

select {
    background-color: whitesmoke;
}

.image-text-object {
    position: absolute;
    bottom: 15px;
    left: 20px;
    filter: drop-shadow(2px 1px 3px rgb(255, 254, 254));
    background: rgba(255, 253, 253, 0.3);
    color: rgb(22, 22, 22);
    padding: 3px 10px 3px 10px;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.gallery-item {
    position: relative;
    margin-top: 30px;
}

.gallery-item img {
    max-width: 100%;
}

@media screen and (min-width: 1024px) {
    .gallery-item {
        width: calc((100% - 30px) / 2);
    }
}

.image-container {
    position: relative;
    display: inline-block;
}

.image-text {
    position: absolute;
    top: 2%;
    left: 2%;
    padding: 10px;
    color: antiquewhite;
}

.swip-object {
    width: 100%;
}

.img2 {
    width: 100%;
    opacity: 0.9;
}

.image-object {
    display: flex;
    margin-right: 10px;
}

.select-object {
    margin-top: 5px;
    margin-left: 10px;
    width: 100%;
    background: rgb(232, 232, 232);
    box-shadow: 2px 3px 3px rgb(161, 160, 160);
    white-space: normal;
}

.select-object option {
    word-wrap: break-word;
}
</style> -->
