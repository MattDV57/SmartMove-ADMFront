/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import useOperatorCaseActions from '../../../hooks/case/useOperatorCaseActions';

const ModalOperatorAccept = ({ open, onClose, claim, employeeId }) => {

    const { isLoading, assignOperator } = useOperatorCaseActions({ claimId: claim._id, employeeId: employeeId });

    if (!claim) return null;

    const handleAccept = async () => {
        await assignOperator();
        onClose();
    }

    return (
        <Dialog open={open} onClose={!isLoading ? onClose : null} maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                ¿Quieres gestionar este reclamo?
            </DialogTitle>

            <DialogContent>
                <Typography marginBottom={2}>
                    <strong>Prioridad:</strong> {claim.priority}
                </Typography>

                {claim.category !== 'Mediaciones' && <Typography>
                    <strong>Categoría:</strong> {claim.category}
                </Typography>}

                <Typography marginBottom={2}>
                    <strong>Asunto:</strong> {claim.subject}
                </Typography>

                <Typography>
                    <strong>Descripción:</strong> {claim.description}
                </Typography>

                <Box display='flex' justifyContent='flex-end' mt={2} gap={2}>
                    <Button onClick={onClose} variant="contained" color="secondary" disabled={isLoading}>
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleAccept}
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="primary" /> : null}
                    >
                        {isLoading ? "Asignando..." : "Aceptar"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalOperatorAccept;
