import { NEW_ROW_EMPLOYEE } from "../../../common/types";





export const initialState = {
    rows: [],
    editableRowId: null,
    rowBackup: null,
    isAddingNewRow: false,
    newRow: NEW_ROW_EMPLOYEE,
    disableAddNewRow: false,
    paginationModel: { page: 0, pageSize: 10 },
    totalRows: 0
};


export const gridReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ROWS':
            return {
                ...state,
                rows: action.payload.rows,
                totalRows: action.payload.totalRows
            };
        case 'SET_EDITABLE_ROW':
            return {
                ...state,
                editableRowId: action.payload,
                rowBackup: action.rowBackup || null,
                disableAddNewRow: action.disableAddNewRow || false
            };
        case 'CANCEL_OPERATION':
            return {
                ...state,
                rows: state.isAddingNewRow
                    ? state.rows.filter(row => row.id !== state.editableRowId)
                    : state.rows.map(row => row.id === state.editableRowId ? state.rowBackup : row),
                isAddingNewRow: false,
                rowBackup: null,
                newRow: NEW_ROW_EMPLOYEE,
                editableRowId: null,
            };
        case 'ADD_NEW_ROW':
            return {
                ...state,
                rows: [state.newRow, ...state.rows],
                editableRowId: state.newRow.id,
                isAddingNewRow: true
            };
        case 'UPDATE_ROW':
            return {
                ...state,
                rows: state.rows.map((row) => row.id === action.payload.id ? action.payload : row),
                editableRowId: null
            };
        case 'SET_PAGINATION':
            return {
                ...state,
                paginationModel: action.payload
            };
        default:
            return state;
    }
};