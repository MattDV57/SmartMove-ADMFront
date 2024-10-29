

const VIEWS = {
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


const ACTIONS = {
    EDIT_USER: "edit-user",
    CREATE_USER: "create-user",
    DELETE_USER: "delete-user",
    UPDATE_USER: "update-user",
    CHAT: "chat"
}


export const ACCESS_CONTROL = {
    roles: {

      Admin: {
        actions: new Set(Object.values(ACTIONS)),
        views: new Set(Object.values(VIEWS)),
      },

      Soporte: {
        actions: new Set([ACTIONS.CHAT]),
        views: new Set([VIEWS.DASHBOARD, VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS, VIEWS.ALL_CLAIMS, VIEWS.ALL_ARBITRATIONS, 
            VIEWS.LOGS, VIEWS.PROFILE])
      },

      // Galperin
      Gerente: {
        actions: new Set(),
        views: new Set([VIEWS.DASHBOARD, VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS, VIEWS.ALL_CLAIMS, VIEWS.ALL_ARBITRATIONS, 
           VIEWS.ACCESS_CONTROL_PANEL, VIEWS.LOGS, VIEWS.PROFILE]),
      },

      // Burlando
      Abogado: {
        actions: new Set(),
        views: new Set([VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS]),
      },

      Reclamante: {
        actions: new Set([ACTIONS.CHAT]),
        views: new Set([VIEWS.MY_CLAIMS, VIEWS.MY_ARBITRATIONS]),
      }
    },

};

  