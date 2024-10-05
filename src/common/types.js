export const SET_LOADING_TRUE = "SET_LOADING_TRUE"
export const SET_LOADING_FALSE = "SET_LOADING_FALSE"


export const LIST_PRIORITIES = ["Baja", "Normal", "Alta", "Urgente"]
export const LIST_STATUS = ["Abierto", "En Proceso", "Resuelto", "Cerrado"]

export const LIST_CATEGORIES = [
    "Técnicos",
    "Cobros/Pagos",
    "Servicio",
    "Mediaciones",
    "Información",
    "Perfil/Usuario",
    "Inmuebles",
    "Contrato",
    "Servicio de Mudanza",
    "Otros"
];

export const CASE_PATHS = { ALL_CLAIMS: "/all-claims", MY_CLAIMS: "/my-claims", 
    ALL_ARBITRATIONS: "/all-arbitrations", MY_ARBITRATIONS: "/my-arbitrations" }

export const CASE_TABS_MAP = {
    'claims': [
        { label: 'Mis Reclamos', value: CASE_PATHS.MY_CLAIMS },
        { label: 'Todos los Reclamos', value: CASE_PATHS.ALL_CLAIMS }
    ],
    'arbitrations': [
        { label: 'Mis Mediaciones', value: CASE_PATHS.MY_ARBITRATIONS },
        { label: 'Todas las Mediaciones', value: CASE_PATHS.ALL_ARBITRATIONS }
        
    ]
}


export const CASE_PATH_ORDER = {
    'my-claims': 0,
    'all-claims': 1,
    'my-arbitrations': 0,
    'all-arbitrations': 1,
}

export const MAP_CASE_TYPE = {
    'claims': 'Reclamo',
    'arbitrations': 'Mediacion'
}


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