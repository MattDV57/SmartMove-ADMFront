// ModalManager.js
import React from 'react';
import ModalDetails from './Case/ModalDetails';
import ModalOperatorAccept from './Case/ModalOperatorAccept';
import ModalEditCase from './Case/ModalEditCase';
import { MODALS_TYPES } from '../../common/types';
import { useModal } from '../../context/ModalProvider';
import { ModalDeleteEmployee } from './EmployeesGrid/ModalDeleteEmployee';
import { ModalChat } from './Chat/ModalChat';


const ModalManager = () => {
    const { modal, closeModal } = useModal();

    if (!modal) return null;

    switch (modal.type) {
        case MODALS_TYPES.DETAILS_CASE:
            return <ModalDetails open={true} claim={modal.data} onClose={closeModal} />;
        case MODALS_TYPES.OPERATOR_ACCEPT_CASE:
            return <ModalOperatorAccept open={true} claim={modal.data} onClose={closeModal} onSave={modal.onSave} username={modal.username} />;
        case MODALS_TYPES.EDIT_CASE:
            return <ModalEditCase isOpen={true} claim={modal.data} onClose={closeModal} onSave={modal.onSave} />
        case MODALS_TYPES.DELETE_EMPLOYEE:
            return <ModalDeleteEmployee open={true} employee={modal.data} onClose={closeModal} adminId={modal.userId} />
        case MODALS_TYPES.CHAT:
            return <ModalChat open={true} employee={modal.data} onClose={closeModal} adminId={modal.userId} />
        default:
            return null;
    }
};

export default ModalManager;
