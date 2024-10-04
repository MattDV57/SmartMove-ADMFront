import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useReducer } from 'react';
import { columnsEmployees } from './columnsEmployees';
import { useTheme } from '@emotion/react';
import { data } from './EMPLOYEES_DATA';
import { tokens } from '../../../styles/theme';
import { GridContainer } from '../GridContainer';
import { gridReducer, initialState } from './GridReducer';



export const GridEmployees = ({ isAddingNewRow, setIsAddingNewRow, setDisableAddNewRow }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [state, dispatch] = useReducer(gridReducer, initialState);


    useEffect(() => {
        if (data) {
            dispatch({
                type: 'SET_ROWS',
                payload: {
                    rows: data,
                    // totalRows: totalEmployees
                }
            });
        }
        // }, [employeesData, totalEmployees]);
    }, []);


    useEffect(() => {
        if (isAddingNewRow && state.editableRowId === null) { // Boton Agregar Empleado
            dispatch({ type: 'ADD_NEW_ROW' });
        }
    }, [isAddingNewRow, state.editableRowId]);

    const handleCancelOperation = () => {
        dispatch({ type: 'CANCEL_OPERATION' });
        setIsAddingNewRow(false);
        setDisableAddNewRow(false);
    };

    const handleClickOnEdit = (row) => {
        setDisableAddNewRow(true);
        dispatch({ type: 'SET_EDITABLE_ROW', payload: row.id, rowBackup: { ...row } });

    };

    const handleProcessRowUpdate = (newRow) => {
        dispatch({ type: 'UPDATE_ROW', payload: newRow });
    };

    const cols = columnsEmployees({ editableRowId: state.editableRowId, handleClickOnEdit, handleCancelOperation });

    return (
        <div>
            <GridContainer>
                <DataGrid
                    columns={cols}
                    rows={state.rows}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    // paginationMode="server"
                    // rowCount={state.totalRows} 
                    paginationModel={state.paginationModel}
                    onPaginationModelChange={(newModel) => dispatch({ type: 'SET_PAGINATION', payload: newModel })}
                    // loading={isLoading}
                    slots={{ toolbar: GridToolbar }}
                    disableRowSelectionOnClick
                    hideFooterSelectedRowCount
                    isCellEditable={(params) => params.row.id === state.editableRowId}
                />
            </GridContainer>
        </div>
    );
};
