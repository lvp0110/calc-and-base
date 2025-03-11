import axios from "axios";

const cdnUrl = import.meta.env.VITE_CDN_URL;
const baseURL = import.meta.env.VITE_API_URL;

const country = "ru"

const requestInstance = axios.create({
  baseURL,
  paramsSerializer: {
    indexes: null
  }
});

export const setCountry = (country) => {
  // requestInstance.defaults.headers.common['Db-Acoustic-Country'] = country
}

setCountry(country)

export const categoriesApi = {
  getGeneralCategories: () =>
    requestInstance.get(`api/v2/globalMenuCategories`),
};

export const dataV2Api = {
  getMeasurements: (brandId) =>
    requestInstance.get(`api/v2/data/measurements`, { params: { brandId } }),
};

export const materialsApi = {
  getMaterials: (usage) => requestInstance.get(`api/v1/Materials/${usage}`),
  getMaterialsByCategory: (category) =>
    requestInstance.get(`api/v2/material/list/${category}`),
  getMaterialsWithCertificates: () =>
    requestInstance.get("api/v1/MaterialsWithCerts"),
  getSections: (code) => requestInstance.get(`api/v2/material/props/${code}`),
};

export const brandsApi = {
  getBrands: () => requestInstance.get("api/v1/AcousticCategories"),
};

export const modelsApi = {
  getModelParams: (model) =>
    requestInstance.get(`api/v1/ParamsByAModels/${model}`),
  getModelsByBrand: (brand) =>
    requestInstance.get(`api/v1/AModelsByBrand/${brand}`),
  getBrandParams: (brand, params) => requestInstance.get(`api/v1/brandParams/${brand}`, { params })
};

export const constructionsApi = {
  getConstructions: (usage) => requestInstance.get(`api/v1/${usage}`),
  getPrecalcParams: (brand, params) => requestInstance.get(`api/v2/constr/calc/params/${brand}`, { params }),
  constructionsCalculate: (brand, params) =>
    requestInstance.get(`api/v2/constr/calc/${brand}`, { params }),
  exportExcelUrl: (brand) => `${baseURL}/api/v2/constr/calc/excel/${brand}`,
  materialsList: (id) => requestInstance.get(`api/v2/constr/mList/${id}`)
};

export const albumsApi = {
  getAlbums: () => requestInstance.get("api/v1/albums"),
};

export const certificatesApi = {
  getCertificates: (id) => requestInstance.get(`api/v1/certs/byMaterial/${id}`),
};

export const techCardApi = {
  getTechCards: () => requestInstance.get("api/v1/techCards"),
};

export const installSchemesApi = {
  getInstallSchemes: () =>
    requestInstance.get("api/v1/brandsWithInstallSchemas"),
  getInstallSchemeByBrand: (brand) =>
    requestInstance.get(`api/v1/installSchemasByBrand/${brand}`),
};

export const filesApi = {
  getImageFileUrl: (fileName) => `${cdnUrl}/api/v1/constr/${fileName}`,
  getCertificateFileUrl: (fileName) =>
    `${cdnUrl}/api/v1/certificate/${fileName}`,
};

export const objectsApi = {
  getObjects: () => requestInstance.get("api/v1/objects/all"),
  getObject: (code) => requestInstance.get(`api/v1/objects/info/${code}`),
};
