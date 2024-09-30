/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import CaseGrid from '../../components/CaseGrid/CaseGrid';
import CaseDetailsModal from './CaseDetailsModal';
import { useModal } from '../../../context/ModalContext';
import { caseColumns } from '../../components/CaseGrid/CaseColumns';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';


export const MyClaims = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { modalData, openModal, closeModal } = useModal();

    const operatorName = 'ibulloch0';

    const cols = caseColumns(openModal, colors.priority, 'my-claims');



    return (
        <div>
            <CaseGrid title={"Mis Reclamos"} columns={cols} operatorName={operatorName} />
            <CaseDetailsModal open={modalData.open} claim={modalData.claim} onClose={closeModal} />
        </div>
    )
}
