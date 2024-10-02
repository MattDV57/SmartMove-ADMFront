import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import { LIST_PRIORITIES, LIST_STATUS } from '../../../common/types';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';


const pathTypes = ['my-claims', 'all-claims', 'my-arbitrations', 'all-arbitrations'];


export const columnsCase = (handleOpenModal, priorityPalette, path, handleOpenChat) => [
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
            return LIST_PRIORITIES.indexOf(v1) - LIST_PRIORITIES.indexOf(v2);
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
        valueOptions: ['Abierto', 'En Proceso', 'Resuelto', 'Cerrado'],
        sortComparator: (v1, v2) => {
            return LIST_STATUS.indexOf(v1) - LIST_STATUS.indexOf(v2);
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
    ...(path !== pathTypes[0] && path !== pathTypes[2] ? [ // AllClaims and AllArbitrations columns only.
        {
            field: 'assignedOperator',
            headerName: 'Operador',
            cellClassName: 'name-column--cell',
            type: 'string',
            flex: 1,
            renderCell: (params) => (
                params?.row?.assignedOperator ? params.row.assignedOperator : (
                    <Box>
                        <Button
                            variant='contained'
                            onClick={() => handleOpenModal('accept-case', params.row)}
                        >
                            <AddTaskIcon />
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

    ...(path === pathTypes[2] || path === pathTypes[3] ? [ // Arbitrations column only.
        {
            field: 'complainted', headerName: 'Reclamado',
            flex: 1, renderCell: params => params.row.user.complainted
        }]
        : [
            {
                field: 'category', headerName: 'Categoría'
                , flex: 1, renderCell: params => params.row.category.name
            },]
    ),


    {
        field: 'details',
        headerName: 'Detalles',
        sortable: false,
        filterable: false,
        resizable: false,
        flex: 1,
        renderCell: (params) => (
            <Box
                justifyContent='space-between'
                alignItems='center'
                gap={3}
            >

                <Button
                    variant="contained"
                    color="warning"
                    sx={{ marginRight: '15px' }}
                    onClick={() => handleOpenModal('case-details', params.row)}
                >
                    VER
                </Button>

                {path === 'my-claims' && (
                    <Button
                        variant="contained"
                        color="info"
                        sx={{
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // gap: '5px'
                        }}
                        onClick={() => handleOpenChat(params.row)}
                    >
                        <ChatIcon />
                        CHAT
                    </Button>
                )
                }

            </Box>
        )
    },
    ...(path === pathTypes[0] || path === pathTypes[2] ? [
        {
            field: "edit",
            headerName: "Editar",
            width: 100,
            sortable: false,
            filterable: false,
            resizable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal('edit-case', params.row)}
                >
                    <EditIcon />
                </Button>
            )
        }
    ] : [])

];