// ModalManager.js
import React from 'react';
import ModalDetails from './Case/ModalDetails';
import ModalOperatorAccept from './Case/ModalOperatorAccept';
import { useModal } from '../../context/ModalProvider';
import ModalEditCase from './Case/ModalEditCase';

const ModalManager = () => {
    const { modal, closeModal } = useModal();

    if (!modal) return null;

    switch (modal.type) {
        case 'case-details':
            return <ModalDetails open={true} claim={modal.data} onClose={closeModal} />;
        case 'accept-case':
            return <ModalOperatorAccept open={true} claim={modal.data} onClose={closeModal} employeeId={modal.employeeId} />;
        case 'edit-case':
            return <ModalEditCase isOpen={true} claim={modal.data} handleClose={closeModal} handleSaveChanges={closeModal} />
        default:
            return null;
    }
};

export default ModalManager;
