import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useReducer, useState } from 'react';
import { columnsEmployees } from './columnsEmployees';
import { useTheme } from '@emotion/react';
import { data } from './EMPLOYEES_DATA';
import { tokens } from '../../../styles/theme';
import { GridContainer } from '../GridContainer';
import { gridReducer, initialState } from './GridReducer';
import { useModal } from '../../../context/ModalProvider';
import { MODALS_TYPES } from '../../../common/types';



export const GridEmployees = ({ isAddingNewRow, setIsAddingNewRow, setDisableAddNewRow, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [state, dispatch] = useReducer(gridReducer, initialState);
    // const [isSavingSuccess, setIsSavingSuccess] = useState(false);
    const { openModal } = useModal();
    const { postUser, getUsers, putUser, isLoading } = props;

    //TODO: Verificar que funcionen el CRUD, una vez la API esté lista.
    //TODO: Integrar el getEmployees() de la API.
    //TODO: Implementar validación de errores en las columnas. Al crear o editar un empleado.

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
        dispatch({ type: 'SET_EDITABLE_ROW', payload: row.id, rowBackup: { ...row } });
        setDisableAddNewRow(true);
    };

    const handleClickOnSave = async (newRow) => {

        const hasError = state.isAddingNewRow
            ? await postUser(newRow)
            : await putUser(newRow);

        if (!hasError) {
            dispatch({ type: 'SHOW_SUCCESS' });

            setTimeout(() => {
                dispatch({ type: 'SAVE_ROW', payload: newRow });
                setIsAddingNewRow(false);
                setDisableAddNewRow(false);
            }, 1200);
        }
    };

    const cols = columnsEmployees({
        editableRowId: state.editableRowId,
        handleClickOnEdit,
        handleCancelOperation,
        handleClickOnSave,
        openModal,
        isLoading,
        isSavingSuccess: state.isSavingSuccess
    });

    return (
        <div>
            <GridContainer>
                <DataGrid
                    columns={cols}
                    rows={state.rows}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSizeOptions={[5, 10, 20]}
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
