import React, { useState } from 'react';
import { LIST_PRIORITIES, LIST_STATUS } from '../../../common/types';
import { Box, Button, TextField, Checkbox, FormControlLabel, Modal, Typography } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import moment from 'moment';


const ModalEditCase = ({ isOpen, handleClose, claim, handleSaveChanges }) => {
    const [newStatus, setNewStatus] = useState(claim.status);
    const [newPriority, setNewPriority] = useState(claim.priority);

    const [actionTaken, setActionTaken] = useState('');
    const [showActionFields, setShowActionFields] = useState(false);

    const [resolutionDetails, setResolutionDetails] = useState('');
    const [showResolutionFields, setShowResolutionFields] = useState(false);

    const [showHistoryActions, setShowHistoryActions] = useState(false);
    const [historyActions, setHistoryActions] = useState(claim.actionHistory || []);

    const handleSave = () => {
        handleSaveChanges(claim.id, newStatus, newPriority, actionTaken, resolutionDetails);
        // Guardar la acción tomada en el historial
        if (actionTaken) {
            setHistoryActions(prev => [...prev, { action: actionTaken, timestamp: Date.now() }]);
            setActionTaken(''); // Limpiar el campo de acción después de guardarla
        }
        handleClose();
    };



    const toggleActionFields = () => {
        setShowActionFields(prev => !prev);
        setActionTaken(''); // Limpiar el campo de acción si se oculta
    }

    const toggleResolutionFields = () => {
        setShowResolutionFields(prev => !prev);
        setResolutionDetails(''); // Limpiar el campo de resolución si se oculta
    }


    return (
        <Modal open={isOpen} onClose={handleClose} maxWidth='sm'>
            <Box sx={{
                p: 3, backgroundColor: 'background.modal', color: 'text.primary', maxWidth: 800, margin: 'auto',
                mt: showHistoryActions ? 5 : 10
            }}>
                <Typography variant="h6" gutterBottom>
                    Editar Reclamo
                </Typography>


                {/* Cambiar prioridad */}
                <TextField
                    select
                    label="Prioridad"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue={claim.priority}
                    SelectProps={{ native: true }}
                >
                    {LIST_PRIORITIES.map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                    ))}
                </TextField>

                {/* Cambiar estado */}
                <TextField
                    select={{ native: true }}
                    label="Estado"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue={claim.status}
                    SelectProps={{ native: true }}
                >
                    {LIST_STATUS.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}

                </TextField>

                {/* Botones para mostrar/ocultar campos de acción y historial */}
                <Button
                    variant="outlined"
                    color={'info'}
                    disabled={showActionFields || showResolutionFields}
                    onClick={() => setShowHistoryActions(prev => !prev)}
                    startIcon={<ListIcon />}
                    sx={{ mt: 2, mb: showHistoryActions ? 2 : 0 }}
                >
                    {showHistoryActions ? 'Ocultar Acciones' : 'Ver Acciones'}
                </Button>


                {showHistoryActions && (
                    <Box mb={2} sx={{
                        border: '1px solid',
                        borderColor: 'info.main',
                        borderRadius: 1,
                        padding: 1,
                        backgroundColor: 'background.default',
                        maxHeight: 200,
                        overflowY: 'auto',
                    }}>
                        {historyActions.length > 0 ? (
                            historyActions.map((history, index) => (
                                <Typography key={index} variant="body2">
                                    {moment(history.timestamp).format("llll")} - {history.action}
                                </Typography>
                            ))
                        ) : (
                            <Typography>No hay acciones registradas.</Typography>
                        )}
                    </Box>
                )}


                {/* Botones de acciones y resolución en una fila */}
                <Box display={'flex'} justifyContent="space-between" mb={1}>
                    <Button
                        variant="outlined"
                        color={showActionFields ? 'error' : 'primary'}
                        onClick={toggleActionFields}
                        disabled={showResolutionFields || showHistoryActions}
                        startIcon={showActionFields ? <CancelIcon /> : <AddTaskIcon />}
                        sx={{ mt: 2 }}
                    >
                        {showActionFields ? 'Eliminar Acción' : 'Registrar Acción'}
                    </Button>

                    <Button
                        variant="outlined"
                        color={showResolutionFields ? 'error' : 'warning'}
                        onClick={toggleResolutionFields}
                        disabled={showActionFields || showHistoryActions}
                        startIcon={showResolutionFields ? <CancelIcon /> : <ChatIcon />}
                        sx={{ mt: 2 }}
                    >
                        {showResolutionFields ? 'Eliminar Resolución' : 'Establecer Resolución'}
                    </Button>
                </Box>

                {/* Campos de acción */}
                {showActionFields && (
                    <TextField
                        label="Acción realizada"
                        backgroundColor='primary'
                        value={actionTaken}
                        onChange={(e) => setActionTaken(e.target.value)}
                        variant="outlined"
                        multiline
                        rows={2}
                        fullWidth
                        margin="normal"
                    />
                )}
                {showResolutionFields &&
                    <TextField
                        label="Detalles de resolución"
                        color="warning"
                        value={resolutionDetails}
                        onChange={(e) => setResolutionDetails(e.target.value)}
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                    />
                }
                <Box mt={3}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal >
    );
};

export default ModalEditCase;

