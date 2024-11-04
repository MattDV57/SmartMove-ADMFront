

export const VIEWS_PATH = {
    GET_DASHBOARD: "/",
    GET_MY_CLAIMS: "/my-claims",
    GET_ALL_CLAIMS: "/all-claims",
    GET_ALL_ARBITRATIONS: "/all-arbitrations", 
    GET_MY_ARBITRATIONS: "/my-arbitrations",
    GET_CHAT: "/chat",
    GET_ALL_USERS: "/access-control",
    GET_LOGS: "/logs",
    GET_USER_PROFILE: "/profile"
};


export const PATH_VIEWS = {
  "/": "GET_DASHBOARD",
  "/my-claims": "GET_MY_CLAIMS",
  "/all-claims": "GET_ALL_CLAIMS",
  "/all-arbitrations": "GET_ALL_ARBITRATIONS",
  "/my-arbitrations": "GET_MY_ARBITRATIONS",
  "/chat": "GET_CHAT",
  "/access-control": "GET_ALL_USERS",
  "/logs": "GET_LOGS",
  "/profile": "GET_USER_PROFILE"
}


export const INTERNAL_ROLES = {
  ADMIN: "Admin",
  GERENTE: "Gerente",
  SOPORTE: "Soporte"
}

export const OUTSIDER_ROLES = {
  RECLAMANTE: "Reclamante",
  ABOGADO: "Abogado",
}

