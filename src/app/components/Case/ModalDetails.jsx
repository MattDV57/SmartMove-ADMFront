/* eslint-disable react/prop-types */
// CaseDetailsModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ModalDetails = ({ open, onClose, claim }) => {
    if (!claim) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>Detalles del Caso</DialogTitle>
            <DialogContent>
                <Typography><strong>Categoría:</strong> {claim.category}</Typography>
                <Typography><strong>Asunto:</strong> {claim.subject}</Typography>
                <Typography><strong>Descripción:</strong> {claim.description}</Typography>
                <Box display='flex' justifyContent='space-between' mt={2}>
                    <Button onClick={onClose} variant="contained" color="primary">
                        Cerrar
                    </Button>
                    {claim.status === 'Cerrado' || claim.status === 'Resuelto' &&
                        <Button variant="contained" color="warning" sx={{ ml: 2 }}>
                            <DownloadIcon />
                            Chat
                        </Button>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalDetails;