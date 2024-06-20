export const API_SERVER = import.meta.env.VITE_API_URL

export const API_TESTSERVER = import.meta.env.VITE_API_URL // 'http://51.250.123.41:3005' 

export const ALL_ISOLATION_CONSTR = "AllIsolationConstr"
export const MATERIALS = "Materials"
export const MATERIALS_WITH_CERTS = "MaterialsWithCerts" 
export const ACOUSTIC_CATEGORIES = "AcousticCategories"

export const API_URL_ALL_ISOLATION_CONSTR = `api/v1/${ALL_ISOLATION_CONSTR}` //api/v1/MaterialsIsolation
export const API_URL_MATERIALS = `api/v1/${MATERIALS}`
export const API_URL_MATERIALS_WITH_CERTS = `api/v1/${MATERIALS_WITH_CERTS}`
export const API_URL_ACOUSTIC_CATEGORIES = `api/v1/${ACOUSTIC_CATEGORIES}`

export const API_URL_IMG = 'api/v1/constr'
export const API_CERT_MATERIAL = 'api/v1/certs/byMaterial'
export const API_CERT = 'api/v1/certificate'
export const API_PANELS_INFO_BY_BRAND = 'api/v1/APanelsInfoByCat'