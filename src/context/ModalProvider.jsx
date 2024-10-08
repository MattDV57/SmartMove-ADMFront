/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react';
import useAuth from '../hooks/useAuth';

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {

    const { auth } = useAuth();

    const [modal, setModal] = useState(null);

    const openModal = ({ type, data = {}, onSave = () => { } }) => {
        setModal({ type, data, userId: auth.id, onSave, username: auth.username });
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