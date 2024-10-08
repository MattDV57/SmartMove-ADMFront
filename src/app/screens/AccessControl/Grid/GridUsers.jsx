import { DataGrid } from '@mui/x-data-grid';
import React, { useReducer } from 'react';
import { columnsEmployees } from './columnsUsers';
import { gridReducer, initialState } from './GridReducer';
import { LinearProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { GridContainer } from '../../../components/GridItems/GridContainer';
import { useModal } from '../../../../context/ModalProvider';
import { useGetUsersActions } from '../../../../hooks/user/useGetUsersActions';
import useAuth from '../../../../hooks/useAuth';
import { CustomToolBar } from '../../../components/GridItems/CustomToolBar';


export const GridUsers = ({ isAllowedToActions }) => {

    const theme = useTheme();
    const { auth } = useAuth();
    const { openModal } = useModal();



    const [state, dispatch] = useReducer(gridReducer, initialState);

    const { isLoading: isLoading_GET, } = useGetUsersActions(auth.id, state, dispatch);


    const handlePutOnSave = (updatedRow) => {
        dispatch({ type: 'SAVE_ROW', payload: updatedRow })
    }

    // const handleClickOnSave = async (newRow) => {

    //     const passedValidations = validationsBeforeSave(newRow, showAlert);

    //     if (!passedValidations) {
    //         return;
    //     }

    //     const hasError = state.isAddingNewRow
    //         ? await postUser(newRow)
    //         : await putUser(newRow);

    //     if (!hasError) {
    //         dispatch({ type: 'SHOW_SUCCESS' });

    //         setTimeout(() => {
    //             dispatch({ type: 'SAVE_ROW', payload: newRow });
    //             setIsAddingNewRow(false);
    //             setDisableAddNewRow(false);
    //         }, 1200);
    //     }
    // };


    const cols = columnsEmployees({
        editableRowId: state.editableRowId,
        // handleClickOnEdit,
        // handleCancelOperation,
        // handleClickOnSave,
        openModal,
        isSavingSuccess: state.isSavingSuccess,
        isAllowedToActions
    });


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
                            loading={isLoading_GET}
                            slots={{ toolbar: CustomToolBar }}
                            disableRowSelectionOnClick
                            hideFooterSelectedRowCount
                            isCellEditable={(params) => params.row._id === state.editableRowId}
                        />

                    </GridContainer>
            }
        </div>
    );
};




