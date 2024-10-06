import { Box, Button, CircularProgress, Fab, IconButton, Menu, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { ACCESS_ROLES, MODALS_TYPES } from '../../../common/types';
import { blue, green } from '@mui/material/colors';
import { Check } from '@mui/icons-material';


export const columnsEmployees = ({ editableRowId,
    handleClickOnEdit, handleCancelOperation, handleClickOnSave, openModal, isLoading_CUD, isSavingSuccess = false
}) => [
        {
            field: 'employeeId',
            headerName: 'ID',
            width: 80,
        },
        {
            field: 'fullName',
            headerName: 'Nombre',
            flex: 1,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'birthDate',
            headerName: 'Nacimiento',
            // type: 'date',
            editable: (params) => params.row.id === editableRowId
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'String',
            flex: 1,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'phone',
            headerName: 'Teléfono',
            type: 'String',
            flex: 1,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'address',
            headerName: 'Dirección',
            type: 'String',
            flex: 1,
            editable: (params) => params.row.id === editableRowId,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'localidad',
            headerName: 'Localidad',
            type: 'String',
            flex: 1,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'position',
            headerName: 'Posición',
            type: 'String',
            flex: 1,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'department',
            headerName: 'Departamento',
            type: 'String',
            flex: 1,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'entryDate',
            headerName: 'Ingreso',
            // type: 'date',
            width: 80,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'accessRole',
            headerName: 'Rol',
            width: 150,
            type: 'singleSelect',
            valueOptions: ACCESS_ROLES,
            editable: (params) => params.row.id === editableRowId,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params) => (
                <Box>
                    {params.row.id === editableRowId
                        ?
                        <>
                            <Tooltip title="Cancelar">
                                <IconButton onClick={handleCancelOperation}
                                    color='error'
                                    sx={{ borderRadius: '0', }}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Guardar">
                                <IconButton
                                    aria-label="save"
                                    color="primary"
                                    sx={{
                                        ...(isSavingSuccess
                                            && {
                                            bgcolor: green[500],
                                            '&:hover': {
                                                bgcolor: green[700],
                                            },
                                        }
                                        ),
                                    }}
                                    onClick={() => handleClickOnSave(params.row)}
                                >
                                    {isLoading_CUD ? <CircularProgress size={28} sx={{ color: green[500] }} />
                                        : isSavingSuccess
                                            ? <Check sx={{ color: 'black' }} />
                                            : <SaveIcon />}
                                </IconButton>

                            </Tooltip>
                        </>
                        :
                        <>
                            <Tooltip title="Eliminar">
                                <IconButton onClick={() => openModal(
                                    MODALS_TYPES.DELETE_EMPLOYEE,
                                    params.row)}
                                    variant='contained'
                                    color='error'
                                    sx={{ borderRadius: '0', }}
                                    disabled={params.row.id !== editableRowId && editableRowId !== null}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                                <IconButton onClick={() => handleClickOnEdit(params.row)}
                                    variant='contained'
                                    color='primary'
                                    sx={{ borderRadius: '0', }}
                                    disabled={params.row.id !== editableRowId && editableRowId !== null}

                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </>}
                </Box>
            ),
        }
    ];
