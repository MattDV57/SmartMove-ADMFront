/* eslint-disable react/prop-types */
import React from 'react';
import { useModal } from '../../../context/ModalProvider';
import { columnsCase } from '../../components/Case/ColumnsCase';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import ModalManager from '../../components/ModalManager';
import GridCase from '../../components/Case/GridCase';

export const CaseView = ({ title, path, operatorName, caseType }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { openModal } = useModal();

    const cols = columnsCase(openModal, colors.priority, path);

    //TODO: Implementar el modal de aceptar caso
    //TODO: Diseñar el chat (Modal(?))

    return (
        <div>

            <GridCase title={title} columns={cols} operatorName={operatorName} caseType={caseType} />

            <ModalManager />

        </div>
    );
};