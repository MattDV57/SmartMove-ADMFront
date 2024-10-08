





export const initialState = {
    rows: [],
    editableRowId: null,
    rowBackup: null,
    isAddingNewRow: false,
    newRow: null,
    disableAddNewRow: false,
    isSavingSuccess: false,
    paginationModel: { page: 0, pageSize: 25 },
    totalUsers: 0
};


export const gridReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ROWS':
            return {
                ...state,
                rows: action.payload.foundUsersPaginated,
                totalUsers: action.payload.totalUsers
            };
        case 'SET_EDITABLE_ROW':
            return {
                ...state,
                editableRowId: action.payload,
                rowBackup: action.rowBackup || null,
                disableAddNewRow: action.disableAddNewRow || false,
                isSavingSuccess: false
            };
        case 'CANCEL_OPERATION':
            return {
                ...state,
                rows: state.isAddingNewRow
                    ? state.rows.filter(row => row._id !== state.editableRowId)
                    : state.rows.map(row => row._id === state.editableRowId ? state.rowBackup : row),
                isAddingNewRow: false,
                rowBackup: null,
                newRow: NEW_ROW_EMPLOYEE,
                editableRowId: null,
            };
        case 'ADD_NEW_ROW':
            return {
                ...state,
                rows: [state.newRow, ...state.rows],
                editableRowId: state.newRow._id,
                isAddingNewRow: true
            };
        case 'SHOW_SUCCESS':
            return {
                ...state,
                isSavingSuccess: true
            };
        case 'SAVE_ROW':
            return {
                ...state,
                rows: state.rows.map((row) => row._id === action.payload.id ? action.payload : row),
                editableRowId: null,
                isSavingSuccess: false
            };
        case 'SET_PAGINATION_MODEL':
            return {
                ...state,
                paginationModel: action.payload
            };
        default:
            return state;
    }
};