import React from 'react'
import { GridEmployees } from '../../components/EmployeesGrid/GridEmployees'
import Header from '../../components/Header'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button } from '@mui/material'

export const AccessControl = () => {



  return (

    <Box margin={'15px 0 0 15px'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Header title="Control de Acceso" />
        <Button variant="contained" color="warning" sx={{
          marginBottom: "20px",
          marginRight: "15px"
        }}
          startIcon={<PersonAddIcon />}>
          Agregar Empleado</Button>
      </Box>
      <GridEmployees />
    </Box>
  )

}
