import React from 'react';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import { LIST_PRIORITIES, LIST_STATUS, CASE_PATHS, MODALS_TYPES } from '../../../../common/types';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { INTERNAL_ROLES } from '../../../../common/rolesPermissions';



export const columnsCase = (openModal, priorityPalette, casePath, handleEditSaved, accessRole, USER_PERMISSIONS) => [
    {
        field: 'timestamp',
        headerName: 'Fecha Emisión',
        flex: 1,
        minWidth: 150,
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

    ...(Object.values(INTERNAL_ROLES).includes(accessRole)
        ? [
            {
                field: 'priority',
                headerName: 'Prioridad',
                flex: 1,
                minWidth: 150,
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
        ] : accessRole === 'Reclamante' ? [{
            field: 'status',
            headerName: 'Estado',
            type: 'singleSelect',
            valueOptions: LIST_STATUS,
            sortComparator: (v1, v2) => {
                return LIST_STATUS.indexOf(v1) - LIST_STATUS.indexOf(v2);
            },
            flex: 1,
            minWidth: 180,
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
        },] : []),

    ...(([CASE_PATHS.ALL_CLAIMS, CASE_PATHS.ALL_ARBITRATIONS].includes(casePath))
        && Object.values(INTERNAL_ROLES).includes(accessRole) ? [ // AllClaims and AllArbitrations columns only.
        {
            field: 'assignedOperator',
            headerName: 'Operador',
            cellClassName: 'name-column--cell',
            type: 'string',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                params?.row?.assignedOperator ? params.row.assignedOperator : (
                    USER_PERMISSIONS?.PUT_CLAIM &&
                    <Box>
                        <Button
                            variant='contained'
                            onClick={() => openModal({ type: MODALS_TYPES.OPERATOR_ACCEPT_CASE, data: params.row, onSave: handleEditSaved })}
                        >
                            <AddTaskIcon />
                        </Button>
                    </Box>
                )
            ),
        }
    ] : []),

    ...(Object.values(INTERNAL_ROLES).includes(accessRole) ? [
        {
            field: 'user', headerName: 'Reclamante',
            flex: 1,
            minWidth: 170,
            renderCell: params => (
                <Tooltip title={params?.row?.user?.username} arrow>
                    <span>{params?.row?.user?.username}</span>
                </Tooltip>
            )
        }
    ] : []),

    ...([CASE_PATHS.ALL_ARBITRATIONS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath)
        ? [ // Arbitrations column only.
            {
                field: 'counterParty', headerName: 'Reclamado',
                flex: 1,
                minWidth: 170,
                renderCell: params => (
                    <Tooltip title={params.row.counterParty.username} arrow>
                        <span>{params.row.counterParty.username}</span>
                    </Tooltip>
                )
            }]
        : [
            {
                field: 'category', headerName: 'Categoría'
                , flex: 1,
                minWidth: 170,
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
        flex: 1,
        minWidth: [CASE_PATHS.MY_CLAIMS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath)
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
                    onClick={() => openModal({ type: MODALS_TYPES.DETAILS_CASE, data: params.row })}
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
                        onClick={() => openModal({ type: MODALS_TYPES.CHAT, data: params.row })}
                    >
                        <ChatIcon />
                        CHAT
                    </Button>
                )
                }

            </Box>
        )
    },
    ...(([CASE_PATHS.MY_CLAIMS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath))
        && USER_PERMISSIONS?.PUT_CLAIM
        ? [ // MyClaims and MyArbitrations columns only.
            {
                field: "edit",
                headerName: "Editar",
                minWidth: 100,
                sortable: false,
                filterable: false,
                resizable: false,
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => openModal({ type: MODALS_TYPES.EDIT_CASE, data: params.row, onSave: handleEditSaved })}
                    >
                        <EditIcon />
                    </Button>
                )
            }
        ] : [])

];



