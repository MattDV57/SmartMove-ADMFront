// ModalManager.js
import React from 'react';
import ModalDetails from './Case/ModalDetails';
import ModalOperatorAccept from './Case/ModalOperatorAccept';
import { useModal } from '../../context/ModalProvider';

const ModalManager = () => {
    const { modal, closeModal } = useModal();

    if (!modal) return null;

    switch (modal.type) {
        case 'case-details':
            return <ModalDetails open={true} claim={modal.data} onClose={closeModal} />;
        case 'accept-case':
            return <ModalOperatorAccept open={true} claim={modal.data} onClose={closeModal} onAccept={closeModal} />;

        default:
            return null;
    }
};

export default ModalManager;
