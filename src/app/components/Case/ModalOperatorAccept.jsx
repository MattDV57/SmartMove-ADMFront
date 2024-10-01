/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from '@mui/material';

const ModalOperatorAccept = ({ open, onClose, claim, onAccept }) => {
    if (!claim) return null;

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
                        Rechazar
                    </Button>
                    <Button onClick={() => onAccept(claim)} variant="contained" color="primary">
                        Aceptar
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalOperatorAccept;