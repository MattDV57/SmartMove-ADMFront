/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from '@mui/material';
import usePutOperatorActions from '../../../hooks/case/usePutOperatorActions';

const ModalOperatorAccept = ({ open, onClose, claim, employeeId }) => {

    const { isLoading, assignOperator } = usePutOperatorActions(claim._id["$oid"], employeeId);

    if (!claim) return null;


    const handleAccept = async () => {
        assignOperator();
        onClose();
    }


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">

            <DialogTitle sx={{
                fontWeight: 'bold',
            }}>¿Quieres gestionar este reclamo?</DialogTitle>

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
                    <Button onClick={onClose} variant="contained" color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAccept} variant="contained" color="primary" disabled={isLoading}>
                        {isLoading ? "Asignando..." : "Aceptar"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalOperatorAccept;