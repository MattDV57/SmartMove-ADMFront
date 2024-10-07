import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { useEffect, useReducer, useState } from 'react';
import { columnsEmployees } from './columnsEmployees';
import { useTheme } from '@emotion/react';
import { data } from './EMPLOYEES_DATA';
import { tokens } from '../../../styles/theme';
import { GridContainer } from '../GridContainer';
import { gridReducer, initialState } from './GridReducer';
import { useModal } from '../../../context/ModalProvider';
import { useGetUsersActions } from '../../../hooks/user/useGetUsersActions';
import useAuth from '../../../hooks/useAuth';
import { LinearProgress } from '@mui/material';
import { CustomToolBar } from '../CustomToolBar';
import { useAlert } from '../../../context/AlertProvider';

export const GridEmployees = ({ isAddingNewRow, setIsAddingNewRow, setDisableAddNewRow,
    postUser, putUser, isLoading_CUD, isAllowedToActions }) => {

    const { showAlert } = useAlert();
    const { auth } = useAuth();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [state, dispatch] = useReducer(gridReducer, initialState);

    const { isLoading: isLoading_GET, } = useGetUsersActions(auth.id, state, dispatch);
    const { openModal } = useModal();

    //TODO: Verificar que funcionen el CRUD, una vez la API esté lista.
    //TODO: Integrar el getEmployees() de la API.
    //TODO: Implementar validación de errores en las columnas. Al crear o editar un empleado.

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

        const passedValidations = validationsBeforeSave(newRow, showAlert);

        if (!passedValidations) {
            return;
        }

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
        isLoading_CUD,
        isSavingSuccess: state.isSavingSuccess,
        isAllowedToActions
    });


    console.log("ROWS", state.rows, "TOTAL", state.totalUsers);
    return (
        <div>
            {
                isLoading_GET
                    ? <LinearProgress />
                    :
                    <GridContainer>
                        <DataGrid
                            columns={cols}
                            rows={state.rows}
                            rowCount={state.totalUsers}
                            getRowId={(row) => row._id}
                            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                            pagination
                            paginationMode="server"

                            paginationModel={state.paginationModel}
                            onPaginationModelChange={(newModel) =>
                                dispatch({ type: 'SET_PAGINATION_MODEL', payload: newModel })
                            }
                            loading={isLoading_CUD || isLoading_GET}
                            slots={{ toolbar: CustomToolBar }}
                            disableRowSelectionOnClick
                            hideFooterSelectedRowCount
                            isCellEditable={(params) => params.row.id === state.editableRowId}
                        />

                    </GridContainer>
            }
        </div>
    );
};




const validationsBeforeSave = (newRow, showAlert) => {
    const isRowValid = Object.values(newRow).every((value) => value !== '' && value !== null);

    if (!isRowValid) {
        showAlert('Todos los campos son obligatorios', 'warning');
        return;
    }

    // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRow.email);
    // const isPhoneValid = /^\d{3}-\d{3}-\d{4}$/.test(newRow.phone);
    // const isBirthDateValid = new Date(newRow.birthDate) < new Date();
    // const isEntryDateValid = new Date(newRow.entryDate) < new Date();

    // switch (false) {
    //     case isEmailValid:
    //         showAlert('El email no es válido', 'warning');
    //         break;
    //     case isPhoneValid:
    //         showAlert('El teléfono no es válido', 'warning');
    //         break;
    //     case isBirthDateValid:
    //         showAlert('La fecha de nacimiento no puede ser futura', 'warning');
    //         break;
    //     case isEntryDateValid:
    //         showAlert('La fecha de ingreso no puede ser futura', 'warning');

    // }

    return true
    // return isEmailValid && isPhoneValid && isBirthDateValid && isEntryDateValid;
};