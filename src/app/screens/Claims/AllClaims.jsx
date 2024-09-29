
import React, { useState } from 'react';
import Grid from '../../components/Grid/Grid';
import ClaimDetailsModal from './ClaimDetailsModal';
import { useModal } from '../../../context/ModalContext';
import { columns } from '../../components/Grid/Columns';


export const AllClaims = () => {
    const { modalData, openModal, closeModal } = useModal();

    const cols = columns(openModal);

    return (
        <div>
            <Grid title={"Historial Reclamos"} columns={cols} />
            <ClaimDetailsModal open={modalData.open} claim={modalData.claim} onClose={closeModal} />
        </div>
    )
}
