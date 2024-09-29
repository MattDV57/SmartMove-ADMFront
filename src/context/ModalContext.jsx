/* eslint-disable react/prop-types */
// ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalData, setModalData] = useState({ open: false, claim: null });

    const openModal = (claim) => {
        setModalData({ open: true, claim })
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        setModalData({ open: false, claim: null })
        document.body.style.overflow = 'auto';
    };

    return (
        <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
