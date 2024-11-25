export enum MaterialUsage {
  SoundIsolation = "si",
  Acoustic = "ac",
  VibroIsolation = "vi",
}

export enum Categories {
  Sound = "sound",
}

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
