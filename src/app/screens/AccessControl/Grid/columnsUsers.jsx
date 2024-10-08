import { Box, Button, CircularProgress, Fab, IconButton, Menu, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { ACCESS_ROLES, MODALS_TYPES } from '../../../../common/types';
import { blue, green } from '@mui/material/colors';
import { Check } from '@mui/icons-material';


export const columnsUsers = ({
    editableRowId,
    handlePutOnSave,
    handleDeleteOnSave,
    openModal,
    isSavingLoading = false,
    isSavingSuccess = false,
    isAllowedToActions = false
}) => [
        // {
        //     field: 'employeeId',
        //     headerName: 'ID',
        //     width: 80,
        // },
        {
            field: 'accessRole',
            headerName: 'Rol',
            width: 150,
            type: 'singleSelect',
            valueOptions: ACCESS_ROLES,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },

        {
            field: 'fullName',
            headerName: 'Nombre',
            flex: 1,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'birthDate',
            headerName: 'Nacimiento',
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'String',
            flex: 1,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'phone',
            headerName: 'Teléfono',
            type: 'String',
            flex: 1,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'location',
            headerName: 'Localidad',
            type: 'String',
            flex: 1,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'address',
            headerName: 'Dirección',
            type: 'String',
            flex: 1,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },

        {
            field: 'position',
            headerName: 'Posición',
            type: 'String',
            flex: 1,
        },
        {
            field: 'department',
            headerName: 'Departamento',
            type: 'String',
            flex: 1,
        },
        {
            field: 'entryDate',
            headerName: 'Ingreso',
            // type: 'date',
            width: 80,
        },

        ...(isAllowedToActions ? [{
            field: 'actions',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params) => (
                <Box>
                    {params.row._id === editableRowId
                        ?
                        <Box marginX={'auto'} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                            <IconButton sx={{ backgroundColor: isSavingLoading ? 'black' : green[700] }}>
                                {isSavingSuccess && <Check sx={{ color: '#000' }} />}
                            </IconButton>

                        </Box>
                        :
                        <>
                            <Tooltip title="Eliminar">
                                <IconButton onClick={() => openModal({ type: MODALS_TYPES.DELETE_USER, data: params.row, onSave: handleDeleteOnSave })}
                                    variant='contained'
                                    color='error'
                                    sx={{ borderRadius: '0', }}
                                    disabled={params.row._id !== editableRowId && editableRowId !== null}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Editar">
                                <IconButton onClick={() => openModal({ type: MODALS_TYPES.PUT_POST_USER, data: params.row, onSave: handlePutOnSave })}
                                    variant='contained'
                                    color='primary'
                                    sx={{ borderRadius: '0', }}
                                    disabled={params.row._id !== editableRowId && editableRowId !== null}

                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                        </>}

                </Box>
            )
        }]
            : []
        )
    ];
