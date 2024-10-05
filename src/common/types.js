export const SET_LOADING_TRUE = "SET_LOADING_TRUE"
export const SET_LOADING_FALSE = "SET_LOADING_FALSE"


export const LIST_PRIORITIES = ["Consulta", "Media", "Alta", "Urgente"]
export const LIST_STATUS = ["Abierto", "En Proceso", "Resuelto", "Cerrado"]

export const CASE_PATHS = { ALL_CLAIMS: "all-claims", MY_CLAIMS: "my-claims", 
    ALL_ARBITRATIONS: "all-arbitrations", MY_ARBITRATIONS: "my-arbitrations" }

export const MODALS_TYPES = { 
    OPERATOR_ACCEPT_CASE: "operator-accept-case", 
    EDIT_CASE: "edit-case", 
    DETAILS_CASE: "details-case",
    DELETE_EMPLOYEE: "delete-employee",
    CHAT: 'chat'
}

export const ACCESS_ROLES = ["Admin", "Gerente", 'Soporte']



export const NEW_ROW_EMPLOYEE = {
    id: Date.now(),
    fullName: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    localidad: '',
    position: '',
    department: '',
    entryDate: '',
    accessRole: '',
}