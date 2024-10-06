import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, Typography, Box } from '@mui/material';
import { useDeleteUserActions } from '../../../hooks/user/useDeleteUserActions';

export const ModalDeleteEmployee = ({ open, onClose, employee, adminId }) => {

    const { deleteUser, isLoading } = useDeleteUserActions(adminId);

    const [isDeletingLoading, setIsDeletingLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setIsDeletingLoading(true);
            const timer = setTimeout(() => {
                setIsDeletingLoading(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleDelete = async () => {
        await deleteUser(employee);
        onClose();
    }

    return (
        <Dialog open={open} onClose={!isLoading ? onClose : null} maxWidth="sm">
            <DialogTitle fontWeight={'bold'} >¿Estas seguro de eliminar a {employee.fullName}?</DialogTitle>
            <DialogContent>
                <Box display='flex' justifyContent='flex-end' mt={2} gap={2}>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={onClose}>
                        Cancelar</Button>
                    <Button
                        onClick={handleDelete}
                        variant='contained'
                        color="error"
                        disabled={isDeletingLoading}
                    >
                        {!isDeletingLoading && !isLoading ? 'Eliminar' : <CircularProgress size={22} color="primary" />}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
