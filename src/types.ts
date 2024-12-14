export enum MaterialUsage {
  SoundIsolation = "si",
  Acoustic = "ac",
  VibroIsolation = "vi",
}

export enum Categories {
  Sound = "sound",
  Acoustic = "acoustic",
  Vibroisolation = "vibro",
  Documents = "Documents",
  Objects = "objects",
}

export interface SubCategory {
  code: string;
  name: string;
}

export const SubCategoriesByCategory: Record<Categories, SubCategory[]> = {
  [Categories.Sound]: [
    { code: "constructions", name: "КОНСТРУКЦИИ" },
    { code: "materials", name: "МАТЕРИАЛЫ" },
  ],
  [Categories.Acoustic]: [
    { code: "brands", name: "АКУСТИКА ПО БРЕНДАМ" },
    { code: "materials", name: "МАТЕРИАЛЫ" },
  ],
  [Categories.Vibroisolation]: [{ code: "materials", name: "МАТЕРИАЛЫ" }],
  [Categories.Documents]: [
    { code: "certificates", name: "СЕРТИФИКАТЫ" },
    { code: "air", name: "АЛЬБОМЫ ИНЖЕНЕРНЫХ РЕШЕНИЙ" },
    { code: "techcard", name: "ТЕХ.КАРТЫ" },
    { code: "hookup", name: "МОНТАЖНЫЕ СХЕМЫ" },
  ],
  [Categories.Objects]: [],
};

// -- +migrate Up

// INSERT INTO global_categories (code, name, description, img)
// VALUES ('sound',
//         'ЗВУКОИЗОЛЯЦИЯ',
//         ' Звукоизоляция ограждающих конструкций зданий — это совокупность мероприятий, ' ||
//         'направленных на снижение уровня шума, проникающего в помещения извне через ограждения зданий. ',
//        'soundproof.svg');

// INSERT INTO global_categories (code, name, description, img)
// VALUES ('acoustic',
//         'АКУСТИКА',
//         'Акустический комфорт и хорошее звучание являются одним из обязательных требований, ' ||
//         'для коммерческих и домашних кинотеатров, репетиционных залов, фойе общественных помещений, ' ||
//         'вестибюлей вокзалов и аэропортов, переговорных комнат, студийных помещений, спортивных залов, офисных помещений типа «open-air» и т.д.',
//         'acoustic.svg');

// INSERT INTO global_categories (code, name, description, img)
// VALUES ('vibro',
//         'ВИБРОИЗОЛЯЦИЯ',
//         'Большинство устройств современных жилых и офисных строений, отвечающих за их жизнеобеспечение,' ||
//         ' являются источником низкочастотных механических колебаний, распространяющихся по несущим конструкциям здания. ' ||
//         'Для снижения вибраций выполняется комплекс мероприятий под общим названием виброизоляция.',
//         'vibroisolanion.svg');

// INSERT INTO global_categories (code, name, description, img)
// VALUES ('documets',
//         'ДОКУМЕНТЫ',
//         'Сертификаты, Альбомы инженерных решений, Технологические карты, Монтажные схемы.',
//         'documents.svg');

// INSERT INTO global_categories (code, name, description, img)
// VALUES ('objects',
//         'НАШИ ОБЪЕКТЫ',
//         'О любой компании лучше всего говорят выполненные проекты. Все приведенные тут объекты реализованы нами ' ||
//         'или в тесном сотрудничестве с нами. Безусловно, тут представлены не все наши проекты.',
//         'object.svg');

export enum ConstructionsUsage {
  SoundIsolation = "AllIsolationConstr",
}

export interface Material {
  Code: string;
  Name: string;
}

export interface Album {
  Name: string;
}

export interface Filter {
  key: string;
  name: string;
  values: { name: string; value: string }[];
}

type Filters = Filter[];

export enum SectionTypes {
  Title = "Title",
  Image = "Image",
  Images = "Images",
  Text = "Text",
}

export interface BaseSection {
  type: SectionTypes;
  title?: string;
  img?: string;
}

export interface TitleSection extends BaseSection {
  type: SectionTypes.Title;
  content: string;
}

export interface ImageSection extends BaseSection {
  type: SectionTypes.Image;
  file: string;
}

export interface ImagesSection extends BaseSection {
  type: SectionTypes.Images;
  files: string[];
}

export interface TextSection extends BaseSection {
  type: SectionTypes.Text;
  content: string;
}

export type Section = TitleSection | ImageSection | ImagesSection | TextSection;

export interface SectionsResponse {
  data: Section[];
}

interface DiagramParams {
  begin_at_zero: boolean;
  min: number;
  max: number;
  step_size: number;
}

interface ChartItem {
  name: string;
  x_axis: number[];
  y_axis: number[];
}

interface ChartResponse {
  title: string;
  diagram_params: DiagramParams;
  items: ChartItem[];
}
