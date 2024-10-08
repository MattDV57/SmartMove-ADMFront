import React, { useState } from 'react'
import Header from '../../components/Header'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button } from '@mui/material'
import useAuth from '../../../hooks/useAuth';
import ModalManager from '../../components/ModalManager';
import { ACCESS_CONTROL_ALLOWED_ROLES_ACTIONS, MODALS_TYPES } from '../../../common/types';
import { useModal } from '../../../context/ModalProvider';
import { GridUsers } from './Grid/GridUsers';


export const AccessControl = () => {
  const { auth } = useAuth();
  const { openModal } = useModal();
  const isAllowedToActions = ACCESS_CONTROL_ALLOWED_ROLES_ACTIONS.includes(auth?.accessRole);


  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [disableAddNewRow, setDisableAddNewRow] = useState(false);


  return (

    <Box margin={'15px 0 0 15px'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Header title="Control de Acceso" />
        {isAllowedToActions &&
          <Button
            onClick={() => openModal({ type: MODALS_TYPES.PUT_POST_USER })}

            disabled={disableAddNewRow}
            variant="contained"
            color="primary"
            sx={{
              marginBottom: "20px",
              marginRight: "15px"
            }}
            startIcon={<PersonAddIcon />}>
            Agregar Empleado</Button>
        }
      </Box>
      <GridUsers
        isAddingNewRow={isAddingNewRow}
        setIsAddingNewRow={setIsAddingNewRow}
        setDisableAddNewRow={setDisableAddNewRow}
        isAllowedToActions={isAllowedToActions}

      />
      <ModalManager />
    </Box>
  )

}
