export enum MaterialUsage  {
    SoundIsolation = 'si',
    Acoustic = 'ac',
    VibroIsolation = 'vi'
}


export enum ConstructionsUsage {
    SoundIsolation = 'AllIsolationConstr',
}

export interface Material {
    Code: string
    Name: string
}

export interface Album {
    Name: string
}