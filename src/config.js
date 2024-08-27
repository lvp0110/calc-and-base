import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const requestInstance = axios.create({
    baseURL,
})

export const materialsApi = {
    getMaterials: (usage) => requestInstance.get(`api/v1/Materials/${usage}`),
    getMarerialsWithSertificates: () => requestInstance.get('api/v1/MaterialsWithCerts'),
}

export const brandsApi = {
    getBrands: () => requestInstance.get('api/v1/AcousticCategories'),
}

export const modelsApi = {
    getModelParams: (model) => requestInstance.get(`api/v1/ParamsByAModels/${model}`),
    getModelsByBrand: (brand) => requestInstance.get(`api/v1/AModelsByBrand/${brand}`),
}

export const constructionsApi = {
    getConstructions: (usage) => requestInstance.get(`api/v1/${usage}`),
}

export const albumsApi = {
    getAlbums: () => requestInstance.get('api/v1/albums'),
}

export const certificatesApi = {
    getCertificates: (id) => requestInstance.get(`api/v1/certs/byMaterial/${id}`),
}

export const techCardApi = {
    getTechCards: () => requestInstance.get('api/v1/techCards'),
}

export const installSchemesApi = {
    getInstallSchemes: () => requestInstance.get('api/v1/brandsWithInstallSchemas'),
    getInstallSchemeByBrand: (brand) => requestInstance.get(`api/v1/installSchemasByBrand/${brand}`),
}

export const filesApi = {
    getImageFileUrl: (fileName) => `${baseURL}/api/v1/constr/${fileName}`,
    getCertificateFileUrl: (fileName) => `${baseURL}/api/v1/certificate/${fileName}`
}

export const objectsApi = {
    getObjects: () => requestInstance.get('api/v1/objects/all'),
    getObject: (code) => requestInstance.get('api/v1/objects/info/${code}'),
}
