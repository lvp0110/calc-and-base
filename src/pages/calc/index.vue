<template>
    <button type="button" @click="hasHistory()
        ? $router.go(-1)
        : $router.push('/')"
        style="width: 80px;height: 40px; position: absolute;top: 1%;right: 8%;background: none;color: #000;">&laquo;
        Назад
    </button>

    <!-- * Кнопки вывода данных на экран * -->
    <div class="category">
        <button v-for="elem in getActiveCategories" :value="elem.id" :style="{ background: elem.background }"
            :class="{ start_page: currentCategory == elem.id ? false : true, active: currentCategory == elem.id ? true : false }"
            @click="currentCategory = currentCategory ? 0 : $event.target.value">{{ elem.title }}
        </button>
    </div>
    <div class="subcategory">
        <button v-for="elem in getSubCategories" :value="elem.id"
            :class="{ type_page: currentSubCategory == elem.id ? false : true, type_active: currentSubCategory == elem.id ? true : false }"
            @click="currentSubCategory = currentSubCategory ? 0 : $event.target.value">{{ elem.title }}
            <img v-if="currentSubCategory == 0" :src="elem.img" alt="" class="img-icon-type">
        </button>
    </div>
    <div class="items">
        <button v-for="elem in getItems" :value="elem.id"
            :class="{ const_page: currentItems == elem.id ? false : true, const_active: currentItems == elem.id ? true : false }"
            @click="currentItems = currentItems ? 0 : $event.target.value">
            <p style="z-index: 1; color: revert;pointer-events: none;">{{ elem.title }}</p>
            <img v-if="template == null" :src="`../../../${elem.img}`" alt="" class="img-icon">
        </button>
    </div>
    <!-- * Получение данных из форм конструкций * -->
    <!-- Полы без доп/данных-->
    <div class="inputsFloorAll" v-if="template == 1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
    </div>
    <div class="inputsFloorAll" v-if="template == 111">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
    </div>
    <!-- Полы С2К2 -->
    <div class="inputsC2K2" v-else-if="template == 607.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
                value="AG.F607" checked><label class="label">К2 по периметру</label>
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
                value="AG.F607_vibrostek"><label class="label">Вибростек по периметру</label>
            <hr>
        </div>

    </div>
    <div class="inputsC2K2" v-else-if="template == 608.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
                value="AG.F608" checked><label class="label">К2 по периметру</label>
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
                value="AG.F608_vibrostek"><label class="label">Вибростек по периметру</label>
        </div>
    </div>
    <div class="inputsC2K2" v-else-if="template == 609.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
                value="AG.F609" checked><label class="label">К2 по периметру</label>
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
                value="AG.F609_vibrostek"><label class="label">Вибростек по периметру</label>
            <hr>
        </div>

    </div>
    <div class="inputsC2K2" v-else-if="template == 610.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
                value="AG.F610" checked><label class="label">К2 по периметру</label>
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
                value="AG.F610_vibrostek"><label class="label">Вибростек по периметру</label>
        </div>
    </div>
    <!-- Пол Акуфлор -->
    <div class="inputsC2K2" v-else-if="template == 2.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
                value="AG.F" checked><label class="label">Акуфлор S20 по периметру</label>
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
                value="AG.F_vibrostek"><label class="label">Вибростек по периметру</label>
            <hr>
        </div>

    </div>
    <!-- Пол по лагам -->
    <div class="inputsFloor615" v-else-if="template == 3">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <h4 style="margin: 5px ;">тип конструкции</h4>
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
                value="AG.F615" checked><label class="label">&nbsp; с применением материала Silomer</label>
            <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
                value="AG.F615_vibroflex_LD"><label class="label">&nbsp; с применением опор Виброфлекс LD</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400" checked><label class="label">шаг профиля 400 мм</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм</label>
            <hr>
        </div>
    </div>
    <!-- Пол Шумопласт -->
    <div class="inputsFloorSplast" v-else-if="template == 9">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <h4 style="margin: 5px ;">тип конструкции</h4>
        <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
            value="AG.F606" checked><label class="label">толщина слоя 20 мм</label>
        <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
            value="AG.F606_30"><label class="label">толщина слоя 30 мм</label>
        <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n3" name="name"
            value="AG.F606_40"><label class="label">толщина слоя 40 мм</label>
    </div>
    <!-- Пол Техно -->
    <div class="inputsTehno" v-else-if="template == 9.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <h4 style="margin: 5px ;">тип конструкции</h4>
        <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n1" name="name"
            value="AG.F612" checked><label class="label">Шумостоп-Техно 350</label>
        <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n2" name="name"
            value="AG.F612_600"><label class="label">Шумостоп-Техно 600</label>
        <input class="radio" type="radio" @change="currentConstr = $event.target.value" id="n3" name="name"
            value="AG.F612_1200"><label class="label">Шумостоп-Техно 1200</label>
    </div>
    <!-- ЗИПС потолок -->
    <div class="ceilingZips" v-else-if="template == 4">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>
            <hr>
        </div>
    </div>
    <!-- Потолок К15,КС-->
    <div class="ceiling" v-else-if="template == 5">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()">изменить парaметры
            конструкции</button>

        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <h4> дополнительный отступ конструкции от перекрытия</h4>
            <input type="number" placeholder="размер,мм" v-model:="constR.AddCeilShift">
            <hr>
        </div>
        <!--Потолок К15 с удлинителем  -->
    </div>
    <!-- Потолок Саундборд -->
    <div class="ceiling" v-else-if="template == 202">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="длина,мм" v-model="constR.lenY">
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()">изменить парaметры
            конструкции</button>

        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">

            <h4> дополнительный отступ конструкции от перекрытия</h4>
            <input type="number" placeholder="размер,мм">
            <hr>
        </div>
    </div>
    <!-- Зипс стены -->
    <div class="frameZips" v-else-if="template == 6">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">
        <hr>
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>


            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- Облицовка на каркасе 50 мм -->
    <div class="frame50" v-else-if="template == 50">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 3 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 3,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 4 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4" name="steps_name"
                checked><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement  = $event.target.value" id = "n8" name ="name1" checked ><label class="label">материал Саундлайн dB </label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн </label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн </label> -->
    </div>
    <!-- Облицовка на каркасе 75 мм -->
    <div class="frame75" v-else-if="template == 75">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <!-- <span class="span_wool" style="font-size: 14px;"> {{typeWoolTitle}} </span>
                    <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v1" name ="vata_name" value="default" checked><label class="label">Шуманет-Эко</label>
                    <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v2" name ="vata_name" value="bm"><label class="label">Шуманет-БМ</label>
                    <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v3" name ="vata_name" value="skNeo"><label class="label">Шуманет-СК Neo</label> -->
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 3,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 4 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 4,5 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" checked><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->

    </div>
    <!-- Облицовка на каркасе 100 мм -->
    <div class="frame100" v-else-if="template == 100">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 4,25 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 5,5 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" checked ><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Облицовка на каркасе 60/27 подвесы ПС,КС -->
    <div class="frameVibr" v-else-if="template == 101">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 10 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 10 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 10 м)</label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>

        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" value="600" checked><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1" value="400"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Soundboard облицовка -->
    <div class="frameVibr" v-else-if="template == 201">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> выбрать тип Soundboard</span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="sb1" name="sb_name"
                value="default" checked><label class="label">Soundboard 600x600x20 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="sb2" name="sb_name"
                value="1200"><label class="label">Soundboard 1200x600x20 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="sb3" name="sb_name"
                value="2400"><label class="label">Soundboard 2400x600x20 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 10 м)</label>
            <!-- <input class="radio" type="radio" @change ="profileStep  = $event.target.value" id = "n2" name ="steps_name" value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 10 м)</label> -->
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 10 м)</label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>

        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" value="600" checked><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1" value="400"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка на профиле 50 мм -->
    <div class="partittion50" v-else-if="template == 50.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">
        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">

            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 4 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 6 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" value="600" checked><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка на профиле 75 мм -->
    <div class="partittion75" v-else-if="template == 75.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <!-- <span class="span_wool" style="font-size: 14px;"> {{typeWoolTitle}} </span>
                        <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v1" name ="vata_name" value="default" checked><label class="label">Шуманет-Эко</label>
                        <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v2" name ="vata_name" value="bm"><label class="label">Шуманет-БМ</label>
                        <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v3" name ="vata_name" value="skNeo"><label class="label">Шуманет-СК Neo</label> -->
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 5,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 6,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 7,5 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1"  checked><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка на профиле 100 мм -->
    <div class="partittion100" v-else-if="template == 100.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 6,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 7,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 8,5 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" checked><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка на профиле Wave -->
    <div class="partittionWave" v-else-if="template == 101.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 6,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 7,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 8,5 м)</label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" value="600" checked><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1" value="400"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1" value="300"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка на двойном какрасе 50 мм -->
    <div class="partittion50.2" v-else-if="template == 50.2">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 4,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 5,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 6,5 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>


        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" checked ><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка на двойном каркасе 75 мм -->
    <div class="partittion75.2" v-else-if="template == 75.2">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <!-- <span class="span_wool" style="font-size: 14px;"> {{typeWoolTitle}} </span>
                    <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v1" name ="vata_name" value="default" checked><label class="label">Шуманет-Эко</label>
                    <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v2" name ="vata_name" value="bm"><label class="label">Шуманет-БМ</label>
                    <input class="radio" type="radio" @change ="currentWool  = $event.target.value" id = "v3" name ="vata_name" value="skNeo"><label class="label">Шуманет-СК Neo</label> -->
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 6 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 7 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 8 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>


        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" checked ><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка на двойном каркасе 100 мм -->
    <div class="partittion100.2" v-else-if="template == 100.2">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">
            <span class="span_gkl" style="font-size: 14px;"> {{ typeGklTitle }} </span>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g1" name="gkl_name"
                value="default" checked><label class="label">AKU-line 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g2" name="gkl_name"
                value="2500P"><label class="label">AKU-line Pro 2500x1200x12,5 мм </label>
            <input class="radio" type="radio" @change="currentGkla = $event.target.value" id="g3" name="gkl_name"
                value="2000"><label class="label">AKU-line 2000x1200x12,5 мм </label>

            <span class="span_wool" style="font-size: 14px;"> {{ typeWoolTitle }} </span>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v1" name="vata_name"
                value="default" checked><label class="label">Шуманет-Эко</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v2" name="vata_name"
                value="bm"><label class="label">Шуманет-БМ</label>
            <input class="radio" type="radio" @change="currentWool = $event.target.value" id="v3" name="vata_name"
                value="skNeo"><label class="label">Шуманет-СК Neo</label>
            <hr>
            <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 6,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 7,5 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 8,5 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>
            <table class="data">
                <tr>
                    <!-- <div v-for="opening in constrSent.Openings" class="counter_input">{{constrSent.Openings.length}}</div> -->
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 500;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>

        <!-- <h4> замена Саундлайн dB на Аку-лайн</h4>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n8" name ="name1" checked ><label class="label">материал Саундлайн dB</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n9" name ="name1"><label class="label">замена на 1 лист Аку-лайн</label>
                <input class="radio" type="radio" @change ="materialReplacement   = $event.target.value" id = "n10" name ="name1"><label class="label">замена на 2 листа Аку-лайн</label> -->
    </div>
    <!-- Перегородка dBx -->
    <div class="framedBx" v-else-if="template == 8.1">
        <h4 style="margin: 5px ;">размер конструкции</h4>
        <input type="number" placeholder="ширина,мм" v-model="constR.lenX">
        <input type="number" placeholder="высота,мм" v-model="constR.lenZ">

        <button class="counter__button_param" style="margin-bottom:10px ;" @click="getStartParam()"> изменить парaметры
            конструкции</button>
        <div style="display: contents; top: 10px;margin-bottom:20px;" v-if="unvisible">

            <!-- <span style="font-size: 14px;"> ✔ шаг профиля при облицовке керамической плиткой не более 400 мм </span> -->
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n1" name="steps_name"
                value="600" checked><label class="label">шаг профиля 600 мм <br>(макс.высота конструкции 3 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n2" name="steps_name"
                value="400"><label class="label">шаг профиля 400 мм<br>(макс.высота конструкции 4 м)</label>
            <input class="radio" type="radio" @change="profileStep = $event.target.value" id="n3" name="steps_name"
                value="300"><label class="label">шаг профиля 300 мм<br>(макс.высота конструкции 5 м)</label>
            <input class="checkbox" type="checkbox" @change="dFrame = dFrame ? false : true" id="n4"
                name="steps_name"><label class="label"> добавить сдвоенный каркас </label>
            <hr>
            <h4 style="margin: 1px;">размер проема</h4>
            <input type="number" placeholder="ширина проема,мм" v-model="opening.lenX">
            <input type="number" placeholder="высота проема,мм" v-model="opening.lenZ">
            <h4 style="margin: 1px;">тип проема</h4>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="doors"
                name="opening_name" value="OST_Doors" checked>
            <label class="label">дверь</label>
            <input class="radio" type="radio" @change="opening.Type = $event.target.value" id="wind" name="opening_name"
                value="OST_Windows">
            <label class="label">окно</label>
            <button class="counter__button_param" style="right: 2px;" @click="addOpening()">добавить проем</button>
            <hr>

            <table class="data" id="tabl"> <!-- таблица проемов-->
                <tr>
                    <th v-for="opening in constrSent.Openings" class="counter_input">{{ constrSent.Openings.length }}
                    </th>
                    <th colspan="4" style="font-size: 14px;font-weight: 600;border-right: solid 1px darkgray; ">cписок
                        проемов</th>
                </tr>
                <tr>
                    <th>тип</th>
                    <th>ширина</th>
                    <th>высота</th>
                    <th> </th>
                </tr>
                <tr v-for="(opening, index ) in constrSent.Openings" :key="index">
                    <td style="text-align: center;">{{ getOpeningType(opening.Type) }}</td>
                    <td style="text-align: center;">{{ opening.lenX }}</td>
                    <td style="text-align: center;">{{ opening.lenZ }}</td>
                    <td>
                        <input type="button" class="counter__button_minus">
                        <!-- <img src="public/calc/img/biggarbagebin_121980.svg" alt="" style="height: 13px;opacity: 0.7;" -->
                        @click="delFromOpenings(index)">
                        </input>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- Кнопка расчета конструкций -->
    <div>
        <button v-if="template != null" @click="addConstrToCalc" class="counter__button_plus"> расчет
            конструкции</button>
    </div>
    <div v-if="tableConstrToCalc != null" class="tbl-in">
        <hr style="opacity: 0.1;">
        <table class="data" id="table1"> <!-- таблица конструкций-->
            <tr>
                <!-- <th v-for="counterConstr in ConstrToCalc" class="counter_input">{{ConstrToCalc.length}}</th> -->
                <th colspan="5" style="font-size: 14px;font-weight: bold; text-align: center;">cписок конструкций</th>
            </tr>
            <tr>
                <th>шифр</th>
                <th>название</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="constR in ConstrToCalc" :key="constR.key_id">
                <td style="text-align: right;">{{ constR.ag_id }}</td>
                <td style="text-align: center;">{{ constR.title }} ,{{ constR.lenX }} x {{ constR.lenY }}{{ constR.lenZ
                    }}</td>
                <td><img :src="public / calc / constR.imgBlack" width="20" alt=""></td>
                <td>
                    <input type="button" class="counter__button_minus">
                    <!-- <img src="/calc.png" alt="" style="height: 13px;opacity: 0.7;"
                        @click="delConstrFromList(constR.key_id)"> -->
                        <div style="width: 50px;top: 0;"> 
                            <svg height="50" width="50" @click="delConstrFromList(constR.key_id)">
                        <circle r="22" cx="50%" cy="50%" fill="transparent" stroke="darkgrey" stroke-width="2" />
                        <line x1="12" y1="12" x2="39" y2="37" stroke="darkgrey" stroke-width="3" />
                        <line x1="39" y1="12" x2="12" y2="37" stroke="darkgrey" stroke-width="3" />
                    </svg>
                        </div>
                    
                    </input>
                </td>
            </tr>
        </table>
    </div>
    <div v-if="tableConstrToCalc != null" class="tbl-in">
        <hr>
        <table class="data" id="table2"><!-- таблица материалов-->
            <tr>
                <th colspan="5" style="font-size: 14px;font-weight: bold;text-align: center;">cписок материалов</th>
            </tr>
            <tr>
                <th>артикул</th>
                <th>название</th>
                <th style="display: none;"></th>
                <th>кол-во</th>
                <th>ед.изм</th>
            </tr>
            <tr v-for="Material in calculatedMaterials.data">
                <td>{{ filterVariable(Material.Code) }}</td>
                <td>{{ Material.Name }}</td>
                <td style="display: none;"> </td>
                <td>{{ convertUnits(Material) }}</td>
                <td>{{ Material.Units }}</td>
            </tr>
        </table>
    </div>
    <div>
        <button v-if="template != null" @click="copyTableToClipboard" class="add_design_button"> экспорт в ERP
        </button>
    </div>
    <div>
        <button v-if="template != null"  @click="tableToExcel" class="add_design_button"> сохранить в Excel </button>
    </div>
</template>

<script>
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default {
    data() {
        return {
            typeGklTitle: 'выбрать тип гипсокартона',
            typeWoolTitle: 'выбрать тип минваты',
            currentGkla: 'default',
            currentWool: 'default',
            unvisible: false,
            errorMessage: 'true',
            tableConstrToCalc: null,
            counterConstr: 0,
            visible: false,
            currentCategory: 0,
            currentSubCategory: 0,
            currentItems: 0,
            template: null,
            profileStep: 600,
            dFrame: false,
            counters: null,
            currentConstr: '',
            ConstrToCalcToSent: [],
            ConstrToCalc: [],
            constR: {
                id: '',
                idType: '',
                title: '',
                type: '',
                lenX: null,
                lenXp: null,
                lenY: null,
                lenZ: null,
                lenZp: null,
                description: '',
                img: '',
                step: null,
                ag_id: '',
                key_id: null,
                AddCeilShift: 0
            },
            constRZero: {
                id: '',
                idType: '',
                title: '',
                type: '',
                lenX: null,
                lenY: null,
                lenZ: null,
                description: '',
                img: '',
                step: null,
                ag_id: '',
                key_id: null,
                AddCeilShift: 0,
            },
            constrSent: {
                Code: '',
                LenX: 0,
                LenY: 0,
                LenZ: 0,
                dframe: false,
                Area: 0,
                Perimeter: 0,
                step: 0,
                AddCeilShift: 0,
                Openings: [],
            },
            opening: {
                lenX: null,
                lenZ: null,
                Type: 'OST_Doors',
            },
            constSentZero: {
                Code: '',
                LenX: 0,
                LenY: 0,
                LenZ: 0,
                dframe: false,
                Area: 0,
                Perimeter: 0,
                step: 0,
                AddCeilShift: 0,
                Openings: [],
            },
            openingZero: {
                lenX: null,
                lenZ: null,
                Type: 'OST_Doors',
            },
          
            Categories: [
                { id: 1, title: 'РЕШЕНИЯ ПО ЗВУКОИЗОЛЯЦИИ', background: '#248CB9' },
                { id: 2, title: 'АКУСТИЧЕСКИЕ РЕШЕНИЯ', background: '#11556F' },
            ],
            SubCategories: [
                { id: 'F', title: 'ПОЛ', c_id: 1, img: '../../../Img_constr/icon_floor_white.svg', imgBlack: 'img/icon_floor.svg' },
                { id: 'C', title: 'ПОТОЛОК', c_id: 1, img: '../../../Img_constr/icon_ceiling_white.svg', imgBlack: 'img/icon_ceiling.svg' },
                { id: 'L', title: 'ОБЛИЦОВКА', c_id: 1, img: '../../../Img_constr/icon_frame_white.svg', imgBlack: 'img/icon_frame.svg' },
                { id: 'W', title: 'ПЕРЕГОРОДКА', c_id: 1, img: '../../../Img_constr/icon_partition_white.svg', imgBlack: 'img/icon_partittion.svg' },
                { id: 5, title: 'ОБЛИЦОВКА', c_id: 2, img: '../../../Img_constr/icon_frame_white.svg' },
                { id: 6, title: 'ПОТОЛОК', c_id: 2, img: '../../../Img_constr/icon_ceiling_white.svg' },
            ],
            Items: [
                {
                    id: 1111,
                    title: 'Акустическая облицовка SOUNDBOARD',
                    description: 'Облицовка стен декоративно-акустическими панелями SOUNDBOARD',
                    c_id: '5',
                    template: 201,
                    img: '/photo_2024-01-27_23-54-07.jpg',
                    ag_id: 'AG.LSBfr'
                },
                {
                    id: 1112,
                    title: 'Акустический потолок SOUNDBOARD/РАЗДЕЛ В РАЗРАБОТКЕ',
                    description: 'Потолок с применеием декоративно-акустических панелей SOUNDBOARD',
                    c_id: '6',
                    template: 202,
                    img: '/photo_2024-01-27_23-54-07.jpg',
                    ag_id: 'SB.CE'
                },
                {
                    id: 101,
                    title: 'Перегородка на каркасе 50 мм',
                    description: 'Перегородка на одинарном каркасе 50 мм',
                    c_id: 'W',
                    template: 50.1,
                    img: '/Img_constr/partition/partition_50.webp',
                    ag_id: 'AG.W101'
                },
                {
                    id: 102,
                    title: 'Перегородка на каркасе 75 мм',
                    description: 'Перегородка на одинарном каркасе 75 мм',
                    c_id: 'W',
                    template: 75.1,
                    img: '/Img_constr/partition/partition_75.webp',
                    ag_id: 'AG.W102'
                },
                {
                    id: 103,
                    title: 'Перегородка на каркасе 100 мм',
                    description: 'Перегородка на одинарном каркасе 100 мм',
                    c_id: 'W',
                    template: 100.1,
                    img: '/Img_constr/partition/partition_100.webp',
                    ag_id: 'AG.W103'
                },
                {
                    id: 104,
                    title: 'Перегородка на каркасе Wave 100 мм',
                    description: 'Перегородка на одинарном каркасе Виброфлекс-Wave 100 мм',
                    c_id: 'W',
                    template: 101.1,
                    img: '/Img_constr/partition/partition_100.webp',
                    ag_id: 'AG.W104'
                },
                {
                    id: 105,
                    title: 'Перегородка на каркасе 2x50 мм',
                    description: 'Перегородка на двойном (независимом) сдвоенном каркасе 2x50 мм на раздельных основаниях звукоизолирующих полов',
                    c_id: 'W',
                    template: 50.2,
                    img: '/Img_constr/partition/partition_50_2.webp',
                    ag_id: 'AG.W105'
                },
                {
                    id: 106,
                    title: 'Перегородка на каркасе 2x75 мм',
                    description: 'Перегородка на двойном (независимом) сдвоенном каркасе 2x75 мм на раздельных основаниях звукоизолирующих полов',
                    c_id: 'W',
                    template: 75.2,
                    img: '/Img_constr/partition/partition_75_2.webp',
                    ag_id: 'AG.W106'
                },
                {
                    id: 107,
                    title: 'Перегородка на каркасе 2x100 мм',
                    description: 'Перегородка на двойном (независимом) сдвоенном каркасе 2x100 мм на раздельных основаниях звукоизолирующих полов',
                    c_id: 'W',
                    template: 100.2,
                    img: '/Img_constr/partition/partition_100_2.webp',
                    ag_id: 'AG.W107'
                },
                {
                    id: 108,
                    title: 'Перегородка системы Саундлайн dB-X AL',
                    description: 'Перегородка системы Саундлайн dB-X AL на одинарном каркасе 50 мм',
                    c_id: 'W',
                    template: 8.1,
                    img: '/Img_constr/partition/partition_50.webp',
                    ag_id: 'AG.W108'
                },

                {
                    id: 201,
                    title: 'ЗИПС-Вектор',
                    description: 'Звукоизолирующая система ЗИПС-Вектор, смонтированная на стене',
                    c_id: 'L',
                    template: 6,
                    img: '/Img_constr/frame/frame_z_vektor.webp',
                    ag_id: 'AG.Z201'
                },
                {
                    id: 202,
                    title: 'ЗИПС-Модуль',
                    description: 'Звукоизолирующая система ЗИПС-Модуль, смонтированная на стене',
                    c_id: 'L',
                    template: 6,
                    img: '/Img_constr/frame/frame_z_module.webp',
                    ag_id: 'AG.Z202'
                },
                {
                    id: 203,
                    title: 'ЗИПС-III-Ультра',
                    description: 'Звукоизолирующая система ЗИПС-III-Ультра, смонтированная на стене',
                    c_id: 'L',
                    template: 6,
                    img: '/Img_constr/frame/frame_IIIUltra.webp',
                    ag_id: 'AG.Z203'

                },
                {
                    id: 204,
                    title: 'ЗИПС-Z4',
                    description: 'Звукоизолирующая система ЗИПС-Z4, смонтированная на стене',
                    c_id: 'L',
                    template: 6,
                    img: '/Img_constr/frame/frame_Z4.webp',
                    ag_id: 'AG.Z204'

                },
                {
                    id: 205,
                    title: 'ЗИПС-Синема',
                    description: 'Звукоизолирующая система ЗИПС-Синема, смонтированная на стене',
                    c_id: 'L',
                    template: 6,
                    img: '/Img_constr/frame/frame_z_cinema.webp',
                    ag_id: 'AG.Z205'
                },
                {
                    id: 206,
                    title: 'ЗИПС-Слим',
                    description: 'Звукоизолирующая система ЗИПС-Слим, смонтированная на стене',
                    c_id: 'L',
                    template: 6,
                    img: '/Img_constr/frame/frame_z_slim.webp',
                    ag_id: 'AG.Z206'
                },

                {
                    id: 201,
                    title: 'ЗИПС-Вектор',
                    description: 'Звукоизолирующая система ЗИПС-Вектор, смонтированная на потолке',
                    c_id: 'C',
                    template: 4,
                    img: '/Img_constr/ceiling/ceiling_z_vektor.webp',
                    ag_id: 'AG.Z201'
                },
                {
                    id: 202,
                    title: 'ЗИПС-Модуль',
                    description: 'Звукоизолирующая система ЗИПС-Модуль, смонтированная на потолке',
                    c_id: 'C',
                    template: 4,
                    img: '/Img_constr/ceiling/ceiling_z_module.webp',
                    ag_id: 'AG.Z202'
                },
                {
                    id: 203,
                    title: 'ЗИПС-III-Ультра',
                    description: 'Звукоизолирующая система ЗИПС-III-Ультра, смонтированная на потолке',
                    c_id: 'C',
                    template: 4,
                    img: '/Img_constr/ceiling/ceiling_IIIultra.webp',
                    ag_id: 'AG.Z203'
                },
                {
                    id: 204,
                    title: 'ЗИПС-Z4',
                    description: 'Звукоизолирующая система ЗИПС-Z4, смонтированная на потолке',
                    c_id: 'C',
                    template: 4,
                    img: '/Img_constr/ceiling/ceiling_z4.webp',
                    ag_id: 'AG.Z204'
                },
                {
                    id: 205,
                    title: 'ЗИПС-Синема',
                    description: 'Звукоизолирующая система ЗИПС-Синема, смонтированная на потолке',
                    c_id: 'C',
                    template: 4,
                    img: '/Img_constr/ceiling/ceiling_z_cinema.webp',
                    ag_id: 'AG.Z205'
                },
                {
                    id: 401,
                    title: 'Облицовка на каркасе 50 мм',
                    description: 'Облицовка на независимом сдвоенном каркасе 50 мм',
                    c_id: 'L',
                    template: 50,
                    img: '/Img_constr/frame/frame_50.webp',
                    ag_id: 'AG.L401'
                },
                {
                    id: 402,
                    title: 'Облицовка на каркасе 75 мм',
                    description: 'Облицовка на независимом каркасе 75 мм',
                    c_id: 'L',
                    template: 75,
                    img: '/Img_constr/frame/frame_75.webp',
                    ag_id: 'AG.L402'
                },
                {
                    id: 403,
                    title: 'Облицовка на каркасе 100 мм',
                    description: 'Облицовка на независимом каркасе 100 мм',
                    c_id: 'L',
                    template: 100,
                    img: '/Img_constr/frame/frame_100.webp',
                    ag_id: 'AG.L403'
                },
                {
                    id: 404,
                    title: 'Облицовка c применением Виброфлекс-Коннект ПС',
                    description: 'Облицовка на каркасе ПП 60/27 с применением креплений Виброфлекс-Коннект ПС',
                    c_id: 'L',
                    template: 101,
                    img: '/Img_constr/frame/frame_connect_pc.webp',
                    ag_id: 'AG.L404'
                },
                {
                    id: 405,
                    title: 'Облицовка с применением Виброфлекс-КС',
                    description: 'Облицовка на каркасе ПП 60/27 с применением креплений Виброфлекс-КС',
                    c_id: 'L',
                    template: 101,
                    img: '/Img_constr/frame/frame_connect_kc.webp',
                    ag_id: 'AG.L405'
                },

                {
                    id: 501,
                    title: 'Потолок на креплениях Виброфлекс-Коннект ПП',
                    description: 'Подвесной потолок, смонтированный на креплениях Виброфлекс-Коннект ПП',
                    c_id: 'C',
                    template: 5,
                    img: '/Img_constr/ceiling/ceiling_100.webp',
                    ag_id: 'AG.C501'
                },
                {
                    id: 502,
                    title: 'Потолок на креплениях Виброфлекс-К15',
                    description: 'Подвесной потолок, смонтированный на креплениях Виброфлекс-К15',
                    c_id: 'C',
                    template: 5,
                    img: '/Img_constr/ceiling/ceiling_130.webp',
                    ag_id: 'AG.C502'
                },
                {
                    id: 503,
                    title: 'Потолок на креплениях Виброфлекс-К15 с удлинителями',
                    description: 'Подвесной потолок, смонтированный на креплениях Виброфлекс-К15 с удлинителями из профиля ПП 60/27',
                    c_id: 'C',
                    template: 5,
                    img: '/Img_constr/ceiling/ceiling_200.webp',
                    ag_id: 'AG.C503'
                },

                {
                    id: 601,
                    title: 'Пол Акуфлекс-Супер, паркет, 15мм',
                    description: 'Паркетная доска 15 мм на материале Акуфлекс-Супер',
                    c_id: 'F',
                    template: 1,
                    img: '/Img_constr/floor/acuflexLP.png',
                    ag_id: 'AG.F601'

                },
                {
                    id: 602,
                    title: 'Пол Акуфлекс-Супер, ламинат, 8 мм',
                    description: 'Ламинат 8 мм на материале Акуфлекс-Супер',
                    c_id: 'F',
                    template: 1,
                    img: '/Img_constr/floor/acuflexLP.png',
                    ag_id: 'AG.F602'
                },
                {
                    id: 603,
                    title: 'Пол Акуфлекс-Супер, стяжка, 65 мм',
                    description: 'Звукоизолирующий пол на материале Акуфлекс-Супер',
                    c_id: 'F',
                    template: 1,
                    img: '/Img_constr/floor/acuflex.png',
                    ag_id: 'AG.F603'
                },
                {
                    id: 604,
                    title: 'Пол Шуманет-100Комби',
                    description: 'Звукоизолирующий пол на материале Шуманет-100Комби',
                    c_id: 'F',
                    template: 1,
                    img: '/Img_constr/floor/100G_K.png',
                    ag_id: 'AG.F604'

                },
                {
                    id: 605,
                    title: 'Пол Шуманет-100Гидро',
                    description: 'Звукоизолирующий пол на материале Шуманет-100Гидро',
                    c_id: 'F',
                    template: 1,
                    img: '/Img_constr/floor/100G_K.png',
                    ag_id: 'AG.F605'
                },
                {
                    id: 606,
                    title: 'Пол Шумопласт',
                    description: 'Звукоизолирующая выравнивающая смесь Шумопласт',
                    c_id: 'F',
                    template: 9,
                    img: '/Img_constr/floor/sPlast.png',
                    ag_id: 'AG.F606'
                },
                {
                    id: 'P',
                    title: 'Акуфлор S20, один слой',
                    description: 'Звукоизолирующий пол с одним слоем системы плит Акуфлор S20',
                    c_id: 'F',
                    template: 2.1,
                    img: '/Img_constr/floor/c2k2_1.png',
                    ag_id: 'AG.F'

                },
                {
                    id: 607,
                    title: 'Пол Шумостоп-С2/К2, один слой',
                    description: 'Звукоизолирующий пол с одним слоем системы плит Шумостоп-С2/К2',
                    c_id: 'F',
                    template: 607.1,
                    img: '/Img_constr/floor/c2k2_1.png',
                    ag_id: 'AG.F607'
                },
                {
                    id: 608,
                    title: 'Пол Шумостоп-С2/К2, два слоя',
                    description: 'Звукоизолирующий пол с двумя слоями системы плит Шумостоп-С2/К2',
                    c_id: 'F',
                    template: 608.1,
                    img: '/Img_constr/floor/c2k2_2.png',
                    ag_id: 'AG.F608'
                },
                {
                    id: 609,
                    title: 'Пол Шумостоп-К2, один слой',
                    description: 'Звукоизолирующий пол с одним слоем материала Шумостоп-К2',
                    c_id: 'F',
                    template: 609.1,
                    img: '/Img_constr/floor/k2_1.png',
                    ag_id: 'AG.F609'
                },
                {
                    id: 610,
                    title: 'Пол Шумостоп-К2, два слоя',
                    description: 'Звукоизолирующий пол с двумя слоями материала Шумостоп-К2',
                    c_id: 'F',
                    template: 610.1,
                    img: '/Img_constr/floor/k2_2.png',
                    ag_id: 'AG.F610'
                },
                {
                    id: 611,
                    title: 'Пол Шуманет-Термо',
                    description: 'Звукоизолирующий пол с одним слоем материала Шуманет-Термо',
                    c_id: 'F',
                    template: 1,
                    img: '/Img_constr/floor/termo.png',
                    ag_id: 'AG.F611'
                },
                {
                    id: 612,
                    title: 'Пол Шумостоп-Техно',
                    description: 'Звукоизолирующий пол с применением панелей Шумостоп-Техно',
                    c_id: 'F',
                    template: 9.1,
                    img: '/Img_constr/floor/tehno.png',
                    ag_id: 'AG.F612'
                },
                {
                    id: 613,
                    title: 'ЗИПС-ПОЛ Вектор',
                    description: 'Сборная звукоизолирующая система ЗИПС-ПОЛ Вектор',
                    c_id: 'F',
                    template: 111,
                    img: '/Img_constr/floor/Z_Vector.png',
                    ag_id: 'AG.F613'
                },
                {
                    id: 614,
                    title: 'ЗИПС-ПОЛ Модуль',
                    description: 'Сборная звукоизолирующая система ЗИПС-ПОЛ Модуль',
                    c_id: 'F',
                    template: 111,
                    img: '/Img_constr/floor/Z_Module.png',
                    ag_id: 'AG.F614'
                },
                {
                    id: 615,
                    title: 'Звукоизолирующий пол на лагах',
                    description: 'Звукоизолирующий пол на лагах',
                    c_id: 'F',
                    template: 3,
                    img: '/Img_constr/floor/floor_lags.png',
                    ag_id: 'AG.F615'
                },
            ],
            SizeLimits: [
                { id: 'W', id_constr: 101, step: '600', max_lenZ: 4000 },
                { id: 'W', id_constr: 101, step: '400', max_lenZ: 5000 },
                { id: 'W', id_constr: 101, step: '300', max_lenZ: 6000 },

                { id: 'W', id_constr: 102, step: '600', max_lenZ: 5500 },
                { id: 'W', id_constr: 102, step: '400', max_lenZ: 6500 },
                { id: 'W', id_constr: 102, step: '300', max_lenZ: 7500 },

                { id: 'W', id_constr: 103, step: '600', max_lenZ: 6500 },
                { id: 'W', id_constr: 103, step: '400', max_lenZ: 7500 },
                { id: 'W', id_constr: 103, step: '300', max_lenZ: 8500 },

                { id: 'W', id_constr: 104, step: '600', max_lenZ: 6500 },
                { id: 'W', id_constr: 104, step: '400', max_lenZ: 7500 },
                { id: 'W', id_constr: 104, step: '300', max_lenZ: 8500 },

                { id: 'W', id_constr: 105, step: '600', max_lenZ: 4500 },
                { id: 'W', id_constr: 105, step: '400', max_lenZ: 5500 },
                { id: 'W', id_constr: 105, step: '300', max_lenZ: 6500 },

                { id: 'W', id_constr: 106, step: '600', max_lenZ: 6000 },
                { id: 'W', id_constr: 106, step: '400', max_lenZ: 7000 },
                { id: 'W', id_constr: 106, step: '300', max_lenZ: 8000 },

                { id: 'W', id_constr: 107, step: '600', max_lenZ: 6500 },
                { id: 'W', id_constr: 107, step: '400', max_lenZ: 7500 },
                { id: 'W', id_constr: 107, step: '300', max_lenZ: 8500 },

                { id: 'W', id_constr: 108, step: '600', max_lenZ: 3000 },
                { id: 'W', id_constr: 108, step: '400', max_lenZ: 4000 },
                { id: 'W', id_constr: 108, step: '300', max_lenZ: 5000 },

                { id: 'L', id_constr: 401, step: '600', max_lenZ: 3000 },
                { id: 'L', id_constr: 401, step: '400', max_lenZ: 3500 },
                { id: 'L', id_constr: 401, step: '300', max_lenZ: 4000 },

                { id: 'L', id_constr: 402, step: '600', max_lenZ: 3500 },
                { id: 'L', id_constr: 402, step: '400', max_lenZ: 4000 },
                { id: 'L', id_constr: 402, step: '300', max_lenZ: 4500 },

                { id: 'L', id_constr: 403, step: '600', max_lenZ: 4250 },
                { id: 'L', id_constr: 403, step: '400', max_lenZ: 5000 },
                { id: 'L', id_constr: 403, step: '300', max_lenZ: 5500 },

                { id: 'L', id_constr: 404, step: '600', max_lenZ: 10000 },
                { id: 'L', id_constr: 404, step: '400', max_lenZ: 10000 },
                { id: 'L', id_constr: 404, step: '300', max_lenZ: 10000 },

                { id: 'L', id_constr: 405, step: '600', max_lenZ: 10000 },
                { id: 'L', id_constr: 405, step: '400', max_lenZ: 10000 },
                { id: 'L', id_constr: 405, step: '300', max_lenZ: 10000 },

                { id: 'Z.', id_constr: 201, step: '600', max_lenZ: 6000 },
                { id: 'Z.', id_constr: 202, step: '600', max_lenZ: 6000 },
                { id: 'Z.', id_constr: 203, step: '600', max_lenZ: 6000 },
                { id: 'Z.', id_constr: 204, step: '600', max_lenZ: 6000 },
                { id: 'Z.', id_constr: 205, step: '600', max_lenZ: 6000 },
                { id: 'Z.', id_constr: 206, step: '600', max_lenZ: 6000 },

            ],
            calculatedMaterials: []

        }
    },
    created() {
        const id = this.$route.params.id

        if (id != null) {
            this.currentCategory = 1

            const item = this.Items.find((item) => item.ag_id === id)

            if (item) {
                const subCategory = this.SubCategories.find((subCategory) => subCategory.id === item.c_id);

                if (subCategory) {
                    this.currentItems = item.id
                    this.currentSubCategory = subCategory.id
                }
            }
        }
    },
    computed:
    {
        getActiveCategories() {
            if (this.currentCategory != 0) {
                return this.Categories.filter((el) => el.id == this.currentCategory);
            }
            else return this.Categories;
        },
        getSubCategories() {
            if (this.currentCategory != 0) {
                if (this.currentSubCategory != 0) {
                    return this.SubCategories.filter((el) => el.id == this.currentSubCategory)
                }
                return this.SubCategories.filter((el) => el.c_id == this.currentCategory)
            }
            this.currentSubCategory = 0;
            this.tableConstrToCalc = null;

        },
        getItems() {
            if (this.currentSubCategory != 0) {
                if (this.currentItems != 0) {
                    let item = this.Items.filter((el) => el.id == this.currentItems && el.c_id == this.currentSubCategory);
                    item.forEach((element) => {
                        this.template = element.template;
                        this.tableConstrToCalc = 1;
                        this.currentConstr = element.ag_id;

                    });

                    return item;
                }
                this.template = null;
                this.visible = false;
                return this.Items.filter((el) => el.c_id == this.currentSubCategory)
            }
            this.currentItems = 0;
            this.template = null;
            this.visible = false;
            this.dFrame = false;
            this.constR = { ...this.constRZero };
        },

    },
    methods:
    {
        hasHistory() {
            return window.history.length > 2
        },
        getContsCodeByMaterials() {
            if (this.currentGkla == 'default' && this.currentWool == 'default') {
                return this.currentConstr
            } else if (this.currentGkla == 'default') {
                return this.currentConstr + '_' + this.currentWool
            } else if (this.currentWool == 'default') {
                return this.currentConstr + '_' + this.currentGkla
            }
            return this.currentConstr + '_' + this.currentGkla + '_' + this.currentWool

        }, 
        convertUnits(material) {
            var quantityInM2;
            if (material.Units == 'м2') {
                quantityInM2 = material.Quantity / 1e6
                return quantityInM2.toFixed(2)
            }
            return material.Quantity
        },
        filterVariable(variable) {
            // Проверяем, является ли первый символ цифрой
            if (/^\d/.test(variable)) {
                return variable;
            } else {
                return "---";
            }
        },
        getStartParam() {

            this.unvisible = !this.unvisible;
        },
        delFromOpenings(index) {
            this.constrSent.Openings.splice(index, 1);
        },
        getOpeningType(Type) {
            if (Type == 'OST_Doors') return 'дверь'
            return 'окно'
        },
        addOpening() {
            this.constrSent.Openings.push({ ...this.opening });
            console.log(this.constrSent.Openings);
            this.opening = { ...this.openingZero };
        },
        setConstrFromCalcToSent() {
            this.constR.step = +this.profileStep;
            this.constrSent.Code = this.getContsCodeByMaterials();
            this.constrSent.LenX = this.constR.lenX;
            this.constrSent.LenY = this.constR.lenY;
            this.constrSent.LenZ = this.constR.lenZ;
            this.constrSent.AddCeilShift = this.constR.AddCeilShift;
            this.constrSent.step = this.constR.step;
            this.constrSent.dframe = this.dFrame;

            if (this.constrSent.Code == 'AG.L401' || this.constrSent.Code == 'AG.W101' || this.constrSent.Code == 'AG.W105'
            ) {
                this.constrSent.dframe = true
            }
            if (this.constrSent.Code == 'AG.F615' || this.constrSent.Code == 'AG.F615_vibroflex_LD' && this.profileStep == 600) {
                this.constrSent.step = 400
            }
        },
        delConstrFromList(idConstr) {
            let indexToDel = this.ConstrToCalc.findIndex((el) => el.key_id == idConstr);
            this.ConstrToCalc.splice(indexToDel, 1);
            this.ConstrToCalcToSent.splice(indexToDel, 1);
            this.calcConstruction(this.ConstrToCalcToSent);

        },
        checkInput() {

           var objectX;
           var max_constr_size;
           if (this.currentSubCategory == 'W') {
                objectX = (this.SizeLimits.find(el => el.id_constr == this.currentItems && el.step == this.profileStep));
                max_constr_size = objectX.max_lenZ; 

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 100) return '<span class="p1">Введите правильную ширину</span> <br> Минимальная ШИРИНА конструкции 100 мм';
                else if (+this.constR.lenX > 50000) return '<span class="p1">Введите правильную ширину</span> <br> В конструкциях ШИРИНОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
                else if (isNaN(+this.constR.lenZ) || +this.constR.lenZ < 100) return '<span class="p1">Введите правильную высоту</span> <br> Минимальная ВЫСОТА конструкции 100 мм';
                else if (+this.constR.lenZ > max_constr_size) return '<span class="p1">Введите правильную высоту</span> <br>Максимальная ВЫСОТА конструкции указана в меню выбора шага профиля';
            }
            else if (this.currentSubCategory == 'L' && this.template != 6) {
                objectX = (this.SizeLimits.find(el => el.id_constr == this.currentItems && el.step == this.profileStep));
                max_constr_size = objectX.max_lenZ;

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 100) return '<span class="p1">Введите правильную ширину</span> <br>Минимальная ШИРИНА конструкции 100 мм';
                else if (+this.constR.lenX > 50000) return '<span class="p1">Введите правильную ширину</span> <br>В конструкциях ШИРИНОЙ свыше 15 метров необходимо устраивать  температурные(деформационные) швы';
                else if (isNaN(+this.constR.lenZ) || +this.constR.lenZ < 100) return '<span class="p1">Введите правильную высоту</span> <br>Минимальная ВЫСОТА конструкции 100 мм';
                else if (+this.constR.lenZ > max_constr_size) return '<span class="p1">Введите правильную высоту</span> <br>Максимальная ВЫСОТА конструкции указана в меню выбора шага профиля';
            }
            else if (this.currentSubCategory == 'L' && this.template == 6) {
                objectX = (this.SizeLimits.find(el => el.id_constr == this.currentItems && el.step == this.profileStep));
                max_constr_size = objectX.max_lenZ;

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 200) return '<span class="p1">Введите правильную ширину</span> <br>Минимальный размер обрезанной панели ЗИПС,пригодной к монтажу,составляет 200 мм.На обрезанном фрагменте должны присутствовать минимум 2 виброузла и 2 регулиремые опоры для панелей ЗИПС-Z4';
                else if (+this.constR.lenX > 50000) return '<span class="p1">Введите правильную ширину</span> <br>В конструкциях ШИРИНОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
                else if (isNaN(+this.constR.lenZ) || +this.constR.lenZ < 200) return '<span class="p1">Введите правильную высоту</span> <br>Минимальный размер обрезанной панели ЗИПС,пригодной к монтажу,составляет 200 мм.На обрезанном фрагменте должны присутствовать минимум 2 виброузла и 2 регулиремые опоры для панелей ЗИПС-Z4';
                else if (+this.constR.lenZ > max_constr_size) return '<span class="p1">Введите правильную высоту</span> <br>При монтаже панельной системы ЗИПС на ВЫСОТУ более 6 м рекомендуется устраивать деформационный шов  ';
            }
            else if (this.currentSubCategory == 'C' && this.template == 5) {

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 250) return '<span class="p1">Введите правильную ширину</span> <br>Минимальная ШИРИНА конструкции 250 мм';
                else if (+this.constR.lenX > 50000) return '<span class="p1">Введите правильную ширину</span> <br>В конструкциях ШИРИНОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
                else if (isNaN(+this.constR.lenY) || +this.constR.lenY < 250) return '<span class="p1">Введите правильную длину</span> <br>Минимальная ДЛИНА конструкции 250 мм';
                else if (+this.constR.lenY > 50000) return '<span class="p1"><span class="p1">Введите правильную длину</span></span> <br>В конструкциях ДЛИНОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
            }
            else if (this.currentSubCategory == '5' && this.template == 201) {

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 250) return '<span class="p1">Введите правильную ширину</span> <br>Минимальная ШИРИНА конструкции 250 мм';
                else if (+this.constR.lenX > 50000) return '<span class="p1">Введите правильную ширину</span> <br>В конструкциях ШИРИНОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
                else if (isNaN(+this.constR.lenZ) || +this.constR.lenZ < 250) return '<span class="p1">Введите правильную высоту</span> <br>Минимальная ВЫСОТА конструкции 250 мм';
                else if (+this.constR.lenZ > 50000) return '<span class="p1"><span class="p1">Введите правильную высоту</span></span> <br>В конструкциях ВЫСОТОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
            }
            else if (this.currentSubCategory == '6' && this.template == 202) {

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 250) return '<span class="p1">Введите правильную ширину</span> <br>Минимальная ШИРИНА конструкции 250 мм';
                else if (+this.constR.lenX > 50000) return '<span class="p1">Введите правильную ширину</span> <br>В конструкциях ШИРИНОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
                else if (isNaN(+this.constR.lenY) || +this.constR.lenY < 250) return '<span class="p1">Введите правильную длину</span> <br>Минимальная ДЛИНА конструкции 250 мм';
                else if (+this.constR.lenY > 50000) return '<span class="p1"><span class="p1">Введите правильную длину</span></span> <br>В конструкциях ДЛИНОЙ свыше 15 метров необходимо устраивать температурные(деформационные) швы';
            }
            else if (this.currentSubCategory == 'F' && this.template != 111 && this.template != 3) {

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 500) return '<span class="p1">Введите правильную ширину</span> <br>Минимальная ШИРИНА конструкции 500 мм';
                else if (+this.constR.lenX > 30000) return '<span class="p1">Введите правильную ширину</span> <br>Деформационные и термоусадочные швы устраиваются по необходимости в соответсвии с требованиями СП 29.13330.2011. Расстояние между деформационными швами не должно превышать 18 метров';
                else if (isNaN(+this.constR.lenY) || +this.constR.lenY < 500) return '<span class="p1">Введите правильную длину</span> <br>Минимальная ДЛИНА конструкции 500 мм';
                else if (+this.constR.lenY > 30000) return '<span class="p1">Введите правильную длину</span> <br>Деформационные и термоусадочные швы устраиваются по необходимости в соответсвии с требованиями СП 29.13330.2011. Расстояние между деформационными швами не должно превышать 18 метров';
            }
            else if (this.currentSubCategory == 'F' && this.template == 111) {

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 200) return '<span class="p1">Введите правильную ширину</span> <br>Обрезанные панели ЗИПС ШИРИНОЙ менее 200 мм не используются';
                else if (+this.constR.lenX > 30000) return '<span class="p1">Введите правильную ширину</span> <br>Акустические швы в обязательном порядке устраиваются в дверных проемах,а также в местах сооружения звукоизоляционных перегородок';
                else if (isNaN(+this.constR.lenY) || +this.constR.lenY < 200) return '<span class="p1">Введите правильную длину</span> <br>Обрезанные панели ЗИПС ДЛИНОЙ менее 200 мм не используются';
                else if (+this.constR.lenY > 30000) return '<span class="p1">Введите правильную длину</span> <br>Акустические швы в обязательном порядке устраиваются в дверных проемах,а также в местах сооружения звукоизоляционных перегородок';
            }
            else if (this.currentSubCategory == 'F' && this.template == 3) {

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 500) return '<span class="p1">Введите правильную ширину</span> <br>Минимальная ШИРИНА конструкции 500 мм';
                else if (+this.constR.lenX > 30000) return '<span class="p1">Введите правильную ширину</span> <br>Акустические швы в обязательном порядке устраиваются в дверных проемах,а также в местах сооружения звукоизоляционных перегородок';
                else if (isNaN(+this.constR.lenY) || +this.constR.lenY < 500) return '<span class="p1">Введите правильную длину</span> <br>Минимальная ДЛИНА конструкции 500 мм';
                else if (+this.constR.lenY > 30000) return '<span class="p1">Введите правильную длину</span> <br>Акустические швы в обязательном порядке устраиваются в дверных проемах,а также в местах сооружения звукоизоляционных перегородок';
            }
            else if (this.currentSubCategory == 'C' && this.template == 4) {

                if (isNaN(+this.constR.lenX) || +this.constR.lenX < 200) return '<span class="p1">Введите правильную ширину</span> <br>Минимальный размер обрезанной панели ЗИПС,пригодной к монтажу,составляет 200 мм.На обрезанном фрагменте должны присутствовать минимум 2 виброузла и 2 регулиремые опоры для панелей ЗИПС-Z4';
                else if (+this.constR.lenX > 50000) return '<span class="p1">Введите правильную ширину</span> <br>Акустические швы в обязательном порядке устраиваются в дверных проемах,а также в местах сооружения звукоизоляционных перегородок ';
                else if (isNaN(+this.constR.lenY) || +this.constR.lenY < 200) return '<span class="p1">Введите правильную длину</span> <br>Минимальный размер обрезанной панели ЗИПС,пригодной к монтажу,составляет 200 мм.На обрезанном фрагменте должны присутствовать минимум 2 виброузла и 2 регулиремые опоры для панелей ЗИПС-Z4';
                else if (+this.constR.lenY > 50000) return '<span class="p1">Введите правильную длину</span> <br>Акустические швы в обязательном порядке устраиваются в дверных проемах,а также в местах сооружения звукоизоляционных перегородок';
            }
            return null;

        },
        calcConstruction(constrList) {
            this.request('https://db.acoustic.ru:3005/api/v1/calcIsolation/byProduct', 'post', constrList, (data) => this.calculatedMaterials = data)
        },
        addConstrToCalc() {

            if (this.checkInput() == null) {
                let IconType = this.SubCategories.find((el) => el.id == this.currentSubCategory);
                this.constR.imgBlack = IconType.imgBlack;

                let Description = this.Items.find((el) => el.id == this.currentItems);
                this.constR.description = Description.description;

                this.constR.key_id = Date.now();

                let Constr = this.Items.find((el) => el.id == this.currentItems);
                this.constR.title = Constr.title;

                let ConstrType = this.SubCategories.find((el) => el.id == this.currentSubCategory);
                this.constR.type = ConstrType.title;

                let ConstrId = this.Items.find((el) => el.id == this.currentItems);
                this.constR.ag_id = ConstrId.ag_id;

                let StepProfile = this.Items.find((el) => el.id == this.currentItems);
                this.constR.step = StepProfile.step;

                this.setConstrFromCalcToSent();
                console.log(this.currentConstr);

                this.ConstrToCalcToSent.push({ ...this.constrSent });
                this.constrSent = { ...this.constSentZero };
                this.opening = { ...this.openingZero };
                this.ConstrToCalc.push({ ...this.constR });
                console.log(this.ConstrToCalc);
                this.constR = { ...this.constRZero };
                this.dFrame = false;
                this.calcConstruction(this.ConstrToCalcToSent);
                console.log(this.ConstrToCalcToSent);
                this.unvisible = false;
                this.profileStep = 600;
                this.currentGkla = 'default';
                this.currentWool = 'default';

            }
            else {
                Swal.fire({
                    html: this.checkInput(),
                    imageWidth: 60,
                    imageHeight: 50,
                    imageUrl: "../../../logo1.png",
                    confirmButtonText: "OK",
                    confirmButtonColor: '#6cabc8',

                });
            }
        },
        changeSubCategory(e) {
            this.currentSubCategory = e.target.value;
        },
        changeItems(e) {
            this.currentItems = e.target.value;
        },

        async request(url, method, data, callback) {
            let setting = null;

            if (method != 'get')
                setting = {
                    method,
                    body: JSON.stringify(data)
                }

            let res = await fetch(url, setting);
            let res_data = await res.json() //json parse

            callback(res_data);
        },
        tableToExcel() {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('My Sheet');

            // Функция для добавления данных таблицы в Excel-файл
            function addTableDataToSheet(tableId) {
                var table = document.getElementById(tableId);
                var rows = table.querySelectorAll('tr');

                // Получаем заголовки столбцов
                var headers = [];
                rows[0].querySelectorAll('th').forEach(th => {
                    var cell = worksheet.getCell(`A${worksheet.rowCount + 1}`);
                    cell.value = th.innerText;
                    cell.font = { bold: true, color: { argb: 'FF000000' } }; // Жирный текст
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCDCDC' } }; // Серый цвет заливки
                });

                // Добавляем данные из HTML-таблицы в Excel-файл
                for (var i = 1; i < rows.length; i++) {
                var data = [];
                var cells = rows[i].querySelectorAll('th,td');
                cells.forEach(td => data.push(td.innerText));
                worksheet.addRow(data);
                }
            
                // Добавляем пустую строку
                worksheet.addRow([]);
                }
            // Добавляем данные из первой таблицы в Excel-файл
            addTableDataToSheet("table1");

            // Добавляем данные из второй таблицы в Excel-файл
            addTableDataToSheet("table2");
                
                // Устанавливаем жирные границы для всех строк
                worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                    row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    });
                });
                /// Определение размера столбцов по содержимому
                worksheet.columns.forEach(function(column, i) {
                    var maxLength = 0;
                    column.eachCell({ includeEmpty: true }, function(cell) {
                        var columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength +2);
                    });
                // Устанавливаем ширину столбца с небольшим запасом
                column.width = maxLength < 10 ? 10 : maxLength ;
                });
                // Сохраняем файл
                workbook.xlsx.writeBuffer().then(function(buffer) {
                    var blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    saveAs(blob, "Tables.xlsx");
                });
        },
        copyTableToClipboard() {
    var table = document.getElementById("table2"); // Получаем вашу таблицу
    var rows = table.querySelectorAll('tr');
    var textToCopy = '';

    // Начинаем с 2-й строки, пропуская заголовки (предполагая, что они в первых двух строках)
    for (let i = 2; i < rows.length; i++) {
        var cells = rows[i].querySelectorAll('td');

        // Проверка, содержит ли первая ячейка '---'
        if (cells.length > 0 && cells[0].innerText.trim() === '---') {
            continue; // Пропускаем эту строку
        }

        var rowText = [];
        // Добавляем все ячейки, кроме последней
        for (let j = 0; j < cells.length - 1; j++) {
            rowText.push(cells[j].innerText);
        }

        textToCopy += rowText.join('\t') + '\n'; // Разделители столбцов в Excel
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Данные скопированы в буфер обмена. Для получения расчета конструкций необходимо вставить данные в ERP/Заказ клиента/Товары/Заполнить/Загрузить из внешнего файла/Артикул ');
        console.log('Таблица скопирована в буфер обмена');
    }).catch(err => {
        console.error('Ошибка при копировании: ', err);
    });
}
    }
}
</script>

