import React, { useReducer, useState } from 'react'
import { Box, LinearProgress } from '@mui/material'
import ModalManager from '../../components/ModalManager';
import { ACCESS_CONTROL_ALLOWED_ROLES_ACTIONS, MODALS_TYPES } from '../../../common/types';
import { useModal } from '../../../context/ModalProvider';
import { GridUsers } from './Grid/GridUsers';
import { useAuth } from '../../../context/AuthProvider';
import { gridReducer, initialState } from './Grid/GridReducer';
import { useGetUsersActions } from '../../../hooks/user/useGetUsersActions';
import { ACCESS_CONTROL, ACTIONS } from '../../../common/rolesPermissions';


export const AccessControl = () => {

  const { auth } = useAuth();

  const accessRole = auth.accessRole;

  const [state, dispatch] = useReducer(gridReducer, initialState);
  const { isLoading } = useGetUsersActions(auth._id, state, dispatch);



  return (
    <>

      {isLoading
        ? <LinearProgress />

        : <Box margin={'15px 0 0 15px'}>

          <GridUsers
            accessRole={accessRole}
            state={state}
            dispatch={dispatch}
          />

        </Box>
      }

      <ModalManager />

    </>
  )

}
