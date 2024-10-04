import { Box, Button, IconButton, Menu, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { ACCESS_ROLES } from '../../../common/types';

export const columnsEmployees = ({ editableRowId, handleClickOnEdit, handleCancelOperation }) => [
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
        editable: (params) => params.row.id === editableRowId
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        editable: (params) => params.row.id === editableRowId,
    },
    {
        field: 'phone',
        headerName: 'Teléfono',
        flex: 1,
        editable: (params) => params.row.id === editableRowId,
    },
    {
        field: 'address',
        headerName: 'Dirección',
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
        flex: 1,
        editable: (params) => params.row.id === editableRowId,
    },
    {
        field: 'position',
        headerName: 'Posición',
        flex: 1,
        editable: (params) => params.row.id === editableRowId,
    },
    {
        field: 'department',
        headerName: 'Departamento',
        flex: 1,
        editable: (params) => params.row.id === editableRowId,
    },
    {
        field: 'entryDate',
        headerName: 'Ingreso',
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
                                variant='contained'
                                color='error'
                                sx={{ borderRadius: '0', }}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Guardar">
                            <IconButton onClick={() => console.log("Save this")}
                                variant='contained'
                                color='info'
                                sx={{ borderRadius: '0', }}
                            >
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                    :
                    <>
                        <Tooltip title="Eliminar">
                            <IconButton onClick={() => console.log("Delete this")}
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
