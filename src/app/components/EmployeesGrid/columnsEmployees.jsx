import { Tooltip } from '@mui/material';

export const columnsEmployees = () => [
    {
        field: 'employeeId',
        headerName: 'ID',
        width: 80,
    },
    {
        field: 'fullName',
        headerName: 'Nombre',
        flex: 1,
    },
    {
        field: 'birthDate',
        headerName: 'Nacimiento',
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1
    },
    {
        field: 'phone',
        headerName: 'Teléfono',
        flex: 1
    },
    {
        field: 'address',
        headerName: 'Dirección',
        flex: 1,
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
    },
    {
        field: 'position',
        headerName: 'Posición',
        flex: 1,
    },
    {
        field: 'department',
        headerName: 'Departamento',
        flex: 1,
    },
    {
        field: 'entryDate',
        headerName: 'Ingreso',
        flex: 1,
    },
    {
        field: 'accessRole',
        headerName: 'Rol',
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Acciones',
        width: 150,
    }
];
