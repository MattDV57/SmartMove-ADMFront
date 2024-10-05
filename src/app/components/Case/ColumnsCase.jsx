import React from 'react';
import { Box, Button, Chip, Tooltip } from '@mui/material';
import { LIST_PRIORITIES, LIST_STATUS, CASE_PATHS, MODALS_TYPES } from '../../../common/types';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';



export const columnsCase = (handleOpenModal, priorityPalette, casePath, handleOpenChat) => [
    {
        field: 'timestamp',
        headerName: 'Fecha Emisión',
        width: 150,
        type: 'date',
        valueGetter: value => new Date(value),
        editable: false,
        renderCell: (params) => {
            const formattedDate = moment(params.value).format('DD/MM/YYYY HH:mm:ss')
            return (
                <Tooltip title={formattedDate} arrow>
                    <span>{formattedDate}</span>
                </Tooltip>
            )
        }
    },
    {
        field: 'priority',
        headerName: 'Prioridad',
        width: 150,
        sortComparator: (v1, v2) => {
            return LIST_PRIORITIES.indexOf(v1) - LIST_PRIORITIES.indexOf(v2);
        },
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    width: '60%',
                    textAlign: 'center',
                    color: '#0A0A0A',
                    backgroundColor:
                        params.value === LIST_PRIORITIES[3] ? priorityPalette[600] :
                            params.value === LIST_PRIORITIES[2] ? priorityPalette[400] :
                                params.value === LIST_PRIORITIES[1] ? priorityPalette[300] :
                                    priorityPalette[100]
                }}
            />
        )
    },
    {
        field: 'status',
        headerName: 'Estado',
        type: 'singleSelect',
        valueOptions: LIST_STATUS,
        sortComparator: (v1, v2) => {
            return LIST_STATUS.indexOf(v1) - LIST_STATUS.indexOf(v2);
        },
        width: 180,
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    width: '70%',
                    textAlign: 'center',
                    color: '#0A0A0A',
                }}
                color={
                    params.value === LIST_STATUS[0] ? 'success' :
                        params.value === LIST_STATUS[1] ? 'info' :
                            'secondary'
                }
            />
        )
    },
    ...([CASE_PATHS.ALL_CLAIMS, CASE_PATHS.ALL_ARBITRATIONS].includes(casePath) ? [ // AllClaims and AllArbitrations columns only.
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
                            onClick={() => handleOpenModal(MODALS_TYPES.OPERATOR_ACCEPT_CASE, params.row)}
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
        flex: 1,
        renderCell: params => (
            <Tooltip title={params?.row?.user?.username} arrow>
                <span>{params?.row?.user?.username}</span>
            </Tooltip>
        )
    },

    ...([CASE_PATHS.ALL_ARBITRATIONS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath) ? [ // Arbitrations column only.
        {
            field: 'complainted', headerName: 'Reclamado',
            flex: 1,
            renderCell: params => (
                <Tooltip title={params.row.complainted} arrow>
                    <span>{params.row.complainted}</span>
                </Tooltip>
            )
        }]
        : [
            {
                field: 'category', headerName: 'Categoría'
                , flex: 1,
                renderCell: params =>
                    <Tooltip title={params.row.category} arrow>
                        <span>{params.row.category}</span>
                    </Tooltip>
            },]
    ),


    {
        field: 'details',
        headerName: 'Detalles',
        sortable: false,
        filterable: false,
        resizable: false,
        width: [CASE_PATHS.MY_CLAIMS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath)
            ? 200
            : 100,
        renderCell: (params) => (
            <Box
                justifyContent='space-between'
                alignItems='center'
                gap={3}
            >

                <Button
                    variant="contained"
                    color="info"
                    sx={{ marginRight: '15px' }}
                    onClick={() => handleOpenModal(MODALS_TYPES.DETAILS_CASE, params.row)}
                >
                    VER
                </Button>

                {[CASE_PATHS.MY_CLAIMS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath) && ( // MyClaims and MyArbitrations columns only.
                    <Button
                        variant="contained"
                        color="warning"
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
    ...([CASE_PATHS.MY_CLAIMS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath) ? [ // MyClaims and MyArbitrations columns only.
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
                    onClick={() => handleOpenModal(MODALS_TYPES.EDIT_CASE, params.row)}
                >
                    <EditIcon />
                </Button>
            )
        }
    ] : [])

];



