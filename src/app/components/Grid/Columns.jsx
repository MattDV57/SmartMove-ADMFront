import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import moment from 'moment';
import { theme } from '../../../styles/theme';


export const columns = (handleOpenModal) => [
    {
        field: 'timestamp',
        headerName: 'Fecha de emisión',
        width: 180,
        renderCell: params => moment(params.value).format('DD/MM/YYYY h:mm:ss a')
    },
    {
        field: 'priority',
        headerName: 'Prioridad',
        width: 80,
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    backgroundColor:
                        params.value === 'P4' ? theme.palette.priority[600] :
                            params.value === 'P3' ? theme.palette.priority[400] :
                                params.value === 'P2' ? theme.palette.priority[300] :
                                    theme.palette.priority[100]
                }}
            />
        )
    },
    {
        field: 'status',
        headerName: 'Estado',
        width: 120,
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    width: '100%',
                    textAlign: 'center',
                }}
                color={
                    params.value === 'Abierto' ? 'success' :
                        params.value === 'En Proceso' ? 'info' :
                            'secondary'
                }
            />
        )
    },
    {
        field: 'assignedOperator',
        headerName: 'Operador asignado',
        width: 180,
        renderCell: (params) => params?.row?.assignedOperator ? params.row.assignedOperator : (
            <Box>
                <Button variant='outlined'>
                    <AddOutlinedIcon />
                </Button>
            </Box>
        )
    },
    { field: 'user', headerName: 'Username', width: 150, renderCell: params => params.row.user.username },
    {
        field: 'details',
        headerName: 'Detalles',
        width: 150,
        renderCell: (params) => (
            <Button
                variant="outlined"
                onClick={() => handleOpenModal(params.row)}
            >
                Ver Detalles
            </Button>
        )
    }
];