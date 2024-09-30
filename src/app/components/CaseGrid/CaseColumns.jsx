import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';

const priorityOrder = {
    'Urgente': 4,
    'Alta': 3,
    'Media': 2,
    'Consulta': 1
}

const statusOrder = {
    'Abierto': 3,
    'En Proceso': 2,
    'Cerrado': 1
}


export const caseColumns = (handleOpenModal, priorityPalette, type, handleDownload) => [
    {
        field: 'timestamp',
        headerName: 'Fecha Emisión',
        width: 150,
        type: 'date',
        valueGetter: value => new Date(value),
        editable: false,
        renderCell: params => moment(params.value).format('DD/MM/YYYY hh:mm:ss'),

    },
    {
        field: 'priority',
        headerName: 'Prioridad',
        flex: 1,
        sortComparator: (v1, v2) => {
            return priorityOrder[v1] - priorityOrder[v2];
        },
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    width: '55%',
                    color: '#0A0A0A',
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
        type: 'singleSelect',
        valueOptions: ['Abierto', 'En Proceso', 'Cerrado'],
        sortComparator: (v1, v2) => {
            return statusOrder[v1] - statusOrder[v2];
        },
        flex: 1,
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    width: '70%',
                    textAlign: 'center',
                    color: '#0A0A0A',
                }}
                color={
                    params.value === 'Abierto' ? 'success' :
                        params.value === 'En Proceso' ? 'info' :
                            'secondary'
                }
            />
        )
    },
    ...(type !== 'my-claims' ? [
        {
            field: 'assignedOperator',
            headerName: 'Operador',
            cellClassName: 'name-column--cell',
            flex: 1,
            renderCell: (params) => (
                params?.row?.assignedOperator ? params.row.assignedOperator : (
                    <Box>
                        <Button variant='outlined'>
                            <AddOutlinedIcon />
                        </Button>
                    </Box>
                )
            ),
        }
    ] : []),
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
            <Box
                justifyContent='space-between'
                alignItems='center'
                gap={3}
            >
                {params.row.status === 'Cerrado' ?
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ gap: '2px' }}
                        onClick={() => handleDownload(params.row)}
                    >
                        <DownloadIcon /> HISTORIAL
                    </Button>
                    :
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '15px' }}
                        onClick={() => handleOpenModal(params.row)}
                    >
                        VER
                    </Button>
                }
                {type === 'my-claims' && params.row.status !== 'Cerrado' && (
                    <Button
                        variant="contained"
                        color="info"
                        sx={{ gap: '2px' }}
                        onClick={() => handleOpenModal(params.row)}
                    >
                        <ChatIcon />
                        CHAT
                    </Button>
                )
                }

            </Box>
        )

    }
];