import React, { useState } from 'react';
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
    Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
];

export const Logs = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
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
        <Box sx={{ width: '100%',margin: 'auto', padding: 4 }}>

            <Typography variant="h4" component="h1" gutterBottom>
                Registro de actividades
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="log tabs">
                    <Tab label="ABM Usuarios" />
                    <Tab label="Cierre de Reclamos" />
                </Tabs>
            </Box>
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="log table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'lightgray'}}>
                            {currentTab === 0 ? (
                                <>
                                    <TableCell style={{ fontWeight: 'bold'}}>Acción</TableCell>
                                    <TableCell style={{ fontWeight: 'bold'}}>Usuario</TableCell>
                                    <TableCell style={{ fontWeight: 'bold'}}>Detalles</TableCell>
                                    <TableCell style={{ fontWeight: 'bold'}}>Fecha y Hora</TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell style={{ fontWeight: 'bold'}}>Reclamo</TableCell>
                                    <TableCell style={{ fontWeight: 'bold'}}>Usuario</TableCell>
                                    <TableCell style={{ fontWeight: 'bold'}}>Detalles</TableCell>
                                    <TableCell style={{ fontWeight: 'bold'}}>Fecha y Hora</TableCell>
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}