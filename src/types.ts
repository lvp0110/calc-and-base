export enum MaterialUsage  {
    SoundIsolation = 'si',
    Acoustic = 'ac',
    VibroIsolation = 'vi'
}


export enum ConstructionsUsage {
    SoundIsolation = 'AllIsolationConstr',
}


export interface Filter {
    key: string
    name: string
    values: { name: string, value: string }[]
}

type Filters = Filter[]