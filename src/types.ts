export enum BrandParamPossibleCode {
  Model = "model",
  Color = "color",
  Size = "size",
  Perforation = "perf",
  EdgeTypes = "edge",
}

export enum MaterialUsage {
  SoundIsolation = "si",
  Acoustic = "ac",
  VibroIsolation = "vi",
}

export enum Categories {
  Sound = "sound",
  Acoustic = "acoustic",
  Vibroisolation = "vibro",
  Documents = "documents",
  Objects = "objects",
}

export const PathByCategory: Record<Categories, string> = {
  [Categories.Sound]: "soundproof",
  [Categories.Acoustic]: "acoustic",
  [Categories.Vibroisolation]: "vibration_isolation",
  [Categories.Documents]: "documents",
  [Categories.Objects]: "our-objects",
};

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
    { code: "materials", name: "МАТЕРИАЛЫ ДЛЯ МОНТАЖА" },
  ],
  [Categories.Vibroisolation]: [{ code: "materials", name: "МАТЕРИАЛЫ" }],
  [Categories.Documents]: [
    { code: "certificates", name: "СЕРТИФИКАТЫ" },
    { code: "air", name: "АЛЬБОМЫ ИНЖЕНЕРНЫХ РЕШЕНИЙ" },
    { code: "techcard", name: "ТЕХНОЛОГИЧЕСКИЕ КАРТЫ" },
    { code: "hookup", name: "МОНТАЖНЫЕ СХЕМЫ" },
    { code: "techlist", name: "ТЕХНИЧЕСКИЕ ЛИСТЫ" },
    { code: "protocol", name: "ПРОТОКОЛЫ ИСПЫТАНИЙ" },
    { code: "brochure", name: "КАТАЛОГИ | БРОШЮРЫ" },
    { code: "ral", name: "КАТАЛОГ RAL" },
  ],
  [Categories.Objects]: [],
};

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

export enum CertificateType {
  Brand = "byBrand",
  Model = "byModel",
  Material = "byMaterial",
}

export enum DocumentType {
  TypeDocCertificates = "certificate",
  TypeDocTechSheets = "techSheet",
  TypeDocTestProtocols = "testProtocol",
  TypeDocTechCards = "techCards",
  TypeDocRal = "ral",
}

export const SectionDocumentType: Record<string, DocumentType> = {
  certificates: DocumentType.TypeDocCertificates,
  tech_protocols: DocumentType.TypeDocTechSheets,
  test_protocol: DocumentType.TypeDocTestProtocols,
  tech_cards: DocumentType.TypeDocTechCards,
  ral: DocumentType.TypeDocRal,
};

export const DocumentTypeNames: Record<DocumentType, string> = {
  [DocumentType.TypeDocCertificates]: "Сертификаты",
  [DocumentType.TypeDocTechSheets]: "Технический лист",
  [DocumentType.TypeDocTestProtocols]: "Протоколы испытаний",
  [DocumentType.TypeDocTechCards]: "Технологические карты",
  [DocumentType.TypeDocRal]: "Каталог RAL",
};

export const DocumentTypeLink: Record<DocumentType, string> = {
  [DocumentType.TypeDocCertificates]: "certificates",
  [DocumentType.TypeDocTechSheets]: "techlist",
  [DocumentType.TypeDocTestProtocols]: "protocol",
  [DocumentType.TypeDocTechCards]: "techcard",
  [DocumentType.TypeDocRal]: "ral",
};
 