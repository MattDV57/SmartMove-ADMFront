/* eslint-disable react/prop-types */
// ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);

    const openModal = (type, data = {}) => {
        setModal({ type, data });
    };

    const closeModal = () => {
        setModal(null);
    };

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};