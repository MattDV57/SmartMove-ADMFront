import React, { useState } from 'react'
import { GridEmployees } from '../../components/EmployeesGrid/GridEmployees'
import Header from '../../components/Header'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button } from '@mui/material'
import useAuth from '../../../hooks/useAuth';
import useUserActions from '../../../hooks/user/useUserActions';
import ModalManager from '../../components/ModalManager';

export const AccessControl = () => {
  const { auth } = useAuth();

  const { isLoading, postUser, getUsers, putUser, deleteUser } = useUserActions(auth.id);

  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [disableAddNewRow, setDisableAddNewRow] = useState(false);


  return (

    <Box margin={'15px 0 0 15px'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Header title="Control de Acceso" />
        <Button
          onClick={() => {
            setIsAddingNewRow(true)
            setDisableAddNewRow(true)
          }}

          disabled={disableAddNewRow}
          variant="contained"
          color="primary"
          sx={{
            marginBottom: "20px",
            marginRight: "15px"
          }}
          startIcon={<PersonAddIcon />}>
          Agregar Empleado</Button>
      </Box>
      <GridEmployees
        isAddingNewRow={isAddingNewRow}
        setIsAddingNewRow={setIsAddingNewRow}
        setDisableAddNewRow={setDisableAddNewRow}
        postUser={postUser}
        getUsers={getUsers}
        putUser={putUser}
        deleteUser={deleteUser}
        isLoading={isLoading}

      />
      <ModalManager />
    </Box>
  )

}
