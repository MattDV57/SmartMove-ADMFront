

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
    NOTIFICATIONS: "notifications",
    EDIT_CASE: "edit-case",
    PUT_OPERATOR_IN_CASE: "put-operator-in-case"
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


export const ACCESS_CONTROL = {
  roles: {
      [INTERNAL_ROLES.ADMIN]: {
          actions: new Set(Object.values(ACTIONS)),
          views: new Set(Object.values(VIEWS)),
      },
    
      [INTERNAL_ROLES.SOPORTE]: {
          actions: new Set([ACTIONS.CHAT, ACTIONS.NOTIFICATIONS, ACTIONS.PUT_OPERATOR_IN_CASE]),
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
    
      [INTERNAL_ROLES.GERENTE]: {
          actions: new Set(),
          views: new Set([
              VIEWS.DASHBOARD, 
              VIEWS.ALL_CLAIMS, 
              VIEWS.ALL_ARBITRATIONS,
              VIEWS.ACCESS_CONTROL_PANEL, 
              VIEWS.LOGS, 
              VIEWS.PROFILE
          ]),
      },

      [OUTSIDER_ROLES.ABOGADO]: {
          actions: new Set(),
          views: new Set([VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS]),
      },

      [OUTSIDER_ROLES.RECLAMANTE]: {
          actions: new Set([ACTIONS.CHAT]),
          views: new Set([VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS]),
      },

      Undefined: {
          actions: new Set(),
          views: new Set(), 
      }
  }
};

  