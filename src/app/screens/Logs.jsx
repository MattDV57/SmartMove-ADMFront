import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tabs,
    Tab,
    TextField,
    IconButton,
    Typography,
    Box,
    Fab,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GridArrowUpwardIcon } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { tokens } from '../../styles/theme';
// import { useGetLogs } from '../../../hooks/logs/useGetLogs';

// Datos de ejemplo
const userLogs = [
    { id: 1, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
    { id: 2, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
    { id: 3, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
];

const claimLogs = [
    { id: 1, claim: "REC-001", user: "Ana Martínez", details: "Reclamo cerrado - Solución proporcionada", timestamp: "2023-06-15 09:15:00" },
    { id: 2, claim: "REC-002", user: "Luis Sánchez", details: "Reclamo cerrado - No procede", timestamp: "2023-06-15 13:30:00" },
    { id: 3, claim: "REC-003", user: "Elena Torres", details: "Reclamo cerrado - Escalado a nivel superior", timestamp: "2023-06-15 16:45:00" },
    { id: 1, claim: "REC-001", user: "Ana Martínez", details: "Reclamo cerrado - Solución proporcionada", timestamp: "2023-06-15 09:15:00" },
    { id: 2, claim: "REC-002", user: "Luis Sánchez", details: "Reclamo cerrado - No procede", timestamp: "2023-06-15 13:30:00" },
    { id: 3, claim: "REC-003", user: "Elena Torres", details: "Reclamo cerrado - Escalado a nivel superior", timestamp: "2023-06-15 16:45:00" },
    { id: 1, claim: "REC-001", user: "Ana Martínez", details: "Reclamo cerrado - Solución proporcionada", timestamp: "2023-06-15 09:15:00" },
    { id: 2, claim: "REC-002", user: "Luis Sánchez", details: "Reclamo cerrado - No procede", timestamp: "2023-06-15 13:30:00" },
    { id: 3, claim: "REC-003", user: "Elena Torres", details: "Reclamo cerrado - Escalado a nivel superior", timestamp: "2023-06-15 16:45:00" },
    { id: 1, claim: "REC-001", user: "Ana Martínez", details: "Reclamo cerrado - Solución proporcionada", timestamp: "2023-06-15 09:15:00" },
    { id: 2, claim: "REC-002", user: "Luis Sánchez", details: "Reclamo cerrado - No procede", timestamp: "2023-06-15 13:30:00" },
    { id: 3, claim: "REC-003", user: "Elena Torres", details: "Reclamo cerrado - Escalado a nivel superior", timestamp: "2023-06-15 16:45:00" },
    { id: 1, claim: "REC-001", user: "Ana Martínez", details: "Reclamo cerrado - Solución proporcionada", timestamp: "2023-06-15 09:15:00" },
    { id: 2, claim: "REC-002", user: "Luis Sánchez", details: "Reclamo cerrado - No procede", timestamp: "2023-06-15 13:30:00" },
    { id: 3, claim: "REC-003", user: "Elena Torres", details: "Reclamo cerrado - Escalado a nivel superior", timestamp: "2023-06-15 16:45:00" },
    { id: 1, claim: "REC-001", user: "Ana Martínez", details: "Reclamo cerrado - Solución proporcionada", timestamp: "2023-06-15 09:15:00" },
    { id: 2, claim: "REC-002", user: "Luis Sánchez", details: "Reclamo cerrado - No procede", timestamp: "2023-06-15 13:30:00" },
    { id: 3, claim: "REC-003", user: "Elena Torres", details: "Reclamo cerrado - Escalado a nivel superior", timestamp: "2023-06-15 16:45:00" },
];

export const Logs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentTab, setCurrentTab] = useState(0);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [logs, setLogs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    // const { data, isError, isLoading, handleSearch } = useGetLogs();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // useEffect(() => {
    //     const fetchLogs = async () => {
    //         const response = await handleSearch(searchTerm, currentPage, limit, currentTab);
    //         if (response) {
    //             setLogs(prevLogs => [...prevLogs, ...response.logs]);
    //             setTotalPages(response.totalPages);
    //         }
    //     };

    //     if (searchTerm.length > 2 || searchTerm.length === 0) {
    //         fetchLogs();
    //     }
    // }, [searchTerm, currentPage]);


    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredUserLogs = userLogs.filter(log =>
        Object.values(log).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const filteredClaimLogs = claimLogs.filter(log =>
        Object.values(log).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2, paddingX: 0 }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="log tabs">
                    <Tab label="ABM Usuarios" />
                    <Tab label="Cierre de Reclamos" />
                </Tabs>
            </Box>
            <Box paddingX={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    <TextField
                        label="Buscar en logs"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginRight: 1 }}
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Box>
                <TableContainer component={Paper} sx={{
                    backgroundColor: colors.grey[300],
                    borderRadius: 1,
                    boxShadow: 1,
                    marginBottom: 2,
                }}>
                    <Table sx={{ minWidth: 650 }} aria-label="log table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: colors.blueAccent[800] }}
                            >
                                {currentTab === 0 ? (
                                    <>
                                        <TableCell style={{ fontWeight: 'bold' }}>Acción</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Usuario</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Detalles</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Fecha y Hora</TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell style={{ fontWeight: 'bold' }}>Reclamo</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Usuario</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Detalles</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Fecha y Hora</TableCell>
                                    </>
                                )}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentTab === 0
                                ? filteredUserLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell>{log.details}</TableCell>
                                        <TableCell>{log.timestamp}</TableCell>
                                    </TableRow>
                                ))
                                : filteredClaimLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell>{log.claim}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell>{log.details}</TableCell>
                                        <TableCell>{log.timestamp}</TableCell>
                                    </TableRow>
                                ))}
                            <TableRow sx={{ alignItems: 'center', justifyContent: 'center' }} >
                                {/* { isLoading &&             <TableCell colSpan={4} align="center">
                                {<CircularProgress color='' size={24} />}
                            </TableCell>} */}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {showScrollButton && (
                    <Fab
                        color="primary"
                        size="small"
                        onClick={scrollToTop}
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    >
                        <GridArrowUpwardIcon />
                    </Fab>
                )}
            </Box>
        </Box>
    );
}