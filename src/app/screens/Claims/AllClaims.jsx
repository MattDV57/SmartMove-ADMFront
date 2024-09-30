
import React, { useState } from 'react';
import CaseGrid from '../../components/CaseGrid/CaseGrid';
import CaseDetailsModal from './CaseDetailsModal';
import { useModal } from '../../../context/ModalContext';
import { caseColumns } from '../../components/CaseGrid/CaseColumns';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';


export const AllClaims = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { modalData, openModal, closeModal } = useModal();

    const cols = caseColumns(openModal, colors.priority);

    return (
        <div>
            <CaseGrid title={"Historial Reclamos"} columns={cols} />
            <CaseDetailsModal open={modalData.open} claim={modalData.claim} onClose={closeModal} />
        </div>
    )
}
