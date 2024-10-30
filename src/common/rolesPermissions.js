

export const VIEWS = {
    DASHBOARD: "/",
    MY_CLAIMS: "/my-claims",
    ALL_CLAIMS: "/all-claims",
    ALL_ARBITRATIONS: "/all-arbitrations", 
    MY_ARBITRATIONS: "/my-arbitrations",
    CHAT: "/chat",
    ACCESS_CONTROL_PANEL: "/access-control",
    LOGS: "/logs",
    PROFILE: "/profile"
};


export const ACTIONS = {
    EDIT_USER: "edit-user",
    CREATE_USER: "create-user",
    DELETE_USER: "delete-user",
    UPDATE_USER: "update-user",
    CHAT: "chat",
    NOTIFICATIONS: "notifications"
}

export const INTERNALS = {
  ADMIN: "Admin",
  GERENTE: "Gerente",
  SOPORTE: "Soporte"
}

export const OUTSIDERS = {
  RECLAMANTE: "Reclamante",
  ABOGADO: "Abogado",
}

export const INTERNAL_ROLES = new Set([INTERNALS.ADMIN, INTERNALS.GERENTE, INTERNALS.SOPORTE])
export const OUTSIDER_ROLES = new Set([OUTSIDERS.RECLAMANTE, OUTSIDERS.ABOGADO])

//TODO: Implementar para que el Abogado ni el Gerente puedan interactuar en el chat

export const ACCESS_CONTROL = {
  roles: {
      [INTERNALS.ADMIN]: {
          actions: new Set(Object.values(ACTIONS)),
          views: new Set(Object.values(VIEWS)),
      },
    
      [INTERNALS.SOPORTE]: {
          actions: new Set([ACTIONS.CHAT, ACTIONS.NOTIFICATIONS]),
          views: new Set([
              VIEWS.DASHBOARD, 
              VIEWS.MY_CLAIMS, 
              VIEWS.MY_ARBITRATIONS, 
              VIEWS.ALL_CLAIMS, 
              VIEWS.ALL_ARBITRATIONS,
              VIEWS.LOGS, 
              VIEWS.PROFILE
          ])
      },
    
      [INTERNALS.GERENTE]: {
          actions: new Set(),
          views: new Set([
              VIEWS.DASHBOARD, 
              VIEWS.MY_CLAIMS, 
              VIEWS.MY_ARBITRATIONS, 
              VIEWS.ALL_CLAIMS, 
              VIEWS.ALL_ARBITRATIONS,
              VIEWS.ACCESS_CONTROL_PANEL, 
              VIEWS.LOGS, 
              VIEWS.PROFILE
          ]),
      },

      [OUTSIDERS.ABOGADO]: {
          actions: new Set(),
          views: new Set([VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS]),
      },

      [OUTSIDERS.RECLAMANTE]: {
          actions: new Set([ACTIONS.CHAT]),
          views: new Set([VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS]),
      },

      Unauthorized: {
          actions: new Set(),
          views: new Set(), 
      }
  }
};

  