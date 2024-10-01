import React from 'react'
import { GlobalProvider } from '../context/global/globalContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MyClaims } from './screens/Claims/MyClaims'
import { AllClaims } from './screens/Claims/AllClaims'
import { MyArbitrations } from './screens/Arbitrations/MyArbitrations'
import { AllArbitrations } from './screens/Arbitrations/AllArbitrations'
import { Logs } from './screens/Logs'
import { AccessControl } from './screens/AccessControl/AccessControl'
import Dashboard from './screens/Dashboard/Dashboard'
import { ModalProvider } from '../context/ModalContext'
import Profile from './screens/Profile/Profile'
import Login from './screens/Login/Login'
import { ColorModeContext, useMode } from '../styles/theme'
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../layouts/ProtectedRoute';
import { AuthProvider } from '../context/AuthProvider'

function App() {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalProvider>
              <ModalProvider>

                <Routes>

                  <Route path='/auth' element={<AuthLayout />}>

                    <Route index element={<Login />} />

                  </Route>

                  <Route path="/" element={<ProtectedRoute />}>

                    <Route index element={<Dashboard />} />

                    <Route path="/my-claims" element={<MyClaims />} />

                    <Route path="/all-claims" element={<AllClaims />} />

                    <Route path="/my-arbitrations" element={<MyArbitrations />} />

                    <Route path="/all-arbitrations" element={<AllArbitrations />} />

                    <Route path="/logs" element={<Logs />} />

                    <Route path="/access-control" element={<AccessControl />} />

                    <Route path="/profile" element={<Profile />} />

                  </Route>

                </Routes>

              </ModalProvider>
            </GlobalProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App;