<style scoped>
.p1 {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
}

.logo {
    height: 70px;
    position: absolute;
    top: 7px;
    left: 10px;
    filter: drop-shadow(2px 3px 3px #96b3cd);
    z-index: 11;
}

.logo-short {
    height: 70px;
    position: fixed;
    top: 5px;
    right: 15px;
    filter: drop-shadow(1px 2px 1px #fff);
    z-index: 11;
}

div {
    width: 340px;
    margin: auto;
    top: 10px;
    position: relative;
    font-family: 'Montserrat', sans-serif;
}

button {
    width: 100%;
    height: 120px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    border-radius: 10px;
    margin: 1px;
    margin-top: 5px;
    color: #fff;
    background: #848f99;
    box-shadow: 3px 1px 4px 0px #96b3cd;
    border: solid 1px darkgray;
    position: relative;
}

.counter__button_minus {
    border: none;
    box-shadow: none;
    font-size: 0;
    width: 25px;
    height: 1px;
    text-align: center;
    background: none;
    position: absolute;
}

.counter_input {
    border: solid 1px darkgray;
    position: absolute;
    color: gray;
    background: rgb(225 226 227);
    margin-left: 308px;
    height: 15px;
    width: 15px;
    text-align: center;
    margin-top: -48px;
    border-radius: 25%;
    font-size: 12px;
}

.type_page {
    top: 10px;
    height: 50%;
    position: relative;
    width: 48.7%;
    margin-left: 3px;
    z-index: 1;
}

.const_page {
    top: 10px;
    height: 160px;
    position: relative;
    width: 48.7%;
    display: inline-grid;
    margin-left: 3px;
    font-size: 12px;
    z-index: 1;
}

button:hover {
    opacity: 0.8;
}

.type_active {
    background: darkgray;
    color: #fff;
    height: 80px;
}

.const_active {
    background: darkgray;
    color: #fff;
    height: 60px;
}

span {
    color: #878181;
    justify-content: center;
    display: flex;
    font-size: 12px;
    pointer-events: none;
    font-weight: 600;
}

input {
    width: 47.3%;
    height: 30px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 6px;
    margin-left: 3px;
    margin-bottom: 2px;
    border: solid 1px darkgray;
    border-radius: 5px;
}

input.radio {
    height: 20px;
    width: 20px;
    display: block;
    position: absolute;
}

input.checkbox {
    height: 20px;
    width: 20px;
    display: block;
    position: absolute;
}

h4 {
    color: #878181;
    font-size: 14px;
    justify-content: center;
    display: grid;
    font-weight: 500;
}

.label {
    color: #878181;
    font-size: 14px;
    display: block;
    margin-left: 50px;
    padding-top: 2px;
    padding-bottom: 8px;
    margin-top: 2px;
}

.data {
    font-size: 12px;
    background-color: rgb(205 204 204);
    color: #6d7277;
    border-collapse: collapse;
    width: 340px;
}

.data th {
    padding: 3px;
    text-align: center;
    font-weight: 600;
}

.data td {
    padding: 3px;
    text-align: center;
}

.data tr:nth-child(even) {
    background-color: rgb(225 226 227);
    color: #737272;
}

.start_page {
    top: 120px;
    height: 120px;
    position: relative;
}

.img-icon {
    position: absolute;
    width: 99%;
    pointer-events: none;
    border-radius: 10px;
}

.img-icon-type {
    width: 90%;
    pointer-events: none;
    border-radius: 10px;
}

.counter__button_plus {
    width: 100%;
    height: 35px;
    border-radius: 8px;
    border: solid 1px rgb(255, 255, 255);
    box-shadow: none;
    filter: drop-shadow(0px 0px 2px black);
}

.counter__button_param {
    width: 100%;
    height: 35px;
    border-radius: 8px;
    border: solid 1px #6d7277;
    color: #6d7277;
    background: rgb(225 226 227);
}

.add_design_button {
    width: 50%;
    height: 35px;
    border-radius: 8px;
    border: solid 1px rgb(184, 178, 178);
}

/*----------------------------*/
div:where(.swal2-container) {
    display: grid;
    position: fixed;
    z-index: 1060;
    inset: 0;
    box-sizing: border-box;
    grid-template-areas:
        "top-start top top-end"
        "center-start center center-end"
        "bottom-start bottom-center bottom-end";
    grid-template-rows: minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);
    height: 100%;
    width: 100%;
    padding: 0.625em;
    overflow-x: hidden;
    transition: background-color .1s;
    -webkit-overflow-scrolling: touch;
}

div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm {
    border: 0;
    border-radius: 0.25em;
    background: initial;
    background-color: #6cabc8;
    color: #fff;
    font-size: 1em;
    height: 70px;
    width: 70px;
    position: relative;
    top: -100px;
}

div:where(.swal2-container).swal2-center>.swal2-popup {
    grid-column: 2;
    grid-row: 2;
    place-self: center center;
}

div:where(.swal2-container) .swal2-html-container {
    z-index: 1;
    justify-content: center;
    margin: 1em 1.6em 0.3em;
    padding: 30px;
    overflow: auto;
    color: inherit;
    font-size: 1.125em;
    font-weight: normal;
    line-height: normal;
    text-align: center;
    word-wrap: break-word;
    word-break: break-word;
    text-align: center;
    width: auto;
    top: 0;
}

.span_gkl {
    font-weight: 600;
    text-decoration: underline;
    margin-bottom: 10px;
}

.span_wool {
    font-weight: 600;
    text-decoration: underline;
    margin-bottom: 10px;
}
</style>