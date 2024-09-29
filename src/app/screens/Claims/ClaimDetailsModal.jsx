/* eslint-disable react/prop-types */
// ClaimDetailsModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from '@mui/material';

const ClaimDetailsModal = ({ open, onClose, claim }) => {
    if (!claim) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles del Reclamo: {claim._id['$oid']}</DialogTitle>
            <DialogContent>
                <Typography><strong>Categoría:</strong> {claim.category}</Typography>
                <Typography><strong>Asunto:</strong> {claim.subject}</Typography>
                <Typography><strong>Descripción:</strong> {claim.description}</Typography>
                <Box mt={2}>
                    <Button onClick={onClose} variant="contained" color="primary">
                        Cerrar
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ClaimDetailsModal;
