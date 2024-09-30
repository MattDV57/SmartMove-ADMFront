import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';


export const caseColumns = (handleOpenModal, priorityPalette) => [
    {
        field: 'timestamp',
        headerName: 'Fecha Emisión',
        width: 150,
        editable: false,
        renderCell: params => moment(params.value).format('DD/MM/YYYY hh:mm:ss')
    },
    {
        field: 'priority',
        headerName: 'Prioridad',
        flex: 1,
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    width: '55%',
                    backgroundColor:
                        params.value === 'Urgente' ? priorityPalette[600] :
                            params.value === 'Alta' ? priorityPalette[400] :
                                params.value === 'Media' ? priorityPalette[300] :
                                    priorityPalette[100]
                }}
            />
        )
    },
    {
        field: 'status',
        headerName: 'Estado',
        flex: 1,
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    width: '70%',
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
        headerName: 'Operador',
        cellClassName: "name-column--cell",
        flex: 1,
        renderCell: (params) => params?.row?.assignedOperator ? params.row.assignedOperator : (
            <Box>
                <Button variant='outlined'>
                    <AddOutlinedIcon />
                </Button>
            </Box>
        )
    },
    {
        field: 'user', headerName: 'Reclamante',
        flex: 1, renderCell: params => params.row.user.username
    },
    {
        field: 'category', headerName: 'Categoría'
        , flex: 1, renderCell: params => params.row.category.name
    },
    {
        field: 'details',
        headerName: 'Detalles',
        flex: 1,
        renderCell: (params) => (
            <Button

                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(params.row)}
            >
                VER
            </Button>
        )
    }
];